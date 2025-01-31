const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simple Ping-Pong endpoint
app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
