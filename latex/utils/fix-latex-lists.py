#!/usr/bin/env python3
"""
Script to identify and fix LaTeX list structure issues
that cause "missing \item" errors.
"""

import re

def fix_latex_lists(filename):
    """Fix common LaTeX list structure issues."""
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Track changes made
    changes = []
    
    # Pattern 1: Text immediately after \begin{enumerate} or \begin{itemize}
    # without proper \item
    pattern1 = r'(\\begin\{(?:enumerate|itemize)(?:\[[^\]]*\])?}\s*\n)([^\\%\s][^\n]*)'
    matches1 = re.finditer(pattern1, content)
    for match in matches1:
        if not match.group(2).strip().startswith('\\item'):
            old_text = match.group(0)
            new_text = match.group(1) + '    \\item ' + match.group(2)
            content = content.replace(old_text, new_text, 1)
            changes.append(f"Added \\item before: {match.group(2)[:50]}...")
    
    # Pattern 2: Lines in list environments that don't start with \item
    # but should (excluding comments and empty lines)
    lines = content.split('\n')
    in_list = False
    list_type = None
    fixed_lines = []
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # Check if we're entering a list
        if re.match(r'\\begin\{(enumerate|itemize)\}', stripped):
            in_list = True
            list_type = re.match(r'\\begin\{(enumerate|itemize)\}', stripped).group(1)
            fixed_lines.append(line)
            continue
        
        # Check if we're exiting a list
        if in_list and re.match(r'\\end\{(enumerate|itemize)\}', stripped):
            in_list = False
            list_type = None
            fixed_lines.append(line)
            continue
        
        # If we're in a list, check for problematic lines
        if in_list and stripped and not stripped.startswith('%'):
            if not (stripped.startswith('\\item') or 
                   stripped.startswith('\\end{') or
                   stripped.startswith('\\begin{') or
                   stripped.startswith('\\caption') or
                   stripped.startswith('\\label') or
                   stripped.startswith('\\section') or
                   stripped.startswith('\\chapter')):
                # This line should probably be an \item
                if any(keyword in stripped.lower() for keyword in 
                      ['textbf{', 'emph{', 'bullet', '•', '-', '*']):
                    # Add \item prefix
                    indent = len(line) - len(line.lstrip())
                    fixed_line = ' ' * indent + '\\item ' + stripped
                    fixed_lines.append(fixed_line)
                    changes.append(f"Added \\item to line {i+1}: {stripped[:50]}...")
                    continue
        
        fixed_lines.append(line)
    
    # Reconstruct content
    content = '\n'.join(fixed_lines)
    
    # Write back to file
    with open(filename.replace('.tex', '-fixed.tex'), 'w', encoding='utf-8') as f:
        f.write(content)
    
    return changes

if __name__ == "__main__":
    changes = fix_latex_lists('/Users/wolfejam/theblockchain-ai-svelte/convergent-economy-latex.tex')
    
    print("LaTeX List Structure Fixes Applied:")
    print("=" * 50)
    
    if changes:
        for i, change in enumerate(changes, 1):
            print(f"{i}. {change}")
    else:
        print("No obvious list structure issues found.")
        print("The errors may be due to more complex nesting or other structural issues.")
    
    print(f"\nFixed file saved as: convergent-economy-latex-fixed.tex")
