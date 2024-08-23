/**
 * This script checks for unused images in the screenshots directory by looking for references to them in the MDX files.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screenshotsDir = path.join(__dirname, 'src/assets/screenshots');
const docsDir = path.join(__dirname, 'src/content/docs');

/**
 * Helper function to get all files from a directory recursively
 * @param dir
 * @param fileList
 * @returns {*[]}
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

console.log(`Scanning src/assets/screenshots for images...`);

// Get all PNG and GIF files in screenshots directory
const screenshotFiles = getAllFiles(screenshotsDir)
  .filter(file => file.endsWith('.png') || file.endsWith('.gif'))
  .map(file => path.relative(screenshotsDir, file));

console.log(`Found ${screenshotFiles.length} images.`);

const mdxFiles = getAllFiles(docsDir).filter(file => file.endsWith('.mdx'));
let usedImages = [];

console.log(`Checking ${mdxFiles.length} MDX files for image references...`);

mdxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');

  screenshotFiles.forEach(screenshot => {
    const importPath = `!/` + screenshot.replace(/\\/g, '/');
    if (content.includes(importPath)) {
      usedImages.push(screenshot);
    }
  });
});

usedImages = new Set(usedImages); // Remove duplicates

console.log(`Found ${usedImages.size} images used in MDX files.`);

// Find unused images
const unusedImages = screenshotFiles.filter(image => !usedImages.has(image));

if (unusedImages.length > 0) {
  console.error('Unused images found:');
  unusedImages.forEach(image => console.error(`- ${path.join(screenshotsDir, image)}`));

  process.exit(1);
} else {
  console.log('No unused images found.');
}
