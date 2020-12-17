import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ResultContext } from '../../App';
import Header from '../Header/Header';
import './Result.css';

const Result = () => {
    const [examResult, setExamResult, questions, setQuestions, examInfo, setExamInfo] = useContext(ResultContext);
    console.log(questions);

    const correctAnswer = [];

    for(let i = 0; i< questions.length; i++) {
        if(questions[i].CA === questions[i].answer){
            correctAnswer.push(questions[i].answer)
        }
        
    }

    return (
        <div className="result-root mx-auto">
            <Header></Header>
            <div className="row d-flex m-0 p-0">
            <div className="col-md-6 alert alert-success">Right : {correctAnswer.length}</div>
            <div className="col-md-6 alert alert-danger">Wrong : {examResult.wrong}</div>
            </div>
            <div className="px-0">
            {
                questions.map(qs => <div className="text-center rounded mb-5 ">
                    <h6 className="px-4 py-2">MCQ {qs.id}: {qs.question}</h6>
                   <div className="text-left">
                       {
                           qs.CA === qs.optA ? <p className="bg-success px-4 py-2">a) {qs.optA}</p> : <div> {qs.answer === qs.optA ? <p className="bg-danger px-4 py-2">a) {qs.optA}</p> : <p className="px-4 py-2">a) {qs.optA}</p>}</div>
                       }
                       {
                           qs.CA === qs.optB ? <p className="bg-success px-4 py-2">b) {qs.optB}</p> : <div> {qs.answer === qs.optB ? <p className="bg-danger px-4 py-2">b) {qs.optB}</p> : <p className="px-4 py-2">b) {qs.optB}</p>}</div>
                       }
                       {
                           qs.CA === qs.optC ? <p className="bg-success px-4 py-2">c) {qs.optC}</p> : <div> {qs.answer === qs.optC ? <p className="bg-danger px-4 py-2">c) {qs.optC}</p> : <p className="px-4 py-2">c) {qs.optC}</p>}</div>
                       }
                       {
                           qs.CA === qs.optD ? <p className="bg-success px-4 py-2">d) {qs.optD}</p> : <div> {qs.answer === qs.optD ? <p className="bg-danger px-4 py-2">d) {qs.optD}</p> : <p className="px-4 py-2">d) {qs.optD}</p>}</div>
                       }
                   </div>
                    
                    
                </div>)
            }
            </div>
            <Link to="/">
            <button className="btn btn-primary text-center w-100 py-3">Home</button>
            </Link>
        </div>
    );
};

export default Result;