/**
 * This script fetches languages from Crowdin and Enterprise APIs and saves them to a JSON file.
 * @see https://support.crowdin.com/languages/crowdin.json
 * @see https://support.crowdin.com/languages/enterprise.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, 'public/languages');
const CROWDIN_API = 'https://api.crowdin.com/api/v2/languages?limit=500';
const ENTERPRISE_API = 'https://enterprise.api.crowdin.com/api/v2/languages?limit=500';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function fetchLanguages(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching languages from ${apiUrl}:`, error.message);
    return [];
  }
}

function processLanguages(languages) {
  const requiredFields = [
    'id',
    'name',
    'editorCode',
    'twoLettersCode',
    'threeLettersCode',
    'locale',
    'androidCode',
    'osxCode',
    'osxLocale',
  ];

  return languages.reduce((acc, lang) => {
    const { id, ...data } = lang.data;
    acc[id] = requiredFields.reduce((obj, field) => {
      obj[field] = data[field];
      return obj;
    }, {});
    return acc;
  }, {});
}

async function main() {
  console.log('Fetching languages from Crowdin API...');
  const crowdinLanguages = await fetchLanguages(CROWDIN_API);
  const crowdinProcessed = processLanguages(crowdinLanguages);

  console.log('Fetching languages from Enterprise API...');
  const enterpriseLanguages = await fetchLanguages(ENTERPRISE_API);
  const enterpriseProcessed = processLanguages(enterpriseLanguages);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'crowdin.json'),
    JSON.stringify(crowdinProcessed)
  );

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'enterprise.json'),
    JSON.stringify(enterpriseProcessed)
  );

  console.log('Language files have been generated successfully!');
}

main().catch(console.error);
