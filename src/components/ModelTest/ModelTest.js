import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ResultContext } from '../../App';
import Header from '../Header/Header';
import Lottie from 'react-lottie';
import animationData from '../../lottie';
import './ModelTest.css';
import Footer from '../Footer/Footer';



const ModelTest = () => {
    const history = useHistory();
    // const [examResult, setExamResult] = useState({correct: 0, wrong: 0})
    const [examResult, setExamResult, questions, setQuestions, loggedInUser, setLoggedInUser] = useContext(ResultContext);
    const [examStatus, setExamStatus] = useState('running')


   
         const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
        };




    const handleSelect = (question, answer) => {

        // Document.getElementsByClassName("")
        const tempObj = questions[question];
        tempObj.select = answer;
        console.log(questions[question]);
        // let correctAnswer = 0;
        //     questions.map(q => {
        //         if(q.id == question){
        //             q.answer = answer;

        //             if(q.CA == answer){
        //                 correctAnswer = correctAnswer + 1;
        //             }
        //         }
        //     })
        //     setExamResult({correct: correctAnswer});
    
    }

    const handleExamSubmit = () => {
    
        history.push('/result')
    }
    return (
        <div className=" container model-root mx-auto">
            <Header title="Exam"></Header>
            {
                
                questions.map(ques => 
                <div>
                    <div className=" question">MCQ {questions.indexOf(ques) + 1}: {ques.question}</div>
                    <div className=" w-100">
                        <div className="option">
                        <input onChange={() => {handleSelect(questions.indexOf(ques), ques.a)}} value={ques.a} className="m-3" type="radio" name={questions.indexOf(ques)} id={ques._id + "a"}/>
                        <label className="option" htmlFor={ques._id + "a"}>{ques.a}</label>
                        </div>
                        <div className="option disable">
                        <input onChange={() => {handleSelect(questions.indexOf(ques), ques.b)}} value={ques.b} className="m-3" type="radio" name={questions.indexOf(ques)} id={ques._id + "b"}/>
                        <label className="option" htmlFor={ques._id + "b"}>{ques.b}</label>
                        </div>
                        <div className="option">
                        <input onChange={() => {handleSelect(questions.indexOf(ques), ques.c)}} value={ques.c} className="m-3" type="radio" name={questions.indexOf(ques)} id={ques._id + "c"}/>
                        <label className="option" htmlFor={ques._id + "c"}>{ques.c}</label>
                        </div>
                        <div className="option">
                        <input onChange={() => {handleSelect(questions.indexOf(ques), ques.d)}} value={ques.d} className="m-3" type="radio" name={questions.indexOf(ques)} id={ques._id + "d"}/>
                        <label className="option" htmlFor={ques._id + "d"}>{ques.d}</label>
                        </div>
                    </div>
                </div>
                )
            }
            {questions == 0 && <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
            />
            }
            <div className="d-flex justify-content-center">
                <button onClick={handleExamSubmit} className="btn btn-warning px-5 my-5 ">Submit</button>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ModelTest;