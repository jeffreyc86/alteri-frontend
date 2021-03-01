import { useHistory } from 'react-router-dom'
import React, {useState} from 'react'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/userSlice"

function GoogleSignUp () {


    const history = useHistory()
    const dispatch = useDispatch()

    const failedResponse = (res) => {
        alert("There was an issue signing up through Google. Please try again.")
    }

    const responseGoogle = (res) => {
        const newUser = {
            email: res.profileObj.email,
            password: `${process.env.REACT_APP_GOOGLE_OAUTH_PASSWORD}`,
            first_name: res.profileObj.givenName,
            last_name: res.profileObj.familyName,
            photo_url: res.profileObj.imageUrl,
            google_id: res.profileObj.googleId
        }

        fetch(`${process.env.REACT_APP_RAILS_URL}signup`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        })
            .then(res=>res.json())
            .then(data => {
               if (data.errors) {
                   data.errors.forEach(error=>{alert(error + ". Please try again.")})
               } else {
                   const {user, token} = data
                   const action = setCurrentUser(user);
                   dispatch(action)
                   localStorage.setItem("token", token)
                   history.push("/profile")
               }
            })

    }

    return (
        <div className="google-signup">
             <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                buttonText="Sign Up with Google"
                onSuccess={responseGoogle}
                onFailure={failedResponse}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleSignUp

