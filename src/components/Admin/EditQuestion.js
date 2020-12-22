import React from 'react';
import './EditQuestion.css';

const EditQuestion = ({data, setOpen, allquestions}) => {

    // document.getElementById('questionEdit').value = data.question;
    // document.getElementById('aEdit').value = data.a;
    // document.getElementById('bEdit').value = data.b;



    const handleUpdate = () => {

        const question = document.getElementById('questionEdit').value;
        const a = document.getElementById('aEdit').value
        const b = document.getElementById('bEdit').value
        const c = document.getElementById('cEdit').value
        const d = document.getElementById('dEdit').value

        const updateQuestion = {question, a, b, c, d}

        console.log(updateQuestion);

        fetch('https://livemcq.herokuapp.com/update/' + data._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateQuestion)
        })
        .then(response => {
            if(response){
                allquestions();
                setOpen(false);
                alert('Update successful');
            }
        })

        
    }

    return (
        <div className="edit-root">
            <input type="text" name="question" id="" className="form-control mb-3"/>
            <input type="text" defaultValue={data.question} name="question" id="questionEdit" className="form-control mb-3"/>
            <div className="row">
                <div className="col-md-6">

                <div class="input-group">
                    <div class="input-group-text">
                        <input required class="form-check-input" checked={data.correct === data.a && true}  id="radioAEdit" type="radio" name="correct" defaultValue="a" aria-label="Radio button for following text input"></input>
                    </div>
                    <input required autoComplete="off" defaultValue={data.a}  name="a" id="aEdit" placeholder="Enter option A" type="text" className="form-control" aria-label="Text input with radio button"></input>
                </div>
                <div class="input-group  mt-2">
                    <div class="input-group-text">
                        <input required class="form-check-input" checked={data.correct === data.b && true}  type="radio"  id="radioBEdit" name="correct" defaultValue="b" aria-label="Radio button for following text input"></input>
                    </div>
                    <input required autoComplete="off" defaultValue={data.b}  name="b" id="bEdit" placeholder="Enter option B" type="text" className="form-control" aria-label="Text input with radio button"></input>
                </div>
                <div class="input-group mt-2">
                    <div class="input-group-text">
                        <input required class="form-check-input" checked={data.correct === data.c && true} type="radio"  id="radioCEdit" name="correct" defaultValue="c"  aria-label="Radio button for following text input"></input>
                    </div>
                    <input required autoComplete="off" defaultValue={data.c}  name="c" id="cEdit" placeholder="Enter option C" type="text" className="form-control " aria-label="Text input with radio button"></input>
                </div>
                <div class="input-group mt-2">
                    <div class="input-group-text">
                        <input required class="form-check-input" checked={data.correct === data.d && true} type="radio"  id="radioDEdit" name="correct" defaultValue="d" aria-label="Radio button for following text input"></input>
                    </div>
                    <input required autoComplete="off" defaultValue={data.d}  name="d" id="dEdit"placeholder="Enter option D" type="text" className="form-control" aria-label="Text input with radio button"></input>
                </div>
                </div>
                <div className="col-md-6">
                    <textarea className="form-control h-100"></textarea>
                </div>
            </div>
            <div className="row">
                <button className="btn btn-secondary col-md-6 py-3 mt-4" onClick={() => setOpen(false)}>Cancel</button>
                <button className="btn btn-warning col-md-6 py-3 mt-4" onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
};

export default EditQuestion;