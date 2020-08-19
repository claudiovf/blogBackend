const _ = require('lodash')

const totalLikes = blogs => {
    if (blogs.length === 0) {
        return 0

    } else if (blogs.length === 1) {
        return blogs[0].likes

    } else {
    
        return blogs.reduce((acc, cur) => acc + cur.likes, 0)
    }
}

const favBlog = blogs => {
    const favorite = blogs.reduce((prev, curr) => {
        return (prev.likes > curr.likes) ? prev : curr
    })
    
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = blogs => {
    
    const authorCount = _.countBy(blogs, 'author')
    const author = Object.keys(authorCount).reduce((a, b) => 
        authorCount[a] > authorCount[b] 
        ? a 
        : b
    )

    return {
        author: author,
        blogs: Math.max(...Object.values(authorCount))
    }
}

const mostLikes = blogs => {
    const authors = []

    blogs.filter(blog => !authors.find( x => x.author === blog.author) 
        ? authors.push({
            author: blog.author,
            likes: blog.likes
        })
        : authors[authors.findIndex(x => x.author === blog.author)].likes += blog.likes
    )

    return authors.reduce((a, b) => a.likes > b.likes ? a : b)
}



module.exports = {
 totalLikes,
 favBlog,
 mostBlogs,
 mostLikes
}

