import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/userSlice"

function SignUpForm () {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])

    const history = useHistory()

    const dispatch = useDispatch()

    
    function handleSubmit(e){
        e.preventDefault()

        if (password !== confirmedPassword) {
            alert("Passwords do not match. Please enter and re-enter a password")
            setPassword("")
            setConfirmedPassword("")
        } else {

            const form = new FormData()
                form.append("email", email)
                form.append("password", password)
                form.append("first_name", firstName.toLowerCase())
                form.append("last_name", lastName.toLowerCase())
            
            if (image) {
                form.append("image", image)
            } 

            fetch(`${process.env.REACT_APP_RAILS_URL}signup`, {
                method: 'POST',
                body: form
            })
                .then(res=>res.json())
                .then(data => {
                   if (data.errors) {
                       setErrors(data.errors)
                       setPassword("")
                       setConfirmedPassword("")
                   } else {
                       const {user, token} = data
                       const action = setCurrentUser(user);
                       dispatch(action)
                       localStorage.setItem("token", token)
                       history.push("/profile")
                   }
                })
        }
    }


    return (
        <div className="sign-up-form-div">
            {errors.map((error, index)=>{
                return <p key={index} className="errors">{error}</p>
            })}
            <form className="signup-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="password">Re-Enter Password</label>
                    <input 
                        type="password" 
                        value={confirmedPassword} 
                        onChange={(e) => setConfirmedPassword(e.target.value)} 
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="first name">First Name</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="last name">Last Name</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="profile photo">Profile Photo</label>
                    <br/>
                    <input 
                        type="file" 
                        name="image" 
                        onChange={(e)=>setImage(e.target.files[0])} 
                        accept="image/*" 
                    />
                </div>
                <br/>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default SignUpForm