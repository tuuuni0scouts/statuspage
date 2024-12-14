const express = require('express');
const ping = require('ping');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/ping', async (req, res) => {
    const host = req.query.host;
    if (!host) {
        return res.status(400).json({ error: 'Host is required' });
    }

    try {
        const response = await ping.promise.probe(host);
        res.json({ host, alive: response.alive });
    } catch (error) {
        res.status(500).json({ error: 'Error pinging host' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});