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
    const reminderContent = formJson.content
    const reminderPriority = formJson.priority
    const addedTag = formJson.tag

    const newReminder = {
      title: reminderTitle,
      content: reminderContent,
      priority: reminderPriority,
      tags: "tags",
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

  const handleFormSubmitToAddTask = (e) => {
    e.preventDefault()

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.title
    const content = formJson.content
    const id = formJson.id
    const taskId = formJson.taskId
    const addedTask = {
        'taskId': taskId,
        'title': title,
        'content': content
    }
    noteService
    .update(id, addedTask)
    .then((newTask) => {
        console.log(newTask)
    })

    setHighPriorityReminders(
        highPriorityReminders.map(reminder =>
            reminder.id === id
                ? { ...reminder, tasks: [...reminder.tasks, addedTask] }
                : reminder
        )
    )

    // Also update other priority lists
    setMidPriorityReminders(
        midPriorityReminders.map(reminder =>
            reminder.id === id
                ? { ...reminder, tasks: [...reminder.tasks, addedTask] }
                : reminder
        )
    )

    setLowPriorityReminders(
        lowPriorityReminders.map(reminder =>
            reminder.id === id
                ? { ...reminder, tasks: [...reminder.tasks, addedTask] }
                : reminder
        )
    )
  }

  const handleDeleteTask = (reminderId, taskIndex) => {
    const updateReminders = (reminders) =>
      reminders.map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, tasks: reminder.tasks.filter((_, idx) => idx !== taskIndex) }
          : reminder
      )
    
    noteService
    .deleteTask(reminderId, taskIndex)

    setHighPriorityReminders(updateReminders)
    setMidPriorityReminders(updateReminders)
    setLowPriorityReminders(updateReminders)
    console.log(taskIndex)
  }

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
              inputContent={inputContent}
              handleContentChange={handleContentChange}
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
          tasks={reminder.tasks}
          handleFormSubmitToAddTask={handleFormSubmitToAddTask}
          handleDeleteTask={handleDeleteTask}
          />
          ))}
          {midPriorityReminders.map((reminder) => (
          <Reminder
          key={reminder.id}
          title={reminder.title}
          content={reminder.content}
          priority={reminder.priority}
          tags={reminder.tag}
          tasks={reminder.tasks}
          handleFormSubmitToAddTask={handleFormSubmitToAddTask}
          handleDeleteTask={handleDeleteTask}
          />
          ))}
          {lowPriorityReminders.map((reminder) => (
          <Reminder
          key={reminder.id}
          title={reminder.title}
          content={reminder.content}
          priority={reminder.priority}
          tags={reminder.tag}
          tasks={reminder.tasks}
          handleFormSubmitToAddTask={handleFormSubmitToAddTask}
          handleDeleteTask={handleDeleteTask}
          />
          ))}
      </main>
    </>
  )
}

export default App