import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.scss'
import { useDispatch } from 'react-redux'
import { logIn, setUserEmail } from "../../Redux/userReducer";
import { resetCart } from "../../Redux/cartReducer";
import setAuthorization from "../../UtilityFunctions/setAuthorization";

function Login() {
    const dispatch = useDispatch()
    // state variables for email and passwords
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);
    // state variable for error messages
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // handle change events for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);  
    };

    const handleRegisterClick = () => {
        navigate("/register");
    }
    async function userLogin(loginurl) {
        const response = await fetch(loginurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })

        if (response.ok) {
                
            dispatch(logIn());
            dispatch(setUserEmail({ userEmail: email }));
            dispatch(resetCart());
            setError(<h3 style={{ color: "green" }}>Successful Login</h3>);  
            window.location.href = '/'; //refresh page to update constants
        }
        else {
            setError(<h3 style={{ color: "red" }}>Error Logging in.</h3>);
        }
        const data = await response.json()
        const token = data.accessToken
        setAuthorization(token)
    }
    // handle submit event for the form
    const handleSubmit = (e) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password) {
            setError(<h3 style={{ color: "red" }}>Please fill in all fields.</h3>);
        } else {
            // clear error message
            setError("");
            // post data to the /register api

            var loginurl = "http://localhost:8080/login";
            /*if (rememberme == true)
                loginurl = "/login?useCookies=true";
            else
                loginurl = "/login";*/

            userLogin(loginurl)
        }
    };



    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <div className="login-box">
                    <h3>Login</h3>

                    <div>
                        <label className="forminput" htmlFor="email">Email:</label>
                    </div>
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    {/*<div>
                        <input
                            type="checkbox"
                            id="rememberme"
                            name="rememberme"
                            checked={rememberme}
                            onChange={handleChange} /><span>Remember Me</span>
                    </div>*/}
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    <div>
                        <button onClick={handleRegisterClick}>Register</button>
                    </div>
                    {error}
                </div>
            </form>
        </div>
    );
}

export default Login;