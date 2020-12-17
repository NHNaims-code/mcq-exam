import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ResultContext } from '../../App';
import Header from '../Header/Header';
import './ModelTest.css';



const ModelTest = () => {
    const history = useHistory();
    // const [examResult, setExamResult] = useState({correct: 0, wrong: 0})
    const [examResult, setExamResult, questions, setQuestions, examInfo, setExamInfo] = useContext(ResultContext);
    const [examStatus, setExamStatus] = useState('running')


   




    const handleSelect = (question, answer) => {
        let correctAnswer = 0;
            questions.map(q => {
                if(q.id == question){
                    q.answer = answer;

                    if(q.CA == answer){
                        correctAnswer = correctAnswer + 1;
                    }
                }
            })
            setExamResult({correct: correctAnswer});
    
    }

    const handleExamSubmit = () => {
    
        history.push('/result')
    }
    return (
        <div className="container model-root mx-auto">
            <Header></Header>
            {
                
                questions.map(ques => 
                <div>
                    <div className=" question">MCQ {ques.id}: {ques.question}</div>
                    <div className=" w-100">
                        <div className="option">
                        <input onChange={() => {handleSelect(ques.id, ques.optA)}} value={ques.optA} className="m-3" type="radio" name={`${ques.id}`} id={`${ques.id}OptA`}/>
                        <label className="option" htmlFor={`${ques.id}OptA`}>{ques.optA}</label>
                        </div>
                        <div className="option">
                        <input onChange={() => {handleSelect(ques.id, ques.optB)}} value={ques.optB} className="m-3" type="radio" name={`${ques.id}`} id={`${ques.id}OptB`}/>
                        <label className="option" htmlFor={`${ques.id}OptB`}>{ques.optB}</label>
                        </div>
                        <div className="option">
                        <input onChange={() => {handleSelect(ques.id, ques.optC)}} value={ques.optC} className="m-3" type="radio" name={`${ques.id}`} id={`${ques.id}OptC`}/>
                        <label className="option" htmlFor={`${ques.id}OptC`}>{ques.optC}</label>
                        </div>
                        <div className="option">
                        <input onChange={() => {handleSelect(ques.id, ques.optD)}} value={ques.optD} className="m-3" type="radio" name={`${ques.id}`} id={`${ques.id}OptD`}/>
                        <label className="option" htmlFor={`${ques.id}OptD`}>{ques.optD}</label>
                        </div>
                    </div>
                </div>
                )
            }
            <div className="d-flex justify-content-center">
                <button onClick={handleExamSubmit} className="btn btn-warning px-5 my-5 ">Submit</button>
            </div>
            
        </div>
    );
};

export default ModelTest;