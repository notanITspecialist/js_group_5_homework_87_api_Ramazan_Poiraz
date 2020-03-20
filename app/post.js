const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const config = require('../config');


const tokenCheck = require('../middlewerase/tokenCheck');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.uploads)
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author');

    res.send(posts);
});

router.get('/:id', async (req, res) => {
    const posts = await Post.findOne({_id: req.params.id}).populate('author');

    res.send(posts);
});

const addMiddleware = [tokenCheck, upload.single('image')];

router.post('/', addMiddleware, async (req, res) => {
    if(req.file){
        req.body.image = req.file.filename;
    }

    try {
        req.body.author = req.user._id;
        const post = await Post.create(req.body);
        res.send(post);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/comment/:id', tokenCheck, async (req, res) => {
    try {
        req.body.author = req.user._id;
        req.body.authorUsername = req.user.username;

        await Post.updateOne({_id: req.params.id}, {
            $push: {
                comments: req.body
            }
        }, { runValidators: true });

        res.send({message: 'Comment added'});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;