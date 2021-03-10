import React from 'react'
import {Link} from 'react-router-dom'
import GoogleSignUp from "./GoogleSignUp"
import SignUpForm from "./SignUpForm"

function SignUpContainer () {

    return (
        <div className="sign-up-container">
            <GoogleSignUp />
                <div class="divider-line-x"><span>or</span></div>
            <SignUpForm />
            <p>Already have an account? Sign in <Link to="/signin">here</Link></p>
        </div>
    )
}

export default SignUpContainer