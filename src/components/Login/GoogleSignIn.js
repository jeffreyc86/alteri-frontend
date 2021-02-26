import React, { cloneElement } from 'react'
import {useHistory} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';


function GoogleSignIn (){

    const responseGoogle = (response) => {
        console.log(response)
        console.log(response.profileObj)
    }


    return (
        <div className="google-login">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                buttonText="Sign In with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleSignIn