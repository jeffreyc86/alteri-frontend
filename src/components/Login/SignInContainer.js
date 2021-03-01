import React from "react"
import GoogleSignIn from "./GoogleSignIn"
import SignInForm from "./SignInForm"

function SignInContainer () {

    return (
        <div className="signin-container">

            <GoogleSignIn />
            <SignInForm />

        </div>
    )
}

export default SignInContainer