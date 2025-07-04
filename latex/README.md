# Convergent Economy LaTeX Documentation

## Quick Start
```bash
cd latex/
./build.sh
```

The PDF will be generated in `output/convergent-economy.pdf`.

## Files
- `convergent-economy.tex` - Main professional version
- `convergent-economy-simple.tex` - Simplified fallback version  
- `build.sh` - Build script
- `output/` - Generated PDFs
- `utils/` - Helper scripts

## Compilation Options

### Option 1: Local Build (Recommended)
```bash
cd latex/
chmod +x build.sh
./build.sh
```

### Option 2: Manual Compilation
```bash
cd latex/
pdflatex convergent-economy.tex
pdflatex convergent-economy.tex  # Run twice for references
mv convergent-economy.pdf output/
```

### Option 3: Overleaf (No Installation)
1. Copy content from `convergent-economy.tex` 
2. Paste into new Overleaf project
3. Compile online

### Option 4: Simplified Version
If the main version fails:
```bash
pdflatex convergent-economy-simple.tex
mv convergent-economy-simple.pdf output/
```

## Troubleshooting
- **No pdflatex**: Install MacTeX (macOS) or TeX Live (Linux)
- **Package errors**: Use simplified version or Overleaf
- **Font errors**: Switch to XeLaTeX in Overleaf settings

## Output
Professional PDF document suitable for:
- Executive distribution
- Academic submission  
- Investment presentations
- Digital publishing

See `/docs/latex/` for detailed installation and compilation guidance.
