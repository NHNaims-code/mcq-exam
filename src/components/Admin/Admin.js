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
// dialog area end

const Admin = () => {

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
    const [tempData, setTempData] = useState({});
    //retrive all questions from server
const allquestions = () => {
            fetch('http://localhost:4000/allquestions')
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setAllQuestions(result);
            })
}

useEffect(() => {
    allquestions();
}, [])

    const handleField = (e) => {
        
        newQuestion[e.target.name] = e.target.value;
    } 

    const handleForm = (e) => {
        fetch('http://localhost:4000/addquestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuestion)
        })
        .then(res => {
            if(res){
                allquestions();
            }
        });

        allquestions();
        document.getElementById('exam').value = "";
        document.getElementById('question').value = "";
        document.getElementById('a').value = "";
        document.getElementById('b').value = "";
        document.getElementById('c').value = "";
        document.getElementById('d').value = "";
        document.getElementById('radioA').checked = false;
        document.getElementById('radioB').checked = false;
        document.getElementById('radioC').checked = false;
        document.getElementById('radioD').checked = false;
        e.preventDefault();
    }

    const handleCheck = (e) => {
        console.log("object");
            console.log(e.target.value);
            newQuestion.correct = newQuestion[e.target.value];
    }

    const handleEdit = (id) => {
        fetch('http://localhost:4000/singlequestion/'+ id)
        .then(response => response.json())
        .then(data => {
            setTempData(data);
        })

        handleClickOpen();
    }

    const handleDelete = (id) => {
        fetch('http://localhost:4000/deletequestion/' + id, {
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
        <div className="w-50 mx-auto">
           <Header></Header>

        {/* dialog area start */}
        <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
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
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            update
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
        {/* dialog area end */}

           <form onSubmit={handleForm}>
               <input required type="text" onBlur={handleField}  name="exam" id="exam" placeholder="Exam title" className="form-control mt-3"/>
               <div className="id mt-5">
                <input required type="number" className="form-control" placeholder="id" name="id" id="id"/>
               </div>
           <div class="mb-3">
            {/* <label for="question" class="form-label">Question Name</label> */}
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
                    <div class="input-group-text">
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
                <button type="submit" className="btn btn-secondary w-100 h-100 add-btn">Add Question</button>
                </div>
            </div>

           </form>

           <div className="mt-4">
           {
               allQuestions.map(question => 
                <div className="demo shadow-sm px-4 py-2 mt-2">
                <div className="question"><span>{(allQuestions.indexOf(question))+1}) </span> {question.question} <span className="text-secondary">Answer: {question.correct}</span>  <span className="btn btn-warning" onClick={() => {handleEdit(question._id)}}>Edit</span> <span className="btn btn-danger" onClick={() => handleDelete(question._id)}>Delete</span></div>
                <p> {question.a} <span style={{fontWeight: '700'}}>|</span> {question.b} <span style={{fontWeight: '700'}}>|</span> {question.c} <span style={{fontWeight: '700'}}>|</span> {question.d} </p>
            </div>
               )
           }
           </div>
    
        </div>
    );
};

export default Admin;