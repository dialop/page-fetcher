const fs = require('fs');
const request = require('request');

const url = process.argv[2]; // retrive command line arguments when run on node. [2] and [3] assigned to url and pathFile
const pathFile = process.argv[3];

if (!url || !pathFile) {
  console.error('Usage: node fetcher.js <URL> <localFilePath>'); // checks if either of the arguments missing, run error message
  process.exit(1);
}

request(url, (error, response, body) => {              // request to make an HTTP GET request to url
  if (error || response.statusCode !== 200) {   // checks if there was an error or if the response status code is not 200 (OK)
    console.error('Error fetching url:', error || `HTTP Status: ${response.statusCode} `);
    process.exit(1);
  }

  fs.writeFile(pathFile, body, (err) => {    //if the http request success, 'fs.writeFille' to write 'body' and specify 'pathFile'
    if (err) {
      console.error('Error writing to file:', err);
      process.exit(1);
    }

    const fileSize = Buffer.byteLength(body, 'utf-8'); // if calculation === sucess calculate 'body" of using 'Buffer.byteLength()'
    console.log(`Download and save ${fileSize} byte to ${pathFile}`);

  });
  
});

