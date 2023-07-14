const express = require('express');
const Post = require('../Controller/postController.js')
const route = express.Router();

route.get('/', Post.getPosts);
route.get('/:id', Post.getPost);
route.post('/add', Post.addPost);
route.delete('/:id', Post.deletePost);
route.patch('/:id', Post.updatePost);

module.exports = route;
