const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('GET request to /api/blogs', () => {
  test('all blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }),

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  }),

  test('specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('React patterns')
  }),

  test('all blogs have a identifying id field', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.id)
    expect(contents).toBeDefined()
  })
})

describe('GET request to /api/blogs/:id', () => {
  test('specific blog is returned', async () => {
    const response = await api.get('/api/blogs/5a422a851b54a676234d17f7')
    const contents = response.body
    expect(contents.title).toContain('React patterns')
  })
})

describe('POST request to /api/blogs/', () => {
  test('valid blog can be added ', async () => {
    const newBlog = {
      title: 'asd',
      author:'asdallax',
      url: 'https://asd.com',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.url)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('https://asd.com')
  })

  test('blog without likes get 0 likes by default', async () => {
    const newBlog = {
      _id: '5a422a851b54a676234d17f9',
      title: 'asd',
      author:'asdallax',
      url: 'https://asd.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)

    const response2 = await api.get('/api/blogs/5a422a851b54a676234d17f9')
    expect(response2.body.likes).toBe(0)
  })

  test('blog without content is not added', async () => {
    const newNote = {
      author: 'jotain puuttuu',
    }

    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('DELETE request to /api/blogs/:id', () => {
  test('removes the blog', async () => {

    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .expect(204)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.url)

    expect(response.body).toHaveLength(initialBlogs.length - 1)
    expect(contents).not.toContain('https://reactpatterns.com/')
  })
})

describe('PUT request to /api/blogs/:id', () => {
  test('causes the blog to change', async () => {
    const newBlog = {
      title: 'asd',
      author:'asdallax',
      url: 'https://asd.com',
      likes: 6
    }

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(newBlog)
      .expect(200)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.url)

    expect(response.body).toHaveLength(initialBlogs.length)
    console.log(response.body)
    expect(contents).toContain('https://asd.com')
  })

  test('with title field only causes the blog to change title', async () => {
    const newBlog = {
      title: 'asd',
    }

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(newBlog)
      .expect(200)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length)
    console.log(response.body)
    expect(contents).toContain('asd')
  })
})

afterAll(() => {
  mongoose.connection.close()
})