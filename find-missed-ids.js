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

const pattern1 = /\b([a-zA-Z0-9_]*[iI]d)(\??)\s*:\s*number\b/g;
const pattern2 = /\b([a-zA-Z0-9_]*[iI]d)(\??)\s*:\s*string\s*\|\s*number\b/g;
const pattern3 = /\b([a-zA-Z0-9_]*[iI]d)(\??)\s*:\s*number\s*\|\s*string\b/g;

let count = 0;

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let hasMatch = false;
    
    let match;
    while ((match = pattern1.exec(content)) !== null) {
        console.log(`Found in ${file.replace(rootDir, '')}: ${match[0]}`);
        hasMatch = true;
    }
    while ((match = pattern2.exec(content)) !== null) {
        console.log(`Found in ${file.replace(rootDir, '')}: ${match[0]}`);
        hasMatch = true;
    }
    while ((match = pattern3.exec(content)) !== null) {
        console.log(`Found in ${file.replace(rootDir, '')}: ${match[0]}`);
        hasMatch = true;
    }
    
    if (hasMatch) count++;
}

console.log(`\nFound ${count} files with remaining ID number types.`);
