const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs', { url: 1, title: 1, author: 1, comments: 1 })

    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

usersRouter.delete('/:id', async (req, res) => {

    await User.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User
        .findById(req.params.id)
        .populate('blogs', { url: 1, title: 1, author: 1 })

    if (user) res.json(user)
    else res.status(404).end()
})



module.exports = usersRouter