import { useState, useEffect } from "react"
import './components/reminder/Reminder.jsx'
import Reminder from "./components/reminder/Reminder.jsx"
import noteService from './service/service'
import Form from "./components/formCreateReminder/form.jsx"
import Dialog from '@mui/material/Dialog'
import TemporaryDrawer from "./components/Drawer/drawer.jsx"
import NavBar from "./components/navBar/navBar.jsx"

import "./App.css"
import "./components/btnCancel/btnCancel.css"
import "./components/btnSaveReminder/saveButton.css"
import "./components/formCreateReminder/form.css"
import "./components/reminder/styles.css"


const App = () => {
  const [inputTitle, setInputTitle] = useState("")
  const [inputContent, setInputContent] = useState("")
  const [highPriorityReminders, setHighPriorityReminders] = useState([])
  const [midPriorityReminders, setMidPriorityReminders] = useState([])
  const [lowPriorityReminders, setLowPriorityReminders] = useState([])
  const [show, setShow] = useState(false)
  const [tags, setTags] = useState([])


  const hook = () => {
  noteService
      .getAll()
      .then(initialReminders => {
        setHighPriorityReminders(initialReminders.filter((reminder) => reminder.priority === "High"))
        setMidPriorityReminders(initialReminders.filter((reminder) => reminder.priority === "Mid"))
        setLowPriorityReminders(initialReminders.filter((reminder) => reminder.priority === "Low"))
      })
  
  noteService
  .getTag()
  .then(initialTags =>{
    setTags(initialTags)
  })
  }
  useEffect(hook, [])
  
  const handleFormSubmit = (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault()

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    const reminderTitle = formJson.title
    const reminderPriority = formJson.priority
    const addedTag = formJson.tag

    const newReminder = {
      title: reminderTitle,
      priority: reminderPriority,
      tags:"tags",
      tasks: []
    }

    noteService
    .create(newReminder)
    .then((returnReminder) => {
      if (returnReminder.priority === "High"){
        setHighPriorityReminders(highPriorityReminders.concat(returnReminder))
      }
      else if (returnReminder.priority === "Mid"){
        setMidPriorityReminders(midPriorityReminders.concat(returnReminder))
      }
      else if (returnReminder.priority === "Low"){
        setLowPriorityReminders(lowPriorityReminders.concat(returnReminder))
      }
    })

    if (addedTag !== ""){
      const newTag = {
        tag: addedTag
      }
      noteService
      .createTag(newTag)
      .then((returnedTag) => {
        setTags(tags.concat(returnedTag))
      })
    }

    setInputContent("")
    setInputTitle("")
  }

  const handleTitleChange = (event) => {
    setInputTitle(event.target.value)
  }

  const handleContentChange = (event) => {
    setInputContent(event.target.value)
  }

  const clearAll = () => {
    highPriorityReminders.map((reminder)=>{
      noteService
      .del(reminder.id)
      .then(()=>{
          setHighPriorityReminders([])
      })
    })
    

    midPriorityReminders.map((reminder)=>{
      noteService
      .del(reminder.id)
      .then(()=>{
        setMidPriorityReminders([])
      })
    })

    lowPriorityReminders.map((reminder)=>{
      noteService
      .del(reminder.id)
      .then(()=>{
        setLowPriorityReminders([])
      })
    })
  }

  const handleClose = () => {
    setShow(!show);
  }

  // const print = () => {
  //   highPriorityReminders.map((rem) => {
  //     const id = rem.id
  //     noteService
  //     .getReminder(id)
  //     .then((r) => {
  //       console.log(r.id)
  //     })
  //   })
  // } -> a demo of the usage of getReminder in axios which links to app.get('/api/notes/:id' in express js

  return (
    <>
      <NavBar
      setShow={setShow}
      clearAll={clearAll}
      />
 
{/* <TemporaryDrawer/> - a hidden side navbar
<h1><a href="page2.html">Page 2</a></h1> */}
      <div className="control"> 
        <Dialog open={show} onClose={handleClose}>
          <div>
            <Form
              handleFormSubmit={handleFormSubmit}
              inputTitle={inputTitle}
              handleTitleChange={handleTitleChange}
              handleClose={handleClose}
            />
          </div>
        </Dialog>

        
        <header>
          <div style={{display:"flex", alignItems: "center"}}>
            <h2 style={{fontWeight:550}}>See all your reminders here</h2>
          </div>
        </header>
        
      </div>


      <main>
          {highPriorityReminders.map((reminder) => (
          <Reminder
          key={reminder.id}
          id={reminder.id}
          title={reminder.title}
          tags={reminder.tag}
          />
          ))}
          {midPriorityReminders.map((reminder) => (
          <Reminder
          key={reminder.id}
          title={reminder.title}
          content={reminder.content}
          priority={reminder.priority}
          tags={reminder.tag}
          />
          ))}
          {lowPriorityReminders.map((reminder) => (
          <Reminder
          key={reminder.id}
          title={reminder.title}
          content={reminder.content}
          priority={reminder.priority}
          tags={reminder.tag}
          />
          ))}
      </main>
    </>
  )
}

export default App