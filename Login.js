import {useState} from 'react'
import './Login.css'; // Tell webpack that Login.js uses these styles
import SvgComponent from './assets/SvgComponent';

// import './assets/google-logo.svg';
// import './assets/hide-eye.svg';
// import './assets/show-eye.svg';
import './assets/btn_google_light_normal_ios.svg';
// import './assets/btn_google_light_normal_ios.eps';
// import './assets/btn_google_light_normal_ios.jpeg';


export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function textInputUser(){
        setUsername();
    }
    function textInputPass(){
        setPassword();
    }
    
    return(
        <div id="background">
        <div class="box">
            
            <form>
                <h1>Log In</h1>
                <div class="smallGreyText">Welcome to Spin and Stone. Please Sign in.</div>

                <div class="input-field">
                    <input onClick={textInputUser} type="text" id="username" placeholder=" " onChange={e => setUserName(e.target.value)}></input>
                    <label for="username">Username</label>
                </div>
                <div class="input-field">
                    <input onClick={textInputPass} type = "text" id= "password" placeholder=" " onChange={e => setPassword(e.target.value)}></input>
                    <label for="password">Password</label>
                </div>

                <button class="signin">Sign in</button>
                {/* <div class="smallGreyText">If you forgot your password press "Forgot Password"</div> */}


                <span>or</span>
                <button class="google-signin">
                    <div><SvgComponent /></div>
                    <div class="centerr">Log in with Google</div>
                </button>           
                <p class="smallGreyText">
                    Don't have an account?
                    <a> Sign up here</a>
                </p> 
            </form>
        </div>
        </div>
    );
}