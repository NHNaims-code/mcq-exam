import React, { useEffect, useState } from 'react';

// ====================start========================
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import EditExam from './EditExam';
import './AddNewExam.css'

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
// ====================end========================

const AddNewExam = () => {

    const [exams, setExams] = useState([]);
    const [data, setData] = useState();
    const [update, setUpdate] = useState(true);

// =====================start========================
const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open, text) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setData(text);

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className="w-50 mx-auto py-5"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
   
   <EditExam data={data}></EditExam>
    
    </div>
  );
// =====================start========================

    const updateExamList = () => {
        fetch("https://livemcq.herokuapp.com/allexam")
        .then(response => response.json())
        .then(result => {
            setExams(result);
            console.log(exams);
        })
    }

    useEffect(() => {
        updateExamList();
    }, [update])

    const handleNewExam = () => {
        const newExam =  document.getElementById('newExam').value;
        fetch("https://livemcq.herokuapp.com/addexam/"+newExam, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
        })
        .then(response => {
                if(response){
                    updateExamList();
                    alert("Exam added successfully");
                }
        })
    }

    const handleDelete = (id) => {

        fetch("https://livemcq.herokuapp.com/deleteexam/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
            if (response) {
                fetch("https://livemcq.herokuapp.com/allexam")
                .then(response => response.json())
                .then(result => {
                    setExams(result);
                    console.log(exams);
                })
                alert("Exam deleted successfully");
            }
        });
    }

    const handlePopUp = () => {
        
        alert("hit");
    }
    return (
        <div className="d-flex align-items-center flex-column addexamroot">
            <h6>Add new exam</h6>
{/* =========================start========================= */}
<div className="">
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer("top", true)}>{"TOP"}</Button> */}
          <Drawer anchor={"top"} open={state["top"]} onClose={toggleDrawer("top", false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
{/* =========================end========================= */}
            <input type="text" required name="newExam" id="newExam" className="form-control my-5 shadow-sm" placeholder="Enter your new exam here..."/>
            <button onClick={handleNewExam} className="btn btn-warning px-4 py-2 btn-sm w-100 shadow-sm">Add</button>
            <div className=" w-100">
        
                {
                    exams.map(exam => 
                        <div className="new-exam row shadow-sm rounded bg-white  m-0 w-100 my-5" key={exam._id}>
                            <div className="col-md-10 d-flex align-items-center">
                                <h5 className="px-4 py-2 my-3">{exams.indexOf(exam) + 1}) {exam.name}</h5>
                            </div>
                            <div className="col-md-2">
                                <button onClick={() => handlePopUp()}  onClick={toggleDrawer("top", true, `'${exam._id}'`)}   className="btn btn-warning my-1 w-100">Edit</button>
                                <button onClick={() => handleDelete(exam._id)} className="btn btn-danger my-1 w-100">Delete</button>
                            </div>
                        </div>
                    )
                }
            </div>
                
        </div>
    );
};

export default AddNewExam;