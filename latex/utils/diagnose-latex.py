#!/usr/bin/env python3
"""
Diagnostic script to find the root cause of LaTeX list environment issues.
"""

import re

def diagnose_latex_structure(filename):
    """Analyze LaTeX document structure for list environment issues."""
    
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Track all environment openings and closings
    env_stack = []
    issues = []
    
    for i, line in enumerate(lines, 1):
        line = line.strip()
        
        # Skip comments and empty lines
        if line.startswith('%') or not line:
            continue
        
        # Find environment beginnings
        begin_match = re.search(r'\\begin\{([^}]+)\}', line)
        if begin_match:
            env_name = begin_match.group(1)
            env_stack.append((env_name, i))
            
        # Find environment endings
        end_match = re.search(r'\\end\{([^}]+)\}', line)
        if end_match:
            env_name = end_match.group(1)
            if env_stack and env_stack[-1][0] == env_name:
                env_stack.pop()
            else:
                issues.append(f"Line {i}: Unmatched \\end{{{env_name}}} - no corresponding \\begin")
        
        # Check for problematic content in list environments
        if env_stack:
            current_env = env_stack[-1][0]
            if current_env in ['enumerate', 'itemize']:
                # Check if this line has content that should be an \item
                if (line and 
                    not line.startswith('\\item') and 
                    not line.startswith('\\end{') and
                    not line.startswith('\\begin{') and
                    not line.startswith('%') and
                    not line.startswith('\\caption') and
                    not line.startswith('\\label')):
                    
                    # Look for text that suggests this should be an item
                    if any(marker in line for marker in ['\\textbf{', '\\emph{', 'bullet']):
                        issues.append(f"Line {i}: Potential missing \\item in {current_env}: {line[:50]}...")
    
    # Check for unclosed environments
    if env_stack:
        for env_name, line_num in env_stack:
            issues.append(f"Line {line_num}: Unclosed \\begin{{{env_name}}}")
    
    return issues

def find_line_680_context(filename):
    """Find what's happening around line 680."""
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print("Context around line 680:")
    print("=" * 50)
    
    start = max(0, 675-1)  # Line 675 (0-indexed)
    end = min(len(lines), 685)  # Line 685
    
    for i in range(start, end):
        line_num = i + 1
        line_content = lines[i].rstrip()
        marker = ">>> " if line_num == 680 else "    "
        print(f"{marker}{line_num:3d}: {line_content}")

if __name__ == "__main__":
    filename = '/Users/wolfejam/theblockchain-ai-svelte/convergent-economy-latex.tex'
    
    print("LaTeX Structure Diagnostic Report")
    print("=" * 50)
    
    # Find structural issues
    issues = diagnose_latex_structure(filename)
    
    if issues:
        print(f"\nFound {len(issues)} potential issues:")
        for issue in issues:
            print(f"  • {issue}")
    else:
        print("\nNo obvious structural issues found.")
    
    print("\n")
    find_line_680_context(filename)
