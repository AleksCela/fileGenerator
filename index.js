import fsp from 'fs/promises'

function parseCSV(csv) {
    let lines = csv.split("\r\n");
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split(',')
    }
    return lines
}

async function createsFilesAfterRead(array) {
    for (let i = 0; i < array.length; i++) {
        const theFileName = array[i][0];
        const content = array[i][1];
        fsp.writeFile(`${theFileName}`, `${content}`)
    }
}

async function createFileFromCsv(fileName) {
    try {
        const content = await fsp.readFile(`${fileName}`, 'utf-8')
        const arrayOfItems = parseCSV(content)
         await createsFilesAfterRead(arrayOfItems)
    }
    catch(error) {
        console.log(error.message)
    }
}
await createFileFromCsv("data.csv")