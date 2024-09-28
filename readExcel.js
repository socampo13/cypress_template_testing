import xlsx from 'xlsx';
import fs from 'fs';

const readExcel = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
};

// Reads data from the archive y saves them in a JSON file for using it in Cypress
const data = readExcel('route/to/the/document.xlsx');
fs.writeFileSync('cypress/fixtures/data.json', JSON.stringify(data, null, 2));