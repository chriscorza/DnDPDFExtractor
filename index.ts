import {PDFExtract, PDFExtractOptions} from 'pdf.js-extract';
import minimist, { ParsedArgs } from 'minimist'
var argv : ParsedArgs = minimist(process.argv.slice(2));
console.log('ARGS =>',argv)
const pdfExtract : PDFExtract = new PDFExtract();
let options : PDFExtractOptions = {
    normalizeWhitespace: true,
    disableCombineTextItems: true
};

if( argv.hasOwnProperty('initPage') ){
    Object.assign(options,{
        firstPage: argv.initPage
    })
}

if( argv.hasOwnProperty('endPage') ){
    Object.assign(options,{
        lastPage: argv.endPage
    })
}

if( argv.hasOwnProperty('file') ){
    const filename = argv.file
    console.info('Reading ',filename)
    console.info('Options ',options)
    pdfExtract.extract(filename, options).then( result => {
        result.pages.filter( page => {
            return page.pageInfo.num == 1
        }).forEach( page => {
            console.log('PAGE => ',page.content)
        })
    })
} else {
    console.error('')
}