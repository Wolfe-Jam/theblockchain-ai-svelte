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
  
  // Update src/lib/version.js with new version
  const versionJsPath = path.join(__dirname, '..', 'src', 'lib', 'version.js');
  if (fs.existsSync(versionJsPath)) {
    let versionJsContent = fs.readFileSync(versionJsPath, 'utf8');
    
    // Update the static version info
    versionJsContent = versionJsContent.replace(
      /version: "[^"]*"/,
      `version: "${newVersion}"`
    );
    
    fs.writeFileSync(versionJsPath, versionJsContent);
    console.log('📋 Updated: src/lib/version.js with new version');
  }
  
  console.log(`✅ Version updated: ${oldVersion} → ${newVersion}`);
  console.log('📦 Updated files:');
  console.log('   - package.json');
  console.log('   - src/lib/version.js');
  console.log('   - About modal will show new version automatically');
  console.log('');
  console.log('🚀 Next steps:');
  console.log(`   git add package.json src/lib/version.js`);
  console.log(`   git commit -m "v${newVersion}: Version bump"`);
  console.log(`   git push`);
  
} catch (error) {
  console.error('Error updating version:', error.message);
  process.exit(1);
}
