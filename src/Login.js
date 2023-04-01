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
                    <input onClick={textInputUser} type="text" id="username" placeholder=" "></input>
                    <label for="username">Username</label>
                </div>
                <div class="input-field">
                    <input onClick={textInputPass} type = "text" id= "password" placeholder=" "></input>
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

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Login Form</title>
//     <link rel="stylesheet" href="style.css">
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap" rel="stylesheet">
// </head>
// <body>
//     <section class="portal">
//         <form action="#">
//             <div class="title">
//                 <h1>LOG IN</h1>
//                 <p>Welcome back! Please enter your details.</p>
//             </div>
//             <button id="google-signin">
//                 <img src="assets/google-logo.svg" alt="">
//                 Log in with Google
//             </button>
//             <span>or</span>
//             <div class="input-field">
//                 <input type="text" id="username" placeholder=" ">
//                 <label for="username">Username</label>
//             </div>
//             <div class="input-field">
//                 <input type="password" id="password" placeholder=" ">
//                 <label for="password">Password</label>
//                 <img id="show-hide-pass" src="assets/show-eye.svg" alt="">
//             </div>
//             <a href="#" id="forgot-pass">Forgot Password</a>
//             <button id="signin">Sign in</button>
//             <p id="signup">
//                 Don't have an account?
//                 <a href="#">Sign up here</a>
//             </p>
//         </form>
//     </section>
// </body>
// </html>