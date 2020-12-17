import React from 'react';
import './Home.css'
import headerImg from '../../images/header.jpg'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';


const Home = () => {
    const modelTestList = [
        'Model Test 1',
        'Model Test 2',
        'Model Test 3',
        'Model Test 4',
        'Model Test 5',
    ]
    const password = "kWofeQ17pHlFau2m"
    return (
        <div className=" container  home-root">
            <Header></Header>
            {/* <div className="head-sec bg-danger">
                
            </div> */}
           <div>
           {
                modelTestList.map(modelTest => <div className="model-test text-left d-flex justify-content-between"><p>{modelTest}</p><Link to="/modelTest"><button className="btn ">Start Exam</button></Link></div>)
            }
           </div>
        </div>
    );
};

export default Home;