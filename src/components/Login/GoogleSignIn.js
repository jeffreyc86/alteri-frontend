import React from 'react'
import {useHistory} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/userSlice"
import { toastr } from "react-redux-toastr";


function GoogleSignIn (){

    const history = useHistory()
    const dispatch = useDispatch()

    const toastrOptions = {
      icon: "warning",
      status: "warning",
      removeOnHoverTimeOut: 2000,
    };

    const failedResponse = () => {

        toastr.light(
          "There was an issue signing in through Google",
          "Please try again",
          toastrOptions
        );
    }

    const responseGoogle = (res) => {
        const google_id = {google_id: res.profileObj.googleId}

        fetch(`${process.env.REACT_APP_RAILS_URL}googlelogin`, {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(google_id)
        })
            .then(res=>res.json())
            .then(data => {
                if (data.errors) {
                    data.errors.forEach(error=>toastr.light(error, toastrOptions))
                    history.push("/signup")
                }
                else {
                    const { user, token } = data;
                    const action = setCurrentUser(user);
                    dispatch(action)
                    localStorage.setItem("token", token);
                    history.push("/profile");
                }
            })
    }


    return (
        <div className="google-signin">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                buttonText="Sign In with Google"
                onSuccess={responseGoogle}
                onFailure={failedResponse}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleSignIn