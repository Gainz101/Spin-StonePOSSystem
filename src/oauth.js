import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css'; // Tell webpack that Login.js uses these styles


function oauth() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
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