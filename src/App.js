import React, { createContext, useState } from "react";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Admin from "./components/Admin/Admin";
import Home from './components/Home/Home';
import ModelTest from './components/ModelTest/ModelTest';
import Result from "./components/Result/Result";

export const ResultContext = createContext();
function App() {
  const [examResult, setExamResult] = useState({correct: 0, wrong: 0})
  const [examInfo, setExamInfo] = useState();
  const [questions, setQuestions] = useState([
    {
        id: 1,
        question: 'Which is logical operator?',
        optA: '+',
        optB: '>=',
        optC: 'AND',
        optD: '<<',
        CA: '>=',
        Explain: 'This is you explain'
    },
    {
        id: 2,
        question: 'Which language is used to build website?',
        optA: 'Python',
        optB: 'HTML',
        optC: 'COBOL',
        optD: 'FORTRAN',
        CA: 'HTML',
        Explain: 'This is you explain'
    },
    {
        id: 3,
        question: 'What is hotspot ?',
        optA: 'special security system',
        optB: 'cable connected Internet system',
        optC: 'Wireless Internet system',
        optD: 'special kind of software',
        CA: 'Wireless Internet system',
        Explain: 'This is you explain'
    },
    {
        id: 4,
        question: 'How many numerical bit of ASCII-8 code?',
        optA: '2',
        optB: '4',
        optC: '8',
        optD: '16',
        CA: '4',
        Explain: 'This is you explain'
    },
    {
        id: 5,
        question: 'What is hierarchical structure of websites?',
        optA: 'Home page dependent websites',
        optB: 'link up with each page',
        optC: 'web based communications',
        optD: 'link up between two pages.',
        CA: 'link up with each page',
        Explain: 'This is you explain'
    },
    {
        id: 6,
        question: 'How many bits in Unicode?',
        optA: '4',
        optB: '8',
        optC: '16',
        optD: '32',
        CA: '16',
        Explain: 'This is you explain'
    },
    {
        id: 7,
        question: 'Which is the uses of Robot?',
        optA: 'Complex Surgery Treatment',
        optB: 'Verifying the signature of a person',
        optC: 'To produce new varieties of seeds',
        optD: 'To make the design of Tennis ball',
        CA: 'Complex Surgery Treatment',
        Explain: 'This is you explain'
    },
    {
        id: 8,
        question: 'In computer networking system, Placement of the computer in different rooms of the same building  is called',
        optA: 'PAN',
        optB: 'LAN',
        optC: 'MAN',
        optD: 'WAN',
        CA: 'LAN',
        Explain: 'This is you explain'
    },
]);

  return (
   
      <ResultContext.Provider value={[examResult, setExamResult, questions, setQuestions, examInfo, setExamInfo]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/modelTest">
            <ModelTest></ModelTest>
          </Route>
          <Route path="/result">
            <Result></Result>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
        </Switch>
      </Router>

    </ResultContext.Provider>

  );
}

export default App;
