import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import EditQuestion from './EditQuestion';
import './Admin.css';

// dialog area start
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
// dialog area end

const AddNewQuestion = () => {
    const history = useHistory();
    let serial = 1;
    // dialog area start
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // dialog area end
    const newQuestion = {};
    const [allQuestions, setAllQuestions] = useState([]);
    const [examAlert, setExamAlert] = useState(false);
    const [selectedExam, setSelectedExam] = useState("notSelected")
    const [allExams, setAllExams] = useState([]);
    const [tempData, setTempData] = useState({});
    //retrive all questions from server
const allquestions = () => {
            fetch('https://livemcq.herokuapp.com/allquestions')
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setAllQuestions(result);
            })
}

useEffect(() => {
    allquestions();
    allExamsList();
}, [])

    const allExamsList = () => {
        fetch("https://livemcq.herokuapp.com/allexam")
        .then(response => response.json())
        .then(result => {
            setAllExams(result);
        })
    }

    const handleField = (e) => {
        
        newQuestion[e.target.name] = e.target.value;
    } 

    const handleForm = (e) => {
        const exam = document.getElementById("select").value;
        newQuestion["exam"] = exam;
        if (exam == "notSelected") {
            setExamAlert(true);
        }else{
            fetch('https://livemcq.herokuapp.com/addquestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuestion)
        })
        .then(res => {
            if(res){
                allquestions();
                setExamAlert(false);
                alert("New Question Added.");
            }
        });

        allquestions();
       
        document.getElementById('question').value = "";
        document.getElementById('a').value = "";
        document.getElementById('b').value = "";
        document.getElementById('c').value = "";
        document.getElementById('d').value = "";
        document.getElementById('radioA').checked = false;
        document.getElementById('radioB').checked = false;
        document.getElementById('radioC').checked = false;
        document.getElementById('radioD').checked = false;
        }
        
        e.preventDefault();
    }

    const handleSelect = (e) => {
        setSelectedExam(e.target.value);
    }

    const handleCheck = (e) => {
        console.log("object");
            console.log(e.target.value);
            newQuestion.correct = newQuestion[e.target.value];
    }

    const handleEdit = (id) => {
        fetch('https://livemcq.herokuapp.com/singlequestion/'+ id)
        .then(response => response.json())
        .then(data => {
            setTempData(data);
        })

        handleClickOpen();
    }

    const handleDelete = (id) => {
        fetch('https://livemcq.herokuapp.com/deletequestion/' + id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                allquestions();
                alert('Delete successful');
            }
        })
    }
    return (
        <div className="w-100 mx-auto">

        {/* dialog area start */}
        <div>
      <Dialog
      fullWidth=''
      maxWidth=''
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Question"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <EditQuestion data = {tempData} setOpen={setOpen} allquestions={allquestions}></EditQuestion>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
        {/* dialog area end */}

           <form onSubmit={e => {           e.preventDefault();         }}    >
          
            {/* select exam here */}
            <select id="select" className="form-control form-select form-select-lg mb-3" aria-label=".form-select-lg example">
            <option required selected value="notSelected">Please select exam</option>
            {
                allExams.map(ex => <option value={ex.name}>{ex.name}</option>)
            }
            </select>
            
            {/* select exam here */}
               {
                   examAlert ?  <div className="alert alert-warning">Please select exam!</div> :  <div className="alert alert-warning d-none">Please select exam!</div>
               }
       
           <div class="mb-3">
            <input required name="question" id="question" type="text" onBlur={handleField} name="question" className="form-control mt-2" id="question" placeholder="Type new question"></input>
            </div>

            <div className="row">
                <div className="col-md-6">

                <div class="input-group">
                    <div class="input-group-text">
                        <input required class="form-check-input" onChange={handleCheck} id="radioA" type="radio" name="correct" value="a" aria-label="Radio button for following text input"></input>
                    </div>
                    <input required autoComplete="off"  onBlur={handleField} name="a" id="a" placeholder="Enter option A" type="text" className="form-control" aria-label="Text input with radio button"></input>
                </div>
                <div class="input-group  mt-2">
                    <div class="input-group-text ">
                        <input required class="form-check-input " type="radio" onChange={handleCheck} id="radioB" name="correct" value="b" aria-label="Radio button for following text input"></input>
                    </div>
                    <input required autoComplete="off" onBlur={handleField} name="b" id="b" placeholder="Enter option B" type="text" className="form-control" aria-label="Text input with radio button"></input>
                </div>
                <div class="input-group mt-2">
                    <div class="input-group-text">
                        <input required class="form-check-input" type="radio" onChange={handleCheck} id="radioC" name="correct" value="c"  aria-label="Radio button for following text input"></input>
                    </div>
                    <input required autoComplete="off" onBlur={handleField} name="c" id="c" placeholder="Enter option C" type="text" className="form-control " aria-label="Text input with radio button"></input>
                </div>
                <div class="input-group mt-2">
                    <div class="input-group-text">
                        <input required class="form-check-input" type="radio" onChange={handleCheck} id="radioD" name="correct" value="d" aria-label="Radio button for following text input"></input>
                    </div>
                    <input required autoComplete="off" onBlur={handleField} name="d" id="d"placeholder="Enter option D" type="text" className="form-control" aria-label="Text input with radio button"></input>
                </div>
                </div>
                <div className="col-md-6">
                <button type="submit" onClick={handleForm} className="btn btn-secondary w-100 h-100 add-btn">Add Question</button>
                </div>
            </div>

           </form>
    
        </div>
    );
};

export default AddNewQuestion;