/* write all the quotes into a html file which will be used by font-spider */

import data from './data.mjs'
import fs from 'fs'

const body = Object.keys(data)
  .map(name => ('quote' in data[name] ? `<p>${data[name].quote}</p>` : ''))
  .join('')
const html = `<html><head><link rel="stylesheet" href="font.css"></head><body>${body}</body></html>`

fs.writeFile('./public/quotes.html', html, function(err) {
  if (err) {
    return console.log(err)
  }

  console.log('The HTML file was saved!')
})
