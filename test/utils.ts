const beautifyHtml = require('js-beautify').html

export const jsxToHTML = require('react-dom/server').renderToStaticMarkup

export const printPrettyHtml = (html)=> {
    console.warn("\n"+ beautifyHtml( html, {"indent_size":2} ).replace(/class=/g, "className=") )
}