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

const AdminContent = () => {

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
            fetch('https://livemcq.herokuapp.com/allquestions')
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
           <div className="mt-4">
           {
               allQuestions.map(question => 
                <div className="d-flex alig-items-center row shadow-sm px-4 py-2 mt-2" key={question._id}>
                    <div className="col-md-10">
                        <div className="question"><span>{(allQuestions.indexOf(question))+1}) </span> {question.question} <span className="text-secondary">Answer: {question.correct}</span>  </div>
                        <p> {question.a} <span style={{fontWeight: '700'}}>|</span> {question.b} <span style={{fontWeight: '700'}}>|</span> {question.c} <span style={{fontWeight: '700'}}>|</span> {question.d} </p>
                    </div>
                    <div className="col-md-2 d-flex flex-column justify-content-center">
                    <button className="btn btn-warning btn-sm px-4 w-100 py-2" onClick={() => {handleEdit(question._id)}}>Edit</button>
                     <button className="btn btn-danger px-4 btn-sm py-2 w-100 mt-2" onClick={() => handleDelete(question._id)}>Delete</button>
                    </div>
                </div>
               )
           }
           </div>
    
        </div>
    );
};

export default AdminContent;