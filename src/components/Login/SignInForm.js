import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/userSlice"

function SignInForm () {

    const dispatch = useDispatch()

    const [demoClicked, setDemoClicked] = useState(false)
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

      function demoSignIn() {
        setDemoClicked(true)
        fetch(`${process.env.REACT_APP_RAILS_URL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: 'homelessguy2@email.com', password: 'test1234'}),
        })
          .then((r) => r.json())
          .then((data) => {
              const { user, token } = data;
              const action = setCurrentUser(user);
              dispatch(action);
              localStorage.setItem("token", token);
              history.push("/profile");
          });
      }

    return (
      <div className="signin-form-div">
        {errors.map((error, index) => {
          return (
            <p key={index} className="errors">
              {error}
            </p>
          );
        })}
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-input-div">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="signin-input-div">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <button type="submit">Sign In</button>
        </form>
        <div className="demo-signin" onClick={demoSignIn}>
          Demo Sign In
          {demoClicked && (
            <>
              <br />
              <span className="demo-message">
                It may take a few seconds for the back end to fire up
              </span>
            </>
          )}
        </div>
      </div>
    );
}

export default SignInForm