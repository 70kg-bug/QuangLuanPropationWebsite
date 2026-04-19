
const {note: Note, tag: Tag} = require('./models/note.js')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/notes', (request, response) => {
  Note.find({}).then(note => {
    console.log(note)
    response.json(note)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  // if (!body.content) {
  //   return response.status(400).json({ error: 'content missing' })
  // }

  const note = new Note({
    title: body.title,
    content: body.content,
    priority: body.priority,
    tasks: []
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
app.put('/api/notes/:id', async (req, res, next) => {
  try {
    const { title, content } = req.body
    const idx = req.params.id

    const updatedNote = await Note.findByIdAndUpdate( //the async await keywords here are very important 
      idx,//because at the code below, the .json(updatedNote) will serialize the returned promise of Note.findByIdAndUpdate() method
      {//if no async await used, the json() method will try to serialize an unresolved promise/query which will raise "Converting circular structure to JSON" error
        $push: {//we don't have to use updateNote.save() here because the $push:{...} has saved the added task to the reminder model for us
          tasks: {
            title: title,
            content: content,
          }
        }
      },
      { returnDocument: 'after' }
    )

    if (updatedNote) {
      res.status(200).json(updatedNote)
    } else {
      res.status(404).send({ error: 'note not found' })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message)
  }
})

app.delete('/api/notes/:id/tasks/:taskIndex', async (req, res, next) => {
  try {
    const idx = req.params.id
    const taskIndex = Number.parseInt(req.params.taskIndex, 10)

    if (Number.isNaN(taskIndex)) {
      return res.status(400).json({ error: 'taskIndex must be a number' })
    }

    const note = await Note.findById(idx)
    if (!note) {
      return res.status(404).json({ error: 'note not found' })
    }

    if (!Array.isArray(note.tasks) || taskIndex < 0 || taskIndex >= note.tasks.length) {
      return res.status(400).json({ error: 'invalid task index' })
    }

    note.tasks.splice(taskIndex, 1)
    const updatedNote = await note.save()

    res.status(200).json(updatedNote)
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message)
  }
})
//================================================================================================================\\
 
app.get('/api/tags', (req, res) => {
  Tag.find({})
  .then(returnTags => {
    console.log(returnTags)
    res.json(returnTags)
  })
})

app.delete('/api/tags/:id', (request, response, next) => {
  Tag.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/tags', (request, response) => {
  const body = request.body

  if (!body.tag) {
    return response.status(400).json({ error: 'tag content missing' })
  }

  const tag = new Tag({
    tag: body.tag 
  })

  tag.save().then(savedTag => {
    response.json(savedTag)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})