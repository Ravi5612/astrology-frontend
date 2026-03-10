const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3003,
    path: '/api/v1/expert/wallet/transactions',
    method: 'GET',
    headers: {
        'Cookie': 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJyb2xlIjoiZXhwZXJ0IiwiaWF0IjoxNzczMTIxNzI3LCJleHAiOjE3NzMxMjI2Mjd9.gcrvsiL2MpRiAJb82KA1zBN_kl5MdljiBUpNBlfFe60;'
    }
};

const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Response:', data));
});

req.on('error', e => console.error(e));
req.end();
