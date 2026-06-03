const fs = require('fs');
const path = require('path');

const rootDir = 'd:/ravi/astrology-in-bharat-app-frontend';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.next' || file === 'dist' || file === 'build' || file === '.git') return;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const files = walk(rootDir);
let count = 0;

// Regex patterns to replace
const replaceRules = [
    // Interfaces, types, parameters: id: number -> id: string
    {
        pattern: /\b(id|userId|orderId|productId|merchantId|expertId|clientId|adminId|agentId|sessionId|transactionId)(\??)\s*:\s*number\b/g,
        replace: '$1$2: string'
    },
    // id: string | number -> id: string
    {
        pattern: /\b(id|userId|orderId|productId|merchantId|expertId|clientId|adminId|agentId|sessionId|transactionId)(\??)\s*:\s*string\s*\|\s*number\b/g,
        replace: '$1$2: string'
    },
    {
        pattern: /\b(id|userId|orderId|productId|merchantId|expertId|clientId|adminId|agentId|sessionId|transactionId)(\??)\s*:\s*number\s*\|\s*string\b/g,
        replace: '$1$2: string'
    },
    // useState for IDs: useState<number | null> -> useState<string | null>
    {
        pattern: /useState<number\s*\|\s*null>/g,
        // Since we can't know for sure it's an ID, we'll replace it but might need manual review.
        // Actually, let's only replace it if it's on a line with 'Id'
        custom: (content) => {
            const lines = content.split('\n');
            let changed = false;
            for (let i=0; i<lines.length; i++) {
                if (lines[i].includes('useState<number | null>') || lines[i].includes('useState<number | null>')) {
                    if (lines[i].toLowerCase().includes('id')) {
                        lines[i] = lines[i].replace(/useState<number\s*\|\s*null>/g, 'useState<string | null>');
                        changed = true;
                    }
                }
            }
            return { newContent: lines.join('\n'), changed };
        }
    },
    {
        pattern: /useState<number>/g,
        custom: (content) => {
            const lines = content.split('\n');
            let changed = false;
            for (let i=0; i<lines.length; i++) {
                if (lines[i].includes('useState<number>')) {
                    // Only replace if the state variable contains 'Id'
                    if (lines[i].match(/const\s+\[.*[Ii]d.*\]\s*=\s*useState<number>/)) {
                        lines[i] = lines[i].replace(/useState<number>/g, 'useState<string>');
                        changed = true;
                    }
                }
            }
            return { newContent: lines.join('\n'), changed };
        }
    },
    // Array of IDs: ids: number[] -> ids: string[]
    {
        pattern: /\b(ids|userIds|orderIds)(\??)\s*:\s*number\[\]/g,
        replace: '$1$2: string[]'
    },
    // Record of IDs: Record<number, ...>
    {
        pattern: /Record<number,\s*(boolean|string|any)>/g,
        // Let's replace Record<number, to Record<string, only if it's related to IDs. Too complex, let's do a simple replace and fix if needed.
        custom: (content) => {
            const lines = content.split('\n');
            let changed = false;
            for (let i=0; i<lines.length; i++) {
                if (lines[i].includes('Record<number,')) {
                    if (lines[i].toLowerCase().includes('id') || lines[i].includes('Expand')) {
                        lines[i] = lines[i].replace(/Record<number,/g, 'Record<string,');
                        changed = true;
                    }
                }
            }
            return { newContent: lines.join('\n'), changed };
        }
    }
];

for (const file of files) {
    const originalContent = fs.readFileSync(file, 'utf8');
    let newContent = originalContent;
    let modified = false;

    for (const rule of replaceRules) {
        if (rule.pattern) {
            if (rule.replace) {
                const updated = newContent.replace(rule.pattern, rule.replace);
                if (updated !== newContent) {
                    newContent = updated;
                    modified = true;
                }
            } else if (rule.custom) {
                const res = rule.custom(newContent);
                if (res.changed) {
                    newContent = res.newContent;
                    modified = true;
                }
            }
        }
    }

    if (modified) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated: ${file.replace(rootDir, '')}`);
        count++;
    }
}

console.log(`\nSuccessfully updated ${count} files.`);
