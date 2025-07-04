#!/bin/bash

# Build script for Convergent Economy LaTeX document

echo "Building Convergent Economy LaTeX Document..."
echo "=========================================="

# Check if pdflatex is installed
if ! command -v pdflatex &> /dev/null; then
    echo "Error: pdflatex not found!"
    echo "Please install a LaTeX distribution:"
    echo "  - macOS: brew install --cask mactex"
    echo "  - Ubuntu/Debian: sudo apt-get install texlive-full"
    echo "  - Windows: Download MiKTeX from https://miktex.org"
    exit 1
fi

# Change to the script directory
cd "$(dirname "$0")"

# Clean old files
echo "Cleaning old files..."
rm -f convergent-economy-latex.aux convergent-economy-latex.log convergent-economy-latex.out convergent-economy-latex.toc

# First compilation
echo "First compilation pass..."
pdflatex -interaction=nonstopmode convergent-economy.tex > /dev/null 2>&1

# Second compilation (for references and ToC)
echo "Second compilation pass..."
pdflatex -interaction=nonstopmode convergent-economy.tex > /dev/null 2>&1

# Move PDF to output directory
if [ -f "convergent-economy.pdf" ]; then
    mv convergent-economy.pdf output/
    echo "✅ PDF created successfully!"
    echo "📄 Output: output/convergent-economy.pdf"
    
    # Ask if user wants to open the PDF
    read -p "Open the PDF? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open output/convergent-economy.pdf
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open output/convergent-economy.pdf
        fi
    fi
else
    echo "❌ Error: PDF creation failed!"
    echo "Check convergent-economy.log for details"
    exit 1
fi
