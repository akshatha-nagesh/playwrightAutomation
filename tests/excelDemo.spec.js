const { test, expect } = require('@playwright/test')
const ExcelJS = require('exceljs');
const path = '/Users/averneka/Downloads/download.xlsx';
async function writeExcel(searchText, replaceValue, change, path) {


    const Workbook = new ExcelJS.Workbook();
    await Workbook.xlsx.readFile(path);
    const WorkSheet = await Workbook.getWorksheet('Sheet1');
    //to get data
    const output = await readExcel(WorkSheet, searchText)
    //to get particular columnvalue
    const cell = WorkSheet.getCell(output.row, output.col + change.colChange);
    cell.value = replaceValue;//to replace
    await Workbook.xlsx.writeFile(path);


}

async function readExcel(WorkSheet, searchText) {
    let output = { row: -1, col: -1 }
    WorkSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellNumber) => {
            console.log(cell.value);
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.col = cellNumber;
                console.log('found:- ' + searchText + ' at: ' + output.row + ", " + output.col)
            }
        })
    })
    return output;



}

test('upload download excel validation', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/upload-download-test");
    
    const downloadPromise=page.waitForEvent('download')//used to make sure downloaded complete;y

    await page.getByRole('button', { name: 'Download' }).click()
    await downloadPromise;
    
    writeExcel("Kivi", "ButterFruit", { rowChange: 0, colChange: 2 }, path);
    writeExcel("Apple", 50, { rowChange: 0, colChange: 2 }, path);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(path);//this is used when attribute is type="file"  

})
/* */