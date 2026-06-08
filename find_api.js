const fs = require('fs');
const path = require('path');
function findFiles(dir, searchTerms, fileList) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === 'dist') continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, searchTerms, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      for (const term of searchTerms) {
        if (content.toLowerCase().includes(term)) {
          fileList.push(filePath);
          break;
        }
      }
    }
  }
  return fileList;
}

const appsDir = path.join(process.cwd(), 'apps');
const pkgsDir = path.join(process.cwd(), 'packages');
const terms = ['delete(', '.delete', '.put', '.patch'];
const matches = findFiles(appsDir, terms, []);
findFiles(pkgsDir, terms, matches);
console.log(matches.join('\n'));
