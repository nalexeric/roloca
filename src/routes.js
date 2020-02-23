const express = require('express');
const cors = require('cors');
const {
    getCities,
    getCitiesByCounty,
    getCitiesByCountyCode,
    getCounties,
    searchCitiesInCounty
} = require('./queries.js');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('ok');
});

app.get('/judete', async (req, res) => {
    const counties = await getCounties();
    res.send(counties);
});

app.get('/orase', async (req, res) => {
    const cities = await getCities();
    res.send(cities);
});

app.get('/orase/:county', async (req, res) => {
    const {county} = req.params;
    const cities =
        county.length === 2 ? await getCitiesByCountyCode(county) : await getCitiesByCounty(county);
    res.send(cities);
});

app.get('/search/:county/:term', async (req, res) => {
    const {county, term} = req.params;
    const cities = await searchCitiesInCounty(county, term);
    res.send(cities);
});

module.exports = app;
