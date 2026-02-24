const fs = require('fs');
const pdf = require('pdf-parse');

async function extract() {
    try {
        let dataBuffer = fs.readFileSync('School LMS.pdf');
        let data = await pdf(dataBuffer);
        fs.writeFileSync('.gemini_pdf_extract.txt', data.text);
        console.log('PDF extracted to .gemini_pdf_extract.txt');
    } catch(err) {
        console.error(err);
    }
}
extract();
