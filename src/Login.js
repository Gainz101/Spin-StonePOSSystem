
import {useState} from 'react'
import './Login.css'; // Tell webpack that Login.js uses these styles
import SvgComponent from './assets/SvgComponent';

import { GoogleLogin } from '@react-oauth/google';

// import './assets/google-logo.svg';
// import './assets/hide-eye.svg';
// import './assets/show-eye.svg';
import './assets/btn_google_light_normal_ios.svg';
import myImage from './assets/image.png';
import maps from "./assets/google-maps.png"
import oauth from './oauth';
{/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}
 


// import './assets/btn_google_light_normal_ios.eps';
// import './assets/btn_google_light_normal_ios.jpeg';


/* Returns the URL parameters for this page

e.g.

*/
function getURLParams() {
    // source: https://www.sitepoint.com/get-url-parameters-with-javascript/
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams
}


export default function Login(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginState, setState] = useState(true);


    // Hack: skip login screen
    // For example, http://localhost:3000/?form=customer_view
    const urlParams = getURLParams()
    if(urlParams.get("form") !== null) {
        props.onFormSwitch(urlParams.get("form"))
    }
    



    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(username);
    }

   
   

      function LoginFail(){
        return(
            <p class="loginFailedText">
                This username and password combo is invalid. Please try again.
            </p>
        );
      }
      
      function navigateTo(url) {
        window.location.href = url;
        
      }



    return(
        <div id="background">
            <div class="box">

                {/* **** Login bypass *****/}
                <img src={myImage} alt="My image" />
                
                

                {/***** End login bypass **** */}

                <form onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <div class="smallGreyText">Welcome to Spin and Stone. Please Sign in.</div>

                    <div class="input-field">
                        <input type="text" id="username" placeholder=" " onChange={e => setUsername(e.target.value)}></input>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div class="input-field">
                        <input type = "text" id= "password" placeholder=" " onChange={e => setPassword(e.target.value)}></input>
                        <label htmlFor="password">Password</label>
                    </div>


                    {(username === "yeezy"  & password === "yeezy77") ? (
                        <button onClick={() => props.onFormSwitch("customer_view")} type="submit" class="signin">Sign in</button>
                    ) :(username === "cash"  & password === "cash123") ? (
                        <button onClick={() => props.onFormSwitch("cashier_view")} type="submit" class="signin">Sign in</button>
                    ) : (username === "man" & password === "man000") ? (
                        <button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="signin">Sign in</button>
                    ) :
                    (
                        <div>
                            <button onClick={e => setState(false)} type="submit" class="signinFalse">Sign in</button>
                            {(loginState===true) ? null : <LoginFail/>}
                        </div>
                    )}                
                    {/* <div class="smallGreyText">If you forgot your password press "Forgot Password"</div> */}

                            

                    <span>or</span>
                    <button class="google-signin">
                        <div><SvgComponent /></div>{oauth()}
                        
                        {/* <div class="centerr">Log in with Google</div> */}
                    </button>           
                    <p class="smallGreyText">
                        Don't have an account?
                        <a onClick={() => props.onFormSwitch("signup")}> Sign up here</a>
                        <br></br>Consumer Info: (yeezy, yeezy77),(cash, cash123),(man, man000)<br></br>
                        {/* user: yeezy, pass: yezzy77; 
                        user: cash, pass:cash123; 
                        user: man, pass:man000; */}
                        Google maps icons created by Freepik - Flaticon
                    </p> 
                    <button class="google-signin" onClick={() => props.onFormSwitch("map_view")}><img class="mapsPic" src={maps}></img>Google Maps</button>
                </form>
            </div>
            {/* <footer class="footer">
                <a href="https://www.flaticon.com/free-icons/google-maps" title="google maps icons">Google maps icons created by Freepik - Flaticon</a>
            </footer> */}
        </div>
    );
                }
            