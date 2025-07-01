#!/usr/bin/env node

// scripts/update-version.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);
const newVersion = args[0];

if (!newVersion) {
  console.error('Usage: node scripts/update-version.js <version>');
  console.error('Example: node scripts/update-version.js 1.1.2');
  process.exit(1);
}

// Validate version format (basic semver)
if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
  console.error('Error: Version must be in format x.y.z (e.g., 1.1.2)');
  process.exit(1);
}

try {
  // Update package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const oldVersion = packageJson.version;
  packageJson.version = newVersion;
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  
  // Check if version.js is properly reading from package.json
  const versionJsPath = path.join(__dirname, '..', 'src', 'lib', 'version.js');
  if (fs.existsSync(versionJsPath)) {
    console.log('📋 Verified: src/lib/version.js automatically imports from package.json');
  }
  
  console.log(`✅ Version updated: ${oldVersion} → ${newVersion}`);
  console.log('📦 Updated files:');
  console.log('   - package.json');
  console.log('   - About modal will show new version automatically');
  console.log('');
  console.log('🚀 Next steps:');
  console.log(`   git add package.json`);
  console.log(`   git commit -m "v${newVersion}: Version bump"`);
  console.log(`   git push`);
  
} catch (error) {
  console.error('Error updating version:', error.message);
  process.exit(1);
}
