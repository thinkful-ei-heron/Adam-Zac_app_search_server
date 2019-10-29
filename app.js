const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

const appset = require('./google-data');

app.get('/apps', (req, res) => {
    const { sort, genres} = req.query;
    

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res.status(400).send('Sort must be one of Rating or App');
        }
    }

    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res.status(400).send('Genre selection must be either Action, Puzzle, Strategy, Casual, Arcade, or Card');
        }
    }

    let results = appset
    
    if (genres) {
        results = appset.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()));
    }

    if (sort) {
        results.sort((a, b) => {
            return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0
        })
    }

    res.json(results)
})

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
})