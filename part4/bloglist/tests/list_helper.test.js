const listHelper = require('../utils/list_helper')

const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when list has multiple blogs, equals the likes of them', () => {
    const result = listHelper.totalLikes(helper.blogs)
    expect(result).toBe(36)
  })
})

describe('most favorite', () => {
  test('blog has the most likes', () => {
    const result = listHelper.favoriteBlog(helper.blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs author', () => {
  test('author has the most blogs', () => {
    const result = listHelper.mostBlogsAuthor(helper.blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most blogs author', () => {
  test('author has the most blogs', () => {
    const result = listHelper.mostLikesAuthor(helper.blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
