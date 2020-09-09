const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const listHelper = require('../utils/list_helper')


test('total blog count as json', async () => {
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
        expect(blogs.body.length).toBe(19)

}, 10000)


test('id is named id', async () => {
    const blogs = await api
        .get('/api/blogs')


    blogs.body.forEach(el => {
        expect(el.id).toBeDefined()
    });

}, 10000)


describe('User is logged in and', () => {

    let token = null

    test('new blog is saved', async () => {
    

        await api
        .post('/api/login')
        .send({
            username: 'cloudtruck',
            password: 'mypassword'
        })
        .expect(200)
        .expect(res => {
            res.body.token.startsWith('ey')
            token = res.body.token
        })

        const initial = await api.get('/api/blogs')
    
        const newBlog = {
            title: 'FINAL - 200 - all teststestestxsdfxxhgfhfx',
            author: 'Cloud Var',
            url: 'news.com.au',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: 'bearer ' + token})
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const final = await api.get('/api/blogs')
        expect(final.body.length).toBe(initial.body.length + 1)
    
    
    }, 20000)

    test('zero likes', async () => {

        await api
        .post('/api/login')
        .send({
            username: 'cloudtruck',
            password: 'mypassword'
        })
        .expect(200)
        .expect(res => {
            res.body.token.startsWith('ey')
            token = res.body.token
        })
    
        const newBlog = {
            title: "ZERO LIKES - from testsxsdfgfhfxx",
            author: 'Britt K',
            url: 'bbc.com'
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: 'bearer ' + token })
            .expect(200)
        
    
        const updatedList = await api.get('/api/blogs')
        const blog = await updatedList.body.find(blog => blog.title === newBlog.title)
    
        expect(blog.likes).toBe(0)
    
            
    }, 20000)
},30000)




test('No Title and No URL returns 400 Bad Request', async () => {
    const newBlog = {
        author: 'Cloud Var',
        url: 'bbc.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

}, 20000)

test('Blog can be updated', async () => {
    const id = "5f57210c0e5103290acc4494"

    const newInfo = {
        title: 'Populating User - from test FINAL - allxgfhfdsfdgxxx',
        // author: 'Changed again',
        // url: 'news.com',
        //likes: 30
    }

    await api
        .put(`/api/blogs/${id}`)
        .send(newInfo)
        .expect(200)

    const updatedBlogs = await api.get('/api/blogs')
    const updatedBlog = await updatedBlogs.body.find(blog => blog.id === id)

    expect(updatedBlog.likes).toBe(5)

}, 20000)


describe('Total likes', () => {
    test('of empty array', () => {
        const blogs = []
        expect(listHelper.totalLikes(blogs)).toBe(0)
    })
    test('of array with single blog equals likes of blog', () => {
        const blogs = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 5,
              __v: 0
            }
          ]
        expect(listHelper.totalLikes(blogs)).toBe(blogs[0].likes)
    })
    test('of multiple blogs is actually calculated', async () => {
        const blogs = await Blog.find({})

        expect(listHelper.totalLikes(blogs)).toBe(70)
    })
})

test('Favourite Blog', async () => {
    const blogs = await Blog.find({})

    expect(listHelper.favBlog(blogs)).toEqual({
        title: "Populating user 3 - final",
        author: "Max Verstappen",
        likes: 25
    })
}, 20000)

test('Most blogs', async () => {
    const blogs = await Blog.find({})

    expect(listHelper.mostBlogs(blogs)).toEqual({
        author: "Cloud Var",
        blogs: 9
    })
})

test('Most likes', async () => {
    const blogs = await Blog.find({})

    expect(listHelper.mostLikes(blogs)).toEqual({
        author: "Max Verstappen",
        likes: 37
    })
}, 20000)

afterAll(() => mongoose.connection.close())