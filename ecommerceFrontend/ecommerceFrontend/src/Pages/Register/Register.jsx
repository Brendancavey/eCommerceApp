import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss"


function Register() {
    // state variables for email and passwords
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")
    const navigate = useNavigate();

    // state variable for error messages
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate("/login");
    }


    // handle change events for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
        if (name === "firstName") setFirstName(value);
        if (name === "lastName") setLastName(value);
        if (name === "address") setAddress(value);
        if (name === "city") setCity(value);
        if (name === "zipCode") setZipCode(value); 
    };

    // handle submit event for the form
    const handleSubmit = (e) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password || !confirmPassword) {
            setError(<h3 style={{ color: "red" }}>Please fill in all fields.</h3>);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError(<h3 style={{ color: "red" }}>Please enter a valid email address.</h3>);
        } else if (password !== confirmPassword) {
            setError(<h3 style={{ color: "red" }}>Passwords do not match.</h3>);
        } else {
            // clear error message
            setError("");
            // post data to the /register api
            fetch("http://localhost:8080/api/ApplicationUser/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    FirstName: firstName,
                    LastName: lastName,
                    Address: address,
                    City: city,
                    ZipCode: zipCode,
                }),
            })
                //.then((response) => response.json())
                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok)
                        setError(<h3 style={{ color: "green" }}>Successful register.</h3>);
                    else
                        setError(<h3 style={{ color: "red" }}>Error registering.</h3>);

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError(<h3 style={{ color: "red" }}>Error registering.</h3>);
                });
        }
    };

    return (
        <div className="register-page">
            <form onSubmit={handleSubmit}>
                <div className="register-box">
                    <h3>Register</h3>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                    </div><div>
                        <input
                            type="firstName"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                    </div><div>
                        <input
                            type="lastName"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                    </div><div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label></div><div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label></div><div>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                    </div><div>
                        <input
                            type="address"
                            id="address"
                            name="address"
                            value={address}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                    </div><div>
                        <input
                            type="city"
                            id="city"
                            name="city"
                            value={city}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="zipCode">Zip Code:</label>
                    </div><div>
                        <input
                            type="zipCode"
                            id="zipCode"
                            name="zipCode"
                            value={zipCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Register</button>

                    </div>
                    <div>
                        <button onClick={handleLoginClick}>Go to Login</button>
                    </div>
                    {error}
                </div>
            </form>
        </div>
    );
}

export default Register;