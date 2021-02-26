import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/userSlice"

function SignInForm () {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_RAILS_URL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.errors) {
              setErrors(data.errors);
              setFormData({
                email: "",
                password: "",
              })
            } else {
              const { user, token } = data;
              const action = setCurrentUser(user);
              dispatch(action)
              localStorage.setItem("token", token);
              history.push("/profile");
            }
          });
      }

    return (
        <div className="login-form-div">
            {errors.map((error, index)=>{
                return <p key={index} className="errors">{error}</p>
            })}
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>
                <br/>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default SignInForm