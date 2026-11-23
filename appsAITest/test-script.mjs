import { execSync } from 'node:child_process';
import { argv, exit } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';

const inputFilePath = argv[2];

if (!inputFilePath) {
  console.error("❌ Please provide a file path: npm run test <path/to/file.js|.jsx>");
  exit(1);
}

// Validate path
if (!fs.existsSync(inputFilePath)) {
  console.error(`❌ File not found: ${inputFilePath}`);
  exit(1);
}

const ext = path.extname(inputFilePath);
const testName = path.basename(inputFilePath, ext);

try {
  if (ext === '.js') {
    // Canvas state input
    console.log(`🔁 [1/3] Canvas → Code: ${inputFilePath} → outputCode/${testName}.jsx`);
    execSync(`npm run canvas2code ${inputFilePath}`, { stdio: 'inherit' });

    console.log(`🔁 [2/3] Code → Canvas: outputCode/${testName}.jsx → outputState/${testName}.js`);
    execSync(`npm run code2canvas outputCode/${testName}.jsx`, { stdio: 'inherit' });

    console.log(`🔁 [3/3] Canvas → Code: outputState/${testName}.js → outputCode/${testName}.jsx`);
    execSync(`npm run canvas2code outputState/${testName}.js`, { stdio: 'inherit' });

  } else if (ext === '.jsx') {
    // Code input
    console.log(`🔁 [1/2] Code → Canvas: ${inputFilePath} → outputState/${testName}.js`);
    execSync(`npm run code2canvas ${inputFilePath}`, { stdio: 'inherit' });

    console.log(`🔁 [2/2] Canvas → Code: outputState/${testName}.js → outputCode/${testName}.jsx`);
    execSync(`npm run canvas2code outputState/${testName}.js`, { stdio: 'inherit' });

  } else {
    console.error("❌ Unsupported file type. Only .js (canvas) and .jsx (code) are supported.");
    exit(1);
  }

  console.log("✅ Test flow completed successfully");
} catch (err) {
  console.error("❌ Test flow failed:", err.message);
  exit(1);
}

