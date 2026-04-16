import './styles.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useState } from 'react';
import noteService from '../../service/service'

const Reminder = ({id, title, tags}) => {
    const [showInput, setShowInput] = useState(false)
    const [titleInputValue, setTitleInputValue] = useState("")
    const [contentInputValue, setContentInputValue] = useState("")

    /*
    add an useEffect hook to query all the tasks for this reminder whenever the page renders.
    */

    const getId = () => {
        console.log(id)
        setShowInput(!showInput)
        noteService
        .getReminder(id)
        .then((rem) => {
            console.log(rem.tasks)
        })
    }
    const handleTitleInputChange = (event) => {
        setTitleInputValue(event.target.value)                                                                  
    }
    const handleContentInputChange = (event) => {
        setContentInputValue(event.target.value)                                                                  
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(titleInputValue)
        console.log(contentInputValue)

        const addedTask = {
            newTasksTitle: titleInputValue,
            newTasksContent: contentInputValue
        }
        noteService
        .update(id, addedTask)
        .then((newTask) => {
            console.log(newTask)
        })

        setTitleInputValue("")
        setContentInputValue("")
        setShowInput(!showInput)
    }
    return (
        <div className='body'>
            <div className="card">
                <div className="card-header">
                    <div className="logo">
                        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="[w3.org](http://www.w3.org/2000/svg)">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                            <path d="M7 9L12 13L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg> */}
                    </div>
                    <div>
                        <button className='logo'><MoreVertIcon/></button>
                    </div>
                    <span className="brand-name">{title}</span>
                </div>
                
                <div className="card-body">
                    <button className='btn-add-task' onClick={getId}><NoteAddIcon/><span>Add a new task</span></button>
                    {showInput &&
                        <div>                      
                            <form onSubmit={handleFormSubmit} className='reminder-input-form' id='reminder'>
                                <div>
                                    <input type="text" name='title' value={titleInputValue} placeholder='Title' onChange={handleTitleInputChange} className='reminder-title-input-field'/>
                                </div>
                                <div className='reminder-content-input-field'>
                                    <input type="text" name='content' value={contentInputValue} placeholder='Detail' onChange={handleContentInputChange} className='reminder-content-input-field' />
                                </div>
                            </form>
                            <button type='submit' className='save-button' form='reminder'>Save</button>
                        </div>
                    }
                    <p className="card-text">
                        
                    </p>
                    
                    <div className="card-footer">
                        {/* <div className="tags">
                            <button className="tag">Gym</button>
                            <button className="tag">AWS</button>
                        </div> */}
                        
                        {/* <button className="arrow-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="[w3.org](http://www.w3.org/2000/svg)">
                                <path d="M9 18L15 12L9 6" stroke="#1a365d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reminder