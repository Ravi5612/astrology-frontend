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

// Regex patterns to find
const patterns = [
    /\b(id|userId|orderId|productId|merchantId|expertId|clientId|adminId|agentId|sessionId|transactionId)\s*:\s*number\b/g,
    /\b(id|userId|orderId|productId|merchantId|expertId|clientId|adminId|agentId|sessionId|transactionId)\??\s*:\s*number\s*\|/g,
    /useState<number \| null>\(null\)/g,
    /useState<number>\(/g, // might be for page numbers though
];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let hasMatch = false;
    for (const regex of patterns) {
        if (regex.test(content)) {
            hasMatch = true;
            count++;
            break;
        }
    }
    if (hasMatch) {
        console.log(file.replace(rootDir, ''));
    }
}

console.log(`\nFound ${count} files with potential ID number types.`);
