import { useHistory } from 'react-router-dom'
import React from 'react'
import { GoogleLogin } from 'react-google-login';

function GoogleSignUp () {

    const responseGoogle = (response) => {
        console.log(response)
        console.log(response.profileObj)
    }

    return (
        <div className="google-signup">
             <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                buttonText="Sign Up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleSignUp

