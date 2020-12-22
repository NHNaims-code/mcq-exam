import React, { useContext, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Link } from 'react-router-dom';
import { ResultContext } from '../../App';
import Header from '../Header/Header';
import Lottie from 'react-lottie';
import animationData from '../../lottie';
import './Result.css';
import Footer from '../Footer/Footer';

const Result = () => {
    const [examResult, setExamResult, questions, setQuestions, loggedInUser, setLoggedInUser] = useContext(ResultContext);
    console.log(questions);

    const correctAnswer = [];
    const container = useRef(null);

      const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    useEffect(()=> {
            let correctResult = 0;
            let wrongResult = 0;
            for(let i = 0; i< questions.length; i++) {
                if(questions[i].correct === questions[i].select){
                    correctResult = correctResult + 1;
                }else{
                    wrongResult = wrongResult + 1;
                }
            }

            setExamResult({correct: correctResult, wrong: wrongResult})
}, [])


    return (
        <div className="result-root mx-auto">
            <Header title="Result"></Header>
            <div className="row d-flex m-0 p-0">
            <div className="col-md-6 alert alert-success">Right : {examResult.correct}</div>
            <div className="col-md-6 alert alert-danger">Wrong : {examResult.wrong}</div>
            </div>
            <div className="px-0">
            {
                questions.map(qs => <div className="text-center rounded mb-5 ">
                    <h6 className="px-4 py-2 text-primary">MCQ {questions.indexOf(qs) + 1}: {qs.question}</h6>
                   <div className="text-left">
                       {
                           qs.correct === qs.a && qs.a === qs.select  && <p className="bg-success px-4 py-2">a) {qs.a}</p>
                        }
                        {
                           qs.correct === qs.a && qs.a !== qs.select  && <div className="d-flex justify-content-between align-items-center border border-warning px-4 py-2"><p className="m-0">d) {qs.a}</p> <i class="fa fa-check" aria-hidden="true"></i></div>
                        }
                        {
                           qs.correct !== qs.a && qs.a === qs.select  && <div className="d-flex justify-content-between align-items-center border border-danger px-4 py-2"><p className="m-0">d) {qs.a}</p> <i class="fa fa-times" aria-hidden="true"></i></div>
                       }
                        {
                           qs.correct !== qs.a && qs.a !== qs.select  && <p className=" px-4 py-2">a) {qs.a}</p>
                       }
                 
                       {
                           qs.correct === qs.b && qs.b === qs.select  && <p className="bg-success px-4 py-2">b) {qs.b}</p>
                        }
                        {
                           qs.correct === qs.b && qs.b !== qs.select  && <div className="d-flex justify-content-between align-items-center border border-warning px-4 py-2"><p className="m-0">d) {qs.b}</p> <i class="fa fa-check" aria-hidden="true"></i></div>
                        }
                        {  
                           qs.correct !== qs.b && qs.b === qs.select  && <div className="d-flex justify-content-between align-items-center border border-danger px-4 py-2"><p className="m-0">d) {qs.b}</p> <i class="fa fa-times" aria-hidden="true"></i></div>
                       }
                        {  
                           qs.correct !== qs.b && qs.b !== qs.select  && <p className=" px-4 py-2">b) {qs.b}</p>
                       }

                       {
                           qs.correct === qs.c && qs.c === qs.select  && <p className="bg-success px-4 py-2">c) {qs.c}</p>
                        }
                        {   
                           qs.correct === qs.c && qs.c !== qs.select  && <div className="d-flex justify-content-between align-items-center border border-warning px-4 py-2"><p className="m-0">d) {qs.c}</p> <i class="fa fa-check" aria-hidden="true"></i></div>
                        }
                        {
                           qs.correct !== qs.c && qs.c === qs.select  && <div className="d-flex justify-content-between align-items-center border border-danger px-4 py-2"><p className="m-0">d) {qs.c}</p> <i class="fa fa-times" aria-hidden="true"></i></div>
                       }
                        {
                           qs.correct !== qs.c && qs.c !== qs.select  && <p className=" px-4 py-2">c) {qs.c}</p>
                       }

                        {
                    qs.correct === qs.d && qs.d === qs.select  && <p className="bg-success px-4 py-2">d) {qs.d}</p>
                        }
                        {
                    qs.correct === qs.d && qs.d !== qs.select  && <div className="d-flex justify-content-between align-items-center border border-warning px-4 py-2"><p className="m-0">d) {qs.d}</p> <i class="fa fa-check" aria-hidden="true"></i></div>
                        }
                        {
                    qs.correct !== qs.d && qs.d === qs.select  && <div className="d-flex justify-content-between align-items-center border border-danger px-4 py-2"><p className="m-0">d) {qs.d}</p> <i class="fa fa-times" aria-hidden="true"></i></div>
                       }
                        {
                    qs.correct !== qs.d && qs.d !== qs.select  && <p className=" px-4 py-2">d) {qs.d}</p>
                       }
                   </div>
                    
                    
                </div>)

            
            
            }

             {questions.length === 0 && <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
            />
            }

            </div>
            <Link to="/">
            <button className="btn btn-primary text-center w-100 py-3">Home</button>
            </Link>
            <Footer></Footer>
        </div>
    );
};

export default Result;