# Overleaf Upload Instructions

## File Locations:
- Full LaTeX document: `/Users/wolfejam/theblockchain-ai-svelte/convergent-economy-latex.tex`
- Simplified version: `/Users/wolfejam/theblockchain-ai-svelte/convergent-economy-simplified.tex`

## Quick Copy Commands:
```bash
# To copy full version to clipboard (macOS):
cat /Users/wolfejam/theblockchain-ai-svelte/convergent-economy-latex.tex | pbcopy

# To copy simplified version to clipboard (macOS):
cat /Users/wolfejam/theblockchain-ai-svelte/convergent-economy-simplified.tex | pbcopy
```

## In Overleaf:
1. After creating new blank project
2. Select all default text (Cmd+A) and delete
3. Paste your copied content (Cmd+V)
4. Click "Recompile" button (or Cmd+S)

## Troubleshooting:
- If you see errors with the full version, try the simplified version
- Common fixes:
  - Change compiler to "XeLaTeX" in Menu > Settings
  - Remove `\usepackage{tikz}` if TikZ causes issues
  - Remove `blur shadow` from TikZ commands

## Expected Result:
- A professional PDF with ~50+ pages
- Clickable table of contents
- Professional typography and formatting
- All charts and visualizations (in full version)
