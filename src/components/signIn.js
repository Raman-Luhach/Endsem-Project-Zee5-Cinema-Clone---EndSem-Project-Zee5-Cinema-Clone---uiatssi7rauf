import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the payload for the API request
        const payload = {
            email: email,
            password: password,
            appType: "ott"
        };

        try {
            // Make the API request
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'projectID': 'treoo5dhf86s',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Parse the response
            const data = await response.json();

            // Handle the response
            console.log(data);

            // Optionally, you can handle success and error cases
            if (response.ok) {
                // Handle successful login
                localStorage.setItem('token', data.token);
                nav("/");
                alert("User logged in successfully!");
                // Redirect or perform other actions on successful login
            } else {
                // Handle login errors
                nav('/signup')
                alert("Login failed:", data);
                // Display error message to the user
            }
        } catch (error) {
            // Handle any errors that occurred during the fetch
            console.error("Error occurred during login:", error);
            // Display error message to the user
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black ">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-8 w-3/12 mb-32 h-5/6">
                <h2 className="text-2xl font-bold mb-4 mt-4">Login to ZEE5</h2>
                <div className="mb-4">
                     <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 border-customPurple rounded-xl w-full py-2 px-3 mb-3"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-customPurple rounded-xl w-full py-2 px-3 mb-3"
                        placeholder="Password"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-customPurple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl w-full"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
                <p className="mt-4">
                    New to Zee5? <Link to="/signup" className="font-bold">Sign Up here</Link>.
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
