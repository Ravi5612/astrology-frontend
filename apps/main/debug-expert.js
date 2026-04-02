const http = require('http');

http.get(`${API_BASE_URL}/expert/list`, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    resp.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.data && json.data.length > 0) {
            } else {
            }
        } catch (e) {
        }
    });

}).on("error", (err) => {
});
