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
        likes: req.body.likes || 0
    })

    if( !blog.title || !blog.url ) res.status(400).end()
    else {
        blog
            .save()
            .then(retBlog => retBlog.toJSON())
            .then(formatted => {
                res.status(201).json(formatted)
            })
    }
})

blogsRouter.get('/:id', async (req, res) => {

    const blog = await Blog.findById(req.params.id)
    if(blog) res.json(blog)
    else res.status(404).end()
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {

    const oldBlog = await Blog.findById(req.params.id)

    const blog = {
        title: req.body.title || oldBlog.title,
        author: req.body.author || oldBlog.author,
        url: req.body.url || oldBlog.url,
        likes: req.body.likes || oldBlog.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog)

})
module.exports = blogsRouter