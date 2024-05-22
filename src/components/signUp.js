import React, {useContext, useState} from 'react';
import {ApiContext} from "./context/ApiContext";
import {Link, useNavigate} from "react-router-dom";

const SignUp = () => {
    const {isSignedIn , setIsSignedIn} = useContext(ApiContext);
    const toLogin = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the payload for the API request
        const payload = {
            name: name,
            email: email,
            password: password,
            appType: "ott"
        };

        try {
            // Make the API request
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
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
                // Handle successful signup
                setIsSignedIn(true)

                alert("User signed up successfully!");
                toLogin("/login")

            } else {
                // Handle signup errors
                console.error("Signup failed:", data);
            }
        } catch (error) {
            // Handle any errors that occurred during the fetch
            console.error("Error occurred during signup:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black ">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-8 w-3/12 mb-32 h-full">
                <h2 className="text-2xl font-bold mb-4 mt-4">Create a new Account</h2>
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 border-customPurple rounded-xl w-full py-2 px-3 mb-3"
                        placeholder="Name"
                    />
                </div>
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
                        Sign Up
                    </button>
                </div>
                <p className="mt-4">
                    Already have a Account? <Link to="/login" className="font-bold">Sign In here</Link>.
                </p>
            </form>
        </div>
    );
};

export default SignUp;
