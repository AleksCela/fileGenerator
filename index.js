import fs from 'fs'

function parseCSV(csv) {
    let lines = csv.split("\r\n");
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split(',')
    }
    return lines
}

function createsFilesAfterRead(array) {
    console.log(array);
    for (let i = 0; i < array.length; i++) {
        const theFileName = array[i][0];
        const content = array[i][1];
        fs.writeFile(`${theFileName}`, `${content}`, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
}

function createFileFromCsv(fileName) {
    fs.readFile(`${fileName}`, 'utf-8', function callback(error, content) {
        if (error) {
            console.log(error);
            console.log(fileName);
        } else {
            const arrayOfItems = parseCSV(content)
            createsFilesAfterRead(arrayOfItems)
        }
    })
}

createFileFromCsv("data.csv")