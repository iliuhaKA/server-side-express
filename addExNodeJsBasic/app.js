const products = [
{ id: 10, name: 'Laptop', category: 'electronics', price: 15000 },
{ id: 15, name: 'Mouse', category: 'electronics', price: 500 },
{ id: 21, name: 'Chair', category: 'furniture', price: 2500 },
{ id: 32, name: 'Table', category: 'furniture', price: 5000 }
];


const http = require('http');

const server = http.createServer((req, res) => {
    
    const url = new URL(
        req.url, `http://${req.headers.host}`
    );

    const parts = url.pathname.split('/');

    if(req.method === 'GET' && req.url === '/api/products'){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(products));
    }
    else if(req.method === 'GET' && parts[1] === 'api' && parts[2] === 'products' && parts[3]){
        const product = products.find(student => student.id === Number(parts[3]));
        if(product){
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(product));
        }
        else {
            res.statusCode = 404;
            res.end('Product with this ID doesn\'t exists!');
        }
    }
    else if(req.method === 'GET' && url.pathname === '/api/products'){
        const category = url.searchParams.get('category');
        const maxPrice = url.searchParams.get('maxPrice');
        let result = products.filter(product => {
            const matchCategory = !category || product.category === category;
            const matchMaxPrice = !maxPrice || product.price <= Number(maxPrice);

            return matchCategory && matchMaxPrice;
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    }
    else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})

