const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: function () {
            return !!this.image === false && true
        }
    },
    date: {
      type: Date,
      default: Date.now()
    },
    image: {
        type: String,
        required: function () {
            return !!this.description === false && true
        }
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
        ref: 'user'
    },
    comments: [{
        text: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        authorUsername: {
            type: String,
            required: true
        }
    }]
});

postSchema.methods.t = function (t) {
    console.log(t)
};

const Post = mongoose.model('post', postSchema);

module.exports = Post;