const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = 'apps/expert-dashboard/components';
const directories = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

directories.forEach(dir => {
    const lower = dir.toLowerCase();
    const upper = dir.charAt(0).toUpperCase() + dir.slice(1);
    
    if (dir !== upper) {
        console.log(`Renaming ${dir} to ${upper}`);
        try {
            // Two-step rename for git on Windows
            execSync(`git mv "${baseDir}/${dir}" "${baseDir}/${dir}_tmp"`);
            execSync(`git mv "${baseDir}/${dir}_tmp" "${baseDir}/${upper}"`);
        } catch (e) {
            console.error(`Failed to rename ${dir}: ${e.message}`);
        }
    }
});
