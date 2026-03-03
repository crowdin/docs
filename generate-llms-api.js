/**
 * Build-time script: generates AI-agent-ready API spec index and per-route
 * text files from the 4 OpenAPI YAMLs, following llms.txt-style plain text.
 *
 * Output:
 *   public/_llms-txt/api/api.txt                     — main index with links to spec indexes
 *   public/_llms-txt/api/{specId}.txt                — per-spec index (e.g. crowdin/file-based.txt)
 *   public/_llms-txt/api/{specId}/{operationId}.txt  — one .txt file per API route
 */

import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname);
const SPECS_DIR = path.join(ROOT, 'src', 'assets', 'api');
const OUT_DIR = path.join(ROOT, 'public', '_llms-txt', 'api');

// Match astro.config.mjs site resolution so generated links are absolute.
const SITE =
  process.env.SITE ||
  (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://support.crowdin.com');
const API_BASE = `${SITE.replace(/\/$/, '')}/_llms-txt/api`;

const SPEC_CONFIG = [
  { specId: 'crowdin/file-based', name: 'Crowdin API (file-based)', file: path.join(SPECS_DIR, 'crowdin', 'file-based.yml') },
  { specId: 'crowdin/string-based', name: 'Crowdin API (string-based)', file: path.join(SPECS_DIR, 'crowdin', 'string-based.yml') },
  { specId: 'enterprise/file-based', name: 'Crowdin Enterprise API (file-based)', file: path.join(SPECS_DIR, 'enterprise', 'file-based.yml') },
  { specId: 'enterprise/string-based', name: 'Crowdin Enterprise API (string-based)', file: path.join(SPECS_DIR, 'enterprise', 'string-based.yml') },
];

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'];
const SUCCESS_STATUSES = ['200', '201', '202', '204'];

function pickRequestBodySchema(requestBody) {
  if (!requestBody?.content) return undefined;
  const json = requestBody.content['application/json'];
  return json?.schema ?? undefined;
}

/** Collect response schemas for success (2xx) responses. */
function pickResponseSchemas(responses) {
  if (!responses) return [];
  const out = [];
  for (const status of SUCCESS_STATUSES) {
    const response = responses[status];
    const schema = response?.content?.['application/json']?.schema;
    if (schema) out.push({ status, schema });
  }
  return out;
}

/** JSON.stringify that replaces circular refs so schemas can be serialized. */
function schemaToJson(schema, indent = 2) {
  if (!schema || typeof schema !== 'object') return 'null';
  const seen = new WeakSet();
  return JSON.stringify(schema, (_key, value) => {
    if (value && typeof value === 'object') {
      if (seen.has(value)) return '[Ref]';
      seen.add(value);
    }
    return value;
  }, indent);
}

/** Render a single operation as llms.txt-style text block (for a standalone route file). */
function operationToText(pathTemplate, method, fragment, specName) {
  const methodPath = `${method.toUpperCase()} ${pathTemplate}`;

  const parts = [`# ${fragment.operationId}`, ''];
  const blockquoteLines = [
    specName,
    methodPath,
  ].filter(Boolean);
  if (blockquoteLines.length) {
    parts.push(blockquoteLines.map((line) => `> ${line}`).join('\n'), '', '');
  }

  if (fragment.description) {
    parts.push(fragment.description.trim(), '');
  }

  if (fragment.request?.parameters?.length) {
    parts.push('## Parameters', '');
    for (const p of fragment.request.parameters) {
      const req = p.required ? ' (required)' : '';
      parts.push(`- ${p.name} (${p.in}): ${p.schema?.type ?? 'string'}${req}`);
      if (p.description) parts.push(`  ${p.description}`);
    }
    parts.push('');
  }

  if (fragment.request?.bodySchema) {
    parts.push('## Request body', '');
    parts.push(schemaToJson(fragment.request.bodySchema));
    parts.push('');
  }

  if ((fragment.responseSchemas ?? []).length) {
    parts.push('## Response schema', '');
    for (const { status, schema } of fragment.responseSchemas) {
      parts.push(`${status}:`);
      parts.push(...schemaToJson(schema).split('\n').map((line) => '  ' + line));
      parts.push('');
    }
  }

  return parts.join('\n');
}

function buildFragment(operation, pathTemplate, method) {
  return {
    method: method.toUpperCase(),
    path: pathTemplate,
    operationId: operation.operationId,
    summary: operation.summary ?? null,
    description: operation.description ?? null,
    request: {
      parameters: operation.parameters ?? [],
      bodySchema: pickRequestBodySchema(operation.requestBody) ?? null,
    },
    responseSchemas: pickResponseSchemas(operation.responses),
  };
}

async function processSpec({ specId, name, file }) {
  if (!fs.existsSync(file)) {
    console.warn(`Skip ${specId}: file not found ${file}`);
    return { specId, name, operations: [], byRoute: {} };
  }

  const api = await SwaggerParser.dereference(file);
  const paths = api.paths ?? {};
  const operations = [];
  const byRoute = {};
  const specDir = path.join(OUT_DIR, specId);
  fs.mkdirSync(specDir, { recursive: true });

  for (const [pathTemplate, pathItem] of Object.entries(paths)) {
    if (typeof pathItem !== 'object' || pathItem === null) continue;

    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!operation?.operationId) continue;
      const fragment = buildFragment(operation, pathTemplate, method);
      operations.push({
        operationId: operation.operationId,
        method: fragment.method,
        path: pathTemplate,
        specId,
        summary: operation.summary ?? null,
      });
      const routeKey = `${fragment.method}:${pathTemplate}`;
      byRoute[routeKey] = operation.operationId;

      const body = operationToText(pathTemplate, method, fragment, name);
      const opPath = path.join(specDir, `${operation.operationId}.txt`);
      fs.writeFileSync(opPath, body.trimEnd() + '\n', 'utf8');
    }
  }

  return { specId, name, operations, byRoute };
}

/** Write a spec-specific index (operations for this spec only) at {specId}.txt. */
function writeSpecIndex(specId, name, operations, baseUrl) {
  const indexLines = [
    `# ${name}`,
    '',
    `> Per-endpoint API spec for \`${specId}\`. One .txt file per route.`,
    '',
    ...operations.map((op) => `- [${op.operationId}](${baseUrl}/${op.operationId}.txt) - ${op.summary || op.operationId}`),
  ];
  const indexPath = path.join(OUT_DIR, `${specId}.txt`);
  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(indexPath, indexLines.join('\n').trimEnd() + '\n', 'utf8');
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const specList = [];

  for (const config of SPEC_CONFIG) {
    const result = await processSpec(config);
    const baseUrl = `${API_BASE}/${result.specId}`;
    writeSpecIndex(result.specId, result.name, result.operations, baseUrl);
    specList.push({ specId: result.specId, name: result.name });
  }

  const mainIndexLines = [
    '# Crowdin API',
    '',
    '> Per-endpoint API specs for Crowdin API v2 and Crowdin Enterprise API v2. Each spec has its own index with operations for that API. Open a spec index to find an operation by operationId or METHOD:path, then open the linked .txt file for that route.',
    '',
    '## API specs',
    '',
    ...specList.map(({ specId, name }) => `- [${name}](${API_BASE}/${specId}.txt): index and per-route files.`),
  ];

  fs.writeFileSync(path.join(OUT_DIR, 'api.txt'), mainIndexLines.join('\n').trimEnd() + '\n', 'utf8');

  const totalOps = specList.reduce((acc, { specId }) => {
    const specDir = path.join(OUT_DIR, specId);
    if (!fs.existsSync(specDir)) return acc;
    return acc + fs.readdirSync(specDir).filter((f) => f.endsWith('.txt')).length;
  }, 0);
  console.log(`Generated main api.txt, 4 spec index .txt files, and ${totalOps} per-route .txt files at ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
