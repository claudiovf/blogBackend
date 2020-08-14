const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

blogsRouter.post('/', (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    })

    blog
        .save()
        .then(retBlog => retBlog.toJSON())
        .then(formatted => {
            res.status(201).json(formatted)
        })
})

module.exports = blogsRouter