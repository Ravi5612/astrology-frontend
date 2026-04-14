const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = 'apps/expert-dashboard/components';
const targetCasings = {
    'appointment': 'Appointment',
    'auth': 'Auth',
    'client': 'Client',
    'earnings': 'Earnings',
    'product': 'Product',
    'wallet': 'Wallet',
    'chat': 'chat',
    'common': 'common',
    'dashboard': 'dashboard',
    'layout': 'layout',
    'notifications': 'notifications',
    'profile-management': 'profile-management',
    'shared': 'shared',
    'ui': 'ui'
};

const directories = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

directories.forEach(dir => {
    const lower = dir.toLowerCase();
    const target = targetCasings[lower] || dir;
    
    if (dir !== target) {
        console.log(`Renaming ${dir} to ${target}`);
        try {
            execSync(`git mv "${baseDir}/${dir}" "${baseDir}/${dir}_tmp"`);
            execSync(`git mv "${baseDir}/${dir}_tmp" "${baseDir}/${target}"`);
        } catch (e) {
            console.error(`Failed to rename ${dir}: ${e.message}`);
        }
    }
});
