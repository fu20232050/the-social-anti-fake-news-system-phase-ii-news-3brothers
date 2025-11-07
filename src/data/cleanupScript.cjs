// Script to remove undetermined vote fields from mockData.js
const fs = require('fs');
const path = require('path');

// Read the mock data file
const mockDataPath = path.join(__dirname, 'mockData.js');
let fileContent = fs.readFileSync(mockDataPath, 'utf8');

// Replace all undetermined vote entries using regex
// This regex targets lines containing "undetermined: X," or "undetermined: X" within vote objects
fileContent = fileContent.replace(/,\s*undetermined:\s*\d+/g, '');

// Write the cleaned content back to the file
fs.writeFileSync(mockDataPath, fileContent, 'utf8');

console.log('Successfully removed all undetermined vote fields from mockData.js');