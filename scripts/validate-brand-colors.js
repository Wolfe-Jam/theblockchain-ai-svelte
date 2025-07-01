#!/usr/bin/env node

/**
 * Brand Color Compliance Validator for Svelte Components
 * Checks for proper brand color usage across the project
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Brand color definitions
const BRAND_COLORS = {
  exact: {
    blue: '#004AAE',     // Blockchain Blue
    cyan: '#0CC0DF',     // Digital Turquoise  
    orange: '#FF914D'    // Creative Orange
  },
  textReadable: {
    blue: '#2563EB',     // Blue-600
    cyan: '#06B6D4',     // Cyan-500
    orange: '#EA580C'    // Orange-600
  },
  deprecated: {
    oldBlue: '#2563EB',   // Old brand blue (now text-only)
    oldCyan: '#0891B2',   // Old cyan approximation
    oldOrange: '#EA580C'  // Old orange approximation
  }
};

// File extensions to check
const EXTENSIONS = ['.svelte', '.css', '.scss', '.js', '.ts'];

// Directories to scan
const SCAN_DIRS = ['src/components', 'src/pages', 'src/lib', 'public'];

// Files to exclude from validation
const EXCLUDED_FILES = [
  '_BrandColorTest.svelte',
  '_BrandCompliantTemplate.svelte'
];

class BrandColorValidator {
  constructor() {
    this.violations = [];
    this.warnings = [];
    this.fileCount = 0;
  }

  // Scan all specified directories
  scan() {
    console.log('🎨 Scanning for brand color compliance...\n');
    
    SCAN_DIRS.forEach(dir => {
      if (this.dirExists(dir)) {
        this.scanDirectory(dir);
      }
    });
    
    this.generateReport();
  }

  // Check if directory exists
  dirExists(dir) {
    try {
      return statSync(dir).isDirectory();
    } catch {
      return false;
    }
  }

  // Recursively scan directory
  scanDirectory(dir) {
    const entries = readdirSync(dir);
    
    entries.forEach(entry => {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (this.shouldCheckFile(fullPath)) {
        this.checkFile(fullPath);
      }
    });
  }

  // Check if file should be scanned
  shouldCheckFile(filePath) {
    const ext = extname(filePath);
    const fileName = filePath.split('/').pop();
    
    // Exclude certain files
    if (EXCLUDED_FILES.includes(fileName)) {
      return false;
    }
    
    return EXTENSIONS.includes(ext);
  }

  // Check individual file for violations
  checkFile(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      this.fileCount++;
      
      // Check for brand color violations
      this.checkBrandColorUsage(filePath, content);
      this.checkDeprecatedColors(filePath, content);
      this.checkHardcodedColors(filePath, content);
      
    } catch (error) {
      console.warn(`⚠️  Could not read file: ${filePath}`);
    }
  }

  // Check for proper brand color usage
  checkBrandColorUsage(filePath, content) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      // Check for graphics using text colors (violation)
      if (this.isGraphicsContext(line) && this.hasTextColor(line)) {
        this.violations.push({
          file: filePath,
          line: lineNum,
          issue: 'Graphics element using text color variant',
          code: line.trim(),
          severity: 'error'
        });
      }
      
      // Check for text using exact brand colors (warning)
      if (this.isTextContext(line) && this.hasExactBrandColor(line)) {
        this.warnings.push({
          file: filePath,
          line: lineNum,
          issue: 'Text element using exact brand color (consider text variant)',
          code: line.trim(),
          severity: 'warning'
        });
      }
    });
  }

  // Check for deprecated color usage
  checkDeprecatedColors(filePath, content) {
    Object.entries(BRAND_COLORS.deprecated).forEach(([name, color]) => {
      if (content.includes(color)) {
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes(color)) {
            this.violations.push({
              file: filePath,
              line: index + 1,
              issue: `Deprecated color ${color} found`,
              code: line.trim(),
              severity: 'error'
            });
          }
        });
      }
    });
  }

  // Check for hardcoded non-brand colors in brand contexts
  checkHardcodedColors(filePath, content) {
    const brandContextRegex = /(pillar|brand|logo|header|primary|accent)/i;
    const hexColorRegex = /#[0-9A-Fa-f]{6}/g;
    
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (brandContextRegex.test(line)) {
        const hexMatches = line.match(hexColorRegex);
        if (hexMatches) {
          hexMatches.forEach(hex => {
            if (!this.isKnownBrandColor(hex)) {
              this.warnings.push({
                file: filePath,
                line: index + 1,
                issue: `Unknown hex color ${hex} in brand context`,
                code: line.trim(),
                severity: 'warning'
              });
            }
          });
        }
      }
    });
  }

  // Helper: Check if line is graphics context
  isGraphicsContext(line) {
    const graphicsKeywords = [
      'background:', 'background-color:', 'bg-', 'fill:', 'stroke:',
      'border-color:', 'box-shadow:', 'gradient'
    ];
    return graphicsKeywords.some(keyword => line.includes(keyword));
  }

  // Helper: Check if line is text context  
  isTextContext(line) {
    const textKeywords = ['color:', 'text-', 'font-color'];
    // Exclude icons and graphic elements
    const graphicExclusions = ['<i class=', 'fa-', 'icon-'];
    
    const hasTextKeyword = textKeywords.some(keyword => line.includes(keyword));
    const isGraphicElement = graphicExclusions.some(exclusion => line.includes(exclusion));
    
    return hasTextKeyword && !isGraphicElement;
  }

  // Helper: Check if line has text color variant
  hasTextColor(line) {
    return Object.values(BRAND_COLORS.textReadable).some(color => 
      line.includes(color)
    );
  }

  // Helper: Check if line has exact brand color
  hasExactBrandColor(line) {
    return Object.values(BRAND_COLORS.exact).some(color => 
      line.includes(color)
    );
  }

  // Helper: Check if hex is a known brand color
  isKnownBrandColor(hex) {
    const allBrandColors = [
      ...Object.values(BRAND_COLORS.exact),
      ...Object.values(BRAND_COLORS.textReadable)
    ];
    return allBrandColors.includes(hex.toUpperCase()) || 
           allBrandColors.includes(hex.toLowerCase());
  }

  // Generate compliance report
  generateReport() {
    console.log(`📊 Scanned ${this.fileCount} files\n`);
    
    // Print violations
    if (this.violations.length > 0) {
      console.log('❌ BRAND COLOR VIOLATIONS:');
      this.violations.forEach(violation => {
        console.log(`   ${violation.file}:${violation.line}`);
        console.log(`   Issue: ${violation.issue}`);
        console.log(`   Code: ${violation.code}`);
        console.log('');
      });
    }
    
    // Print warnings  
    if (this.warnings.length > 0) {
      console.log('⚠️  BRAND COLOR WARNINGS:');
      this.warnings.forEach(warning => {
        console.log(`   ${warning.file}:${warning.line}`);
        console.log(`   Issue: ${warning.issue}`);
        console.log(`   Code: ${warning.code}`);
        console.log('');
      });
    }
    
    // Summary
    console.log('📋 SUMMARY:');
    console.log(`   Files scanned: ${this.fileCount}`);
    console.log(`   Violations: ${this.violations.length}`);
    console.log(`   Warnings: ${this.warnings.length}`);
    
    if (this.violations.length === 0 && this.warnings.length === 0) {
      console.log('   ✅ All files are brand color compliant!');
    }
    
    // Exit code
    process.exit(this.violations.length > 0 ? 1 : 0);
  }
}

// Run validator
const validator = new BrandColorValidator();
validator.scan();
