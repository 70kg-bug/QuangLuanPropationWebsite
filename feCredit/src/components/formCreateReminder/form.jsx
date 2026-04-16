import "./form.css"
import SaveButton from "../btnSaveReminder/saveButton.jsx"
import CancelButton from "../btnCancel/btnCancel.jsx"
import { useState } from "react"

const Form = ({handleFormSubmit, inputTitle, handleTitleChange, handleClose}) => {
    const [inputTag, setInputTag] = useState("")

    const handleInputTagChange = (e) => {
        setInputTag(e.target.value) 
    }

    return (
        <form onSubmit={handleFormSubmit} id="form">

          <div className="input-field">
            <div className="input-field-header">
                <CancelButton handleClose={handleClose}/>
                <p className="new-folder-input-field">New Reminder</p>
                <SaveButton handleClose={handleClose}/>
            </div>
            

            <p className="title-input-field">
              <input className="title"  name="title" type="text" placeholder="Title" value={inputTitle} onChange={handleTitleChange}/>
            </p>
            <hr />
            <p className="tag-input-field">
                <input className="t" type="text" name="tag" placeholder="Add tag" value={inputTag} onChange={handleInputTagChange}/>
            </p>

            <p className="priority-input">
              <label htmlFor="priority">Priority: </label>
              <select name="priority" id="priority">
                <option value="High">High</option>
                <option value="Mid">Mid</option>
                <option value="Low">Low</option>
              </select>
            </p>
          </div>
        </form>
    )
}

export default Form