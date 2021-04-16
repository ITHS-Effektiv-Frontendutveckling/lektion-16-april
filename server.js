//En enkel webbserver
//importera http-modulen
const http = require('http')
//importera fs-modulen
const fs = require('fs')

//skapa servern
//säga åt servern vad den ska göra på en req
const server = http.createServer()
const PORT = 8080;

server.on('request', (req, res) => { //skrev inte hela ordet request innan, utan bara 'req'
    //om url'en är vår grund-url
    console.log(req.url);
    if (req.url == '/') {
        console.log('home')
        //då vill vi returnera vår index.html
        fs.readFile('index.html', (err, data) => {
            const file = fs.createReadStream('index.html')
            file.pipe(res)
        })
    }
    else if (req.url == '/about') {
        console.log('about')
        fs.readFile('about.html', (err, data) => {
            const file = fs.createReadStream('about.html')
            file.pipe(res)
        })
    } else {
        console.log('hej från elsen')
        const file = fs.createReadStream('./' + req.url)
        file.pipe(res)
        //här vill vi då skriva vår pipe till error-sidan
        file.on('error', () => {
            const file = fs.createReadStream('404.html');
            file.pipe(res)
        })
    }
})

//starta servern
server.listen(PORT)