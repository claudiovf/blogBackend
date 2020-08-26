const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const listHelper = require('../utils/list_helper')


test('total blog count as json', async () => {
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
        expect(blogs.body.length).toBe(9)

}, 10000)


test('id is named id', async () => {
    const blogs = await api
        .get('/api/blogs')


    blogs.body.forEach(el => {
        expect(el.id).toBeDefined()
    });

}, 10000)

test('new blog is saved', async () => {

    const initial = await api.get('/api/blogs')

    const newBlog = {
        title: 'This Test Should Final ',
        author: 'Cloud Var',
        url: 'news.com.au',
        likes: 19
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const final = await api.get('/api/blogs')
    expect(final.body.length).toBe(initial.body.length + 1)

}, 20000)

test('zero likes', async () => {
    const newBlog = {
        title: "ZERO LIKES",
        author: 'Britt K',
        url: 'bbc.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    

    const updatedList = await api.get('/api/blogs')
    const blog = await updatedList.body.find(blog => blog.title === newBlog.title)

    expect(blog.likes).toBe(0)

        
}, 20000)


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
    const id = "5f3622bd702228dd4163554a"

    const newInfo = {
        title: 'Updating Blogs Final',
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

    expect(updatedBlog.likes).toBe(30)

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
    test('of multiple blogs is actually calculated', () => {
        const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }]

        expect(listHelper.totalLikes(blogs)).toBe(36)
    })
})

test('Favourite Blog', () => {
    const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }]

    expect(listHelper.favBlog(blogs)).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    })
})

test('Most blogs', () => {
    const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }]

    expect(listHelper.mostBlogs(blogs)).toEqual({
        author: "Robert C. Martin",
        blogs: 3
    })
})

test('Most likes', () => {
    const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }]

    expect(listHelper.mostLikes(blogs)).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17
    })
})

afterAll(() => mongoose.connection.close())