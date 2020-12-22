import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import NotFound from "./components/404/NotFound";
import Admin from "./components/Admin/Admin";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import Home from './components/Home/Home';
import ModelTest from './components/ModelTest/ModelTest';
import Result from "./components/Result/Result";

export const ResultContext = createContext();
function App() {
  const [examResult, setExamResult] = useState({correct: 0, wrong: 0})
  const [loggedInUser, setLoggedInUser] = useState({});
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    // setLoggedInUser(JSON.parse(sessionStorage.user));
  }, [])
  return (
   
      <ResultContext.Provider value={[examResult, setExamResult, questions, setQuestions, loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <PrivateRoute path="/modelTest">
            <ModelTest></ModelTest>
            {/* <Login></Login> */}
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/result">
            <Result></Result>
          </Route>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

    </ResultContext.Provider>

  );
}

export default App;
