import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css'; // Tell webpack that Login.js uses these styles

/**
 * 
 * @returns It outputs the response from OAuth API and will sign you in
 */
function oauth() {
    //Logs success or failure of oauth
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    // Runs oauth from google api and returns success or failure message
    return (
        <div class="googleAuthButton">
            <div >
            {/* <button class="google-signin">
                <div><SvgComponent /></div>
                
                <div class="centerr">Log in with Google</div>
            </button>     */}
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
        </div>
    )
}
export default oauth;