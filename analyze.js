import fs from 'fs'
import path from 'path'

// Configuration
const EXTENSIONS = ['.html', '.css', '.js'];
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build'];
const OUTPUT_FILE = 'project_dump.txt';

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        getFiles(filePath, fileList);
      }
    } else {
      if (EXTENSIONS.includes(path.extname(file))) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

function run() {
  const files = getFiles('.');
  let output = "--- PROJECT STRUCTURE & CODE ---\n";
  
  files.forEach(filePath => {
    // Don't read the script itself or the output file
    if (filePath.endsWith('analyze.js') || filePath.endsWith(OUTPUT_FILE)) return;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      output += `\nFILE: ${filePath}\n`;
      output += "-".repeat(filePath.length + 6) + "\n";
      output += content;
      output += "\n\n--- END OF FILE ---\n";
    } catch (err) {
      output += `\nError reading ${filePath}: ${err.message}\n`;
    }
  });

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Success! All code has been exported to: ${OUTPUT_FILE}`);
  console.log("You can now upload that file or copy its contents here.");
}

run();