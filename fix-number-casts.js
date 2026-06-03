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
    // Catch missed disputeId / dispute_id
    {
        pattern: /\b(disputeId|dispute_id|walletId|wallet_id|chatId|chat_id|callId|call_id|bookingId|booking_id)(\??)\s*:\s*number\b/g,
        replace: '$1$2: string'
    },
    {
        pattern: /\b(disputeId|dispute_id|walletId|wallet_id|chatId|chat_id|callId|call_id|bookingId|booking_id)(\??)\s*:\s*string\s*\|\s*number\b/g,
        replace: '$1$2: string'
    },
    {
        pattern: /\b(disputeId|dispute_id|walletId|wallet_id|chatId|chat_id|callId|call_id|bookingId|booking_id)(\??)\s*:\s*number\s*\|\s*string\b/g,
        replace: '$1$2: string'
    },
    // Fix Number(id) casts
    {
        pattern: /Number\(([^)]*(id|userId|orderId|productId|merchantId|expertId|clientId|adminId|agentId|sessionId|transactionId|disputeId|dispute_id|realId)[^)]*)\)/gi,
        replace: 'String($1)'
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

console.log(`\nSuccessfully updated ${count} more files.`);
