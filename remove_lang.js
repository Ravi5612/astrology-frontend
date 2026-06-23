const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'apps/main/src');

function walk(dir, fileCallback) {
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath, fileCallback);
    } else if (filePath.endsWith('.tsx')) {
      fileCallback(filePath);
    }
  });
}

const regex = /<div className="absolute top-6 right-6 z-50">[\s\S]*?<button[\s\S]*?onClick=\{toggleLang\}[\s\S]*?<\/button>\s*<\/div>/g;
const regex2 = /<div className="absolute top-4 right-4 z-50">[\s\S]*?<button[\s\S]*?onClick=\{toggleLang\}[\s\S]*?<\/button>\s*<\/div>/g;

let updated = 0;
walk(directoryPath, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  content = content.replace(regex, '');
  content = content.replace(regex2, '');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log(`Updated ${filePath}`);
  }
});

console.log(`Updated ${updated} files.`);
