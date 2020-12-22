import React, { useContext } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../login';
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../config/firebase.config';
import { ResultContext } from '../../App';
import { useHistory } from 'react-router-dom';
import "./Login.css";

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
    // console.log(firebase.apps.length);
}


const Login = () => {
    const [examResult, setExamResult, questions, setQuestions, loggedInUser, setLoggedInUser] = useContext(ResultContext);
    const history = useHistory();

    const provider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            const newUser = {name: user.displayName, email: user.email, image: user.photoURL};
            setLoggedInUser(newUser);
            if(newUser.email){
                window.sessionStorage.setItem("user", JSON.stringify(newUser));
                history.push("/")

            }
            console.log(user);

            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
            }
        };

    return (
        <div className="login-root h-100 bg-white ">
            {/* <h1>welcome to login</h1> */}
            <div className="row d-flex align-items-center">
                <div className="col-md-5">
                <Lottie 
                options={defaultOptions}
                height={"auto"}
                width={"auto"}
            />
                </div>
                <div className="col-md-7 ">
                    <div className="login-form mx-auto">
                    <form className="" action="">
                        <h4 className="registration-headline text-center">Registration</h4>
                        <input className="form-control mt-3" type="text" name="" id="" placeholder="Name" required/>
                        <input className="form-control mt-3" type="email" name="" id="" placeholder="Email" required/>
                        <input className="form-control mt-3" type="password" name="" id="" placeholder="Password" required/>
                        <button className="px-4 py-2 btn btn-secondary mt-3">Sign Up</button>
                    </form>
                    <div className="d-flex  row mx-0 mt-5">
                        <button className="btn btn-primary px-4 py-2 col-md-6 mb-3">Sing in with Facebook</button>
                        <button onClick={handleGoogleSignIn} className="btn btn-danger px-4 py-2 col-md-6 mb-3">Sing in with Google</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;