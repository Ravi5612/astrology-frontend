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

const replaceRules = [
    {
        pattern: /\b(senderId|sender_id|expert_id|merchant_id|product_id|user_id|bankAccountId|pujaId|profileId|place_id|itemId|consultationId|_id)(\??)\s*:\s*number\b/g,
        replace: '$1$2: string'
    },
    {
        pattern: /\b(senderId|sender_id|expert_id|merchant_id|product_id|user_id|bankAccountId|pujaId|profileId|place_id|itemId|consultationId|_id)(\??)\s*:\s*string\s*\|\s*number\b/g,
        replace: '$1$2: string'
    },
    {
        pattern: /\b(senderId|sender_id|expert_id|merchant_id|product_id|user_id|bankAccountId|pujaId|profileId|place_id|itemId|consultationId|_id)(\??)\s*:\s*number\s*\|\s*string\b/g,
        replace: '$1$2: string'
    }
];

for (const file of files) {
    const originalContent = fs.readFileSync(file, 'utf8');
    let newContent = originalContent;
    let modified = false;

    for (const rule of replaceRules) {
        if (rule.pattern) {
            const updated = newContent.replace(rule.pattern, rule.replace);
            if (updated !== newContent) {
                newContent = updated;
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated: ${file.replace(rootDir, '')}`);
        count++;
    }
}

console.log(`\nSuccessfully updated ${count} missed files.`);
