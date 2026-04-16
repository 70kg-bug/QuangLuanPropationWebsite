require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// const password = process.argv[2]

// const url = `mongodb+srv://12a5phamquangluan22_db_user:${password}@cluster0.tkmbsnd.mongodb.net/noteApp?appName=Cluster0`
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  title: String,
  priority: String,
  tasks: [mongoose.Schema.Types.Mixed]
})

const tagSchema = new mongoose.Schema({
  tag: String
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const note = mongoose.model('Note', noteSchema)
const tag = mongoose.model('Tag', tagSchema)

module.exports = {note, tag}
