const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');

const user = require('./app/user');
const post = require('./app/post');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const init = async () => {
    await mongoose.connect(config.baseUrl,config.baseConfig);

    app.use('/user', user);
    app.use('/posts', post);


    app.listen(8000, () => {
        console.log('Server started on 8000 host!');
    });
};

init().catch(e => console.log(e));