import {useState} from "react"
import './Login.css'; // Tell webpack that Login.js uses these styles



export const SignUp = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const accounts = new Map()
    accounts.set("yeezy","yeezy");

    function handlerAccount(){
        accounts.set(username,password);
    }



    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(username);
    }
    return (
        <div id="background">
        <div class="box">
            
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div class="smallGreyText">Enter Your Information and Sign Up!</div>
                <div class="input-field">
                    <input type="text" id="name" placeholder=" " onChange={e => setName(e.target.value)}></input>
                    <label htmlFor="name">Full Name</label>
                </div>
                <div class="input-field">
                    <input type="text" id="username" placeholder=" " onChange={e => setUsername(e.target.value)}></input>
                    <label htmlFor="username">Username</label>
                </div>
                <div class="input-field">
                    <input type = "text" id= "password" placeholder=" " onChange={e => setPassword(e.target.value)}></input>
                    <label htmlFor="password">Password</label>
                </div>
        
                <button onClick={handlerAccount()} type="submit" class="signin">Sign Up</button>
                {/* <div class="smallGreyText">If you forgot your password press "Forgot Password"</div> */}


                          
                <p class="smallGreyText">
                    Already have an account?
                    <a onClick={() => props.onFormSwitch("login")}> Sign in here</a>
                </p>  
            </form>
        </div>
        </div>
    );
}