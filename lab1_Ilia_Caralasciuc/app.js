const fs = require('fs');
const path = require('path');

console.log("Node.js is working!");

const http = require('http');

const server = http.createServer((req, res) => {

    const now = new Date();

    console.log(req.method + ' | ' + req.url + ' | ' +  now.toLocaleString('ru-RU'));


    if (req.method === 'GET' && req.url === '/') {
    res.end('Home page');
    }
    else if (req.method === 'GET' && req.url === '/about') {
        res.end('About page');
    }
    else if (req.method === 'GET' && req.url === '/api/student') {
        const student = {
            name: 'Caralasciuc Ilia',
            group: 'IA2403ru',
            speciality: 'Applied Informatics'
        };

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(student));
    }
    else if (req.method === 'GET' && req.url === '/student') {
        res.end('Caralasciuc Ilia - IA2403ru - Applied Informatics');
    }
    else if (req.method === 'GET' && req.url === '/time') {
        res.end(now.toLocaleString('ru-RU'));
    }
    else if(req.method === 'GET' && req.url === '/api/courses') {
        const courses =
            [
                {
                    discipline: 'Artificial Intelegence',
                    teacher: 'Grigorcea', 
                    credits: 4
                },
                {
                    discipline: 'Realitatea Virtuala',
                    teacher: 'Plesca', 
                    credits: 3
                },
                {
                    discipline: 'Dezvoltarea aplicatii mobile',
                    teacher: 'Negura', 
                    credits: 4
                }
            ]

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(courses));
    }

    else if(req.method === 'GET' && req.url === '/my-image') {
        const imagePath = path.join(__dirname, 'images', 'sigma.png');

        fs.readFile(imagePath, (err, data) => {
            if(err) {
                res.statusCode = 404;
                res.end('Image not found');
            }
            
            res.setHeader('Content-Type', 'image/png');

            res.end(data);
        })
    }
        
    else {
        res.statusCode = 404;
        res.end('404 - Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


