import './styles.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';

const Reminder = ({id, title, tags, tasks = [], handleFormSubmitToAddTask, handleDeleteTask}) => {
    const [titleInputValue, setTitleInputValue] = useState("")
    const [contentInputValue, setContentInputValue] = useState("")
    const [showTaskInput, setShowTaskInput] = useState(false)

    const handleTitleInputChange = (event) => {
        setTitleInputValue(event.target.value)                                                                  
    }
    const handleContentInputChange = (event) => {
        setContentInputValue(event.target.value)                                                                  
    }
      const chageShowTaskInput = () => {
    setShowTaskInput(!showTaskInput)
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
                    <button className='btn-add-task' onClick={chageShowTaskInput}><NoteAddIcon/><span>Add a new task</span></button>
                    {showTaskInput &&
                        <div>                      
                            <form onSubmit={handleFormSubmitToAddTask} className='reminder-input-form' id='reminder'>
                                <div>
                                    <input type="text" name='title' value={titleInputValue} placeholder='Title' onChange={handleTitleInputChange} className='reminder-title-input-field'/>
                                </div>
                                <div className='reminder-content-input-field'>
                                    <input type="text" name='content' value={contentInputValue} placeholder='Detail' onChange={handleContentInputChange} className='reminder-content-input-field' />
                                </div>
                                <div>
                                    <input type="text" name='id' value={id} readOnly style={{display: 'none'}}/>
                                </div>
                                <div>
                                    <input type="text" name='taskId' value={tasks.length} readOnly style={{display: 'none'}}/>
                                </div>
                            </form>
                            <button type='submit' className='save-button' form='reminder'>Save</button>
                        </div>
                    }

                    <ul>
                        {tasks.map((task, index) => 
                            <li key={`${id}-${index}`}>
                                {task.title}
                                <IconButton onClick={() => handleDeleteTask?.(id, index)}>
                                    <DoneIcon/>
                                </IconButton>
                            </li>
                        )}
                    </ul>
                </div>

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
    )
}

export default Reminder