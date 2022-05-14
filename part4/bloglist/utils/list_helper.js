const dummy = () => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0,
  )
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) =>
    prev.likes > current.likes
      ? { author: prev.author, likes: prev.likes, title: prev.title }
      : { author: current.author, likes: current.likes, title: current.title },
  )
}
const groupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

const groupByAuthor = groupBy('author')

const mostBlogsAuthor = (blogs) => {
  const blogAuthor = []
  const authorObj = groupByAuthor(blogs)
  for (const property in authorObj) {
    blogAuthor.push({
      author: authorObj[property][0].author,
      blogs: authorObj[property].length,
    })
  }
  return blogAuthor.reduce((prev, current) =>
    prev.blogs > current.blogs
      ? { author: prev.author, blogs: prev.blogs }
      : { author: current.author, blogs: current.blogs },
  )
}
const mostLikesAuthor = (blogs) => {
  const likeAuthor = []
  const authorObj = groupByAuthor(blogs)
  for (const property in authorObj) {
    const likes = authorObj[property].reduce((a, b) => a + b.likes, 0)
    likeAuthor.push({
      author: authorObj[property][0].author,
      likes: likes,
    })
  }
  return likeAuthor.reduce((prev, current) =>
    prev.likes > current.likes
      ? { author: prev.author, likes: prev.likes }
      : { author: current.author, likes: current.likes },
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogsAuthor,
  mostLikesAuthor,
}
