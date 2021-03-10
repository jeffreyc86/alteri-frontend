import React from "react"
import GoogleSignIn from "./GoogleSignIn"
import SignInForm from "./SignInForm"

function SignInContainer () {

    return (
        <div className="signin-container">

            <GoogleSignIn />
            <div className="divider-line-x"><span>or</span></div>
            <SignInForm />

        </div>
    )
}

export default SignInContainer