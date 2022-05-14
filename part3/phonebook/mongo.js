const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
} else {
  console.log(process.argv)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.wab9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 5) {
  person.save().then(() => {
    console.log(`Added ${process.argv[3]} ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('Phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log(
    'Please provide the right number of arguments. If the name you are trying to add containes spaces, wrap it in quotes.'
  )
  mongoose.connection.close()
}
