import axios from 'axios'
const remindersBaseUrl = 'http://localhost:3001/api/notes' 
const tagsBaseUrl = 'http://localhost:3001/api/tags' 

const getAll = () => {
  const request = axios.get(remindersBaseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(remindersBaseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => { //this route is specified for adding a new tasks to the reminder rather than changing any other reminder's properties.
  const request = axios.put(`${remindersBaseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const del = (id) => {
  const request = axios.delete(`${remindersBaseUrl}/${id}`)
  return request.then(response => response.data)
}

const getReminder = (id) => {
  const request = axios.get(`${remindersBaseUrl}/${id}`)
  return request.then(response => response.data)
}

const getTag = () => {
  const request = axios.get(tagsBaseUrl)
  return request.then(response => response.data)
}
const createTag = (newTag) => {
  const request = axios.post(tagsBaseUrl, newTag)
  return request.then(response => response.data)
}

export default { 
  getAll, 
  create, 
  update ,
  del,
  getTag, 
  createTag,
  getReminder
}
