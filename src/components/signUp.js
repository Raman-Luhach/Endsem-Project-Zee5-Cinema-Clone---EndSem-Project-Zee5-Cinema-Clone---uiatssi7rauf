import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        return email.includes('@') && email.includes('.');
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = password.split('').some(char => char >= 'A' && char <= 'Z');
        const hasLowerCase = password.split('').some(char => char >= 'a' && char <= 'z');
        const hasNumber = password.split('').some(char => char >= '0' && char <= '9');
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = {};

        if (!name) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Email is not valid';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) {
            return;
        }

        const payload = {
            name: name,
            email: email,
            password: password,
            appType: "ott"
        };

        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    projectID: 'treoo5dhf86s',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert('User signed up successfully!');
                navigate('/login');
            } else {
                alert(`Signup failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error occurred during signup:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
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
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
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
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
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
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
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
                    Already have an Account? <Link to="/login" className="font-bold">Sign In here</Link>.
                </p>
            </form>
        </div>
    );
};

export default SignUp;
