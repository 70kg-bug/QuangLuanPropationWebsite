import "./navBar.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ChecklistIcon from '@mui/icons-material/Checklist';
import  "../btnCreateReminder/btnCreateReminder.css";
import CardActions from '@mui/material/CardActions';

const NavBar = ({setShow, clearAll}) => {
    return (
        <div className="nav-bar">
            <h1 style={{marginBottom: 24, fontWeight:550}}>My notes</h1>

            <button className="btn-create-folder btn btn-info btn-lg" data-toggle="modal" data-target="#createReminder" onClick={setShow}>
                <span className="btn-create-folder__icon" aria-hidden="true">+</span>
                Create new reminder
            </button>
            <button onClick={clearAll}>Clear All Reminders</button>
            
            <ul>
                <li>
                    <div className="list-item">
                        <button className="nav" style={{marginTop:24}}>
                            <ChecklistIcon/> All tasks
                        </button>
                    </div>
                </li>
                <li>
                    <div className="list-item">
                        <button className="nav">
                            <StarBorderIcon/> Starred
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default NavBar