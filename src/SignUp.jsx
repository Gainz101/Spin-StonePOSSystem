import {useState} from "react"
import './Login.css'; // Tell webpack that Login.js uses these styles



export const SignUp = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(username);
    }
    return (
        <div id="background">
        <div class="box">
            
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div class="smallGreyText">Sign up Here.</div>
                <div class="input-field">
                    <input type="text" id="name" placeholder=" " onChange={e => setName(e.target.value)}></input>
                    <label htmlFor="name">Full Name</label>
                </div>
                <div class="input-field">
                    <input type="text" id="username" placeholder=" " onChange={e => setUserName(e.target.value)}></input>
                    <label htmlFor="username">Username</label>
                </div>
                <div class="input-field">
                    <input type = "text" id= "password" placeholder=" " onChange={e => setPassword(e.target.value)}></input>
                    <label htmlFor="password">Password</label>
                </div>

                <button onClick={() => props.onFormSwitch("consumer_view")} type="submit" class="signin">Sign Up</button>
                {/* <div class="smallGreyText">If you forgot your password press "Forgot Password"</div> */}


                          
                <p class="smallGreyText">
                    Don't have an account?
                    <a onClick={() => props.onFormSwitch("login")}> Sign up here</a>
                </p>  
            </form>
        </div>
        </div>
    );
}