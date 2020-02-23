const sqlite3 = require('sqlite3');

function cleanCities() {
    const db = new sqlite3.Database('./db.db');
    const query = 'SELECT * FROM cities';

    db.all(query, [], (err, rows) => {
        const query = 'UPDATE cities SET city = ?, county = ? WHERE id = ?';
        for (const row of rows) {
            db.all(query, [row.city.trim(), row.county.trim(), row.id]);
        }
    });

    db.close();
}

function getCounties() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./db.db', sqlite3.OPEN_READONLY);
        const query = 'SELECT * FROM counties';

        db.all(query, [], (err, rows) => {
            if (err) reject(err.message);
            resolve(rows);
        });

        db.close();
    });
}

function getCities() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./db.db', sqlite3.OPEN_READONLY);
        const query = 'SELECT city FROM cities';

        db.all(query, [], (err, rows) => {
            if (err) reject(err.message);
            resolve(rows);
        });

        db.close();
    });
}

function getCitiesByCountyCode(county_code) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./db.db', sqlite3.OPEN_READONLY);
        const query = 'SELECT city FROM cities WHERE county_code = ?';

        db.all(query, [county_code], (err, rows) => {
            if (err) reject(err.message);
            resolve(rows);
        });

        db.close();
    });
}

function getCitiesByCounty(county) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./db.db', sqlite3.OPEN_READONLY);
        const query = 'SELECT city FROM cities WHERE county = ?';

        db.all(query, [county], (err, rows) => {
            if (err) reject(err.message);
            resolve(rows);
        });

        db.close();
    });
}

function searchCitiesInCounty(county, term) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./db.db', sqlite3.OPEN_READONLY);
        const query = 'SELECT city FROM cities WHERE county = ? AND city LIKE ?';

        db.all(query, [county, `${term}%`], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });

        db.close();
    });
}

module.exports = {
    getCities,
    getCitiesByCounty,
    getCitiesByCountyCode,
    getCounties,
    searchCitiesInCounty
};
