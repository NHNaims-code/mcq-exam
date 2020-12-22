import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ResultContext } from '../../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [examResult, setExamResult, questions, setQuestions, loggedInUser, setLoggedInUser] = useContext(ResultContext);
    console.log(loggedInUser);
    return (
        <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;