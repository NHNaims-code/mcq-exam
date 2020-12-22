import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { ResultContext } from '../../App';
import './Home.css';
import headerImg from '../../images/header.jpg'
import Header from '../Header/Header';
import Lottie from 'react-lottie';
import animationData from '../../lottie';
import Footer from '../Footer/Footer';


const Home = () => {
    const [examResult, setExamResult, questions, setQuestions, loggedInUser, setLoggedInUser] = useContext(ResultContext);
    const [allExams, setAllExams] = useState([]);
    useEffect(() => {
        setQuestions([]);
        retriveExamList();
    }, [])

         const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
        };

const history = useHistory();
    const retriveExamList = () => {
        fetch("https://livemcq.herokuapp.com/allexam")
        .then(response => response.json())
        .then(result => {
            setAllExams(result);
        })
    }

    const handleStartExam = (id) => {
        fetch("https://livemcq.herokuapp.com/findexam/" + id)
        .then(response => response.json())
        .then(result => {
            setQuestions(result);
        })
        history.push("/modelTest")
    }

    // const password = "kWofeQ17pHlFau2m"
    return (
        <div className=" container  home-root">
            <Header title={"Home"}></Header>
            {/* <div className="head-sec bg-danger">
                
            </div> */}
           <div>
           {
                allExams.map(modelTest => 
                <div className="model-test text-left d-flex justify-content-between align-items-center">
                    <p>{allExams.indexOf(modelTest) + 1})  {modelTest.name}</p>
                    <button onClick={() => handleStartExam(modelTest.name)} className="btn btn-secondary">Start Exam</button>
                </div>
                )
            }
           </div>
                       { allExams.length == 0 && <Lottie 
                            options={defaultOptions}
                            height={"auto"}
                            width={"auto"}
                        />
                        }
            <Footer></Footer>
        </div>
    );
};

export default Home;