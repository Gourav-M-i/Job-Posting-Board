import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserIcon, UsersIcon, PhoneIcon, BuildingOfficeIcon, EnvelopeIcon, EyeIcon } from "@heroicons/react/16/solid";
import axios from 'axios'
import { UserAuthContext } from "../context/AuthContext";
import * as CONST from "../api/api-endpoints"

// import {User} from '@heroicons/react'
const LoginPage = () => {
    const { setLoggedInUser } = useContext(UserAuthContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCompanyProceed = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${CONST.REACT_BACKEND_API}/auth/login`, formData)
            console.log(res);
            if (res?.status === 200) {
                setLoggedInUser(res?.data?.company)
                localStorage.setItem('token', res.data.token)
                navigate('/createinterview')
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <div className="min-h-screen bg-white p-8">
                <Navbar isLoggedIn={false} />
                <div className="min-h-screen flex items-center justify-center bg-white">

                    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl px-8">
                        {/* Left Side */}
                        <div className="flex-1">


                            {/* Dummy Text */}
                            <div className="mt-16">
                                <p className="text-lg text-gray-500">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s, when an unknown printer took a galley.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="flex-1 mt-16 md:mt-0 md:ml-10 bg-white shadow-lg border rounded-lg p-8">
                            <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
                            <p className="text-sm text-gray-500 mb-6">
                                Lorem Ipsum is simply dummy text
                            </p>

                            {/* Form */}
                            <form onSubmit={handleCompanyProceed}>


                                {/* Company Email Field */}
                                <div className="relative mb-4">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Company Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-10 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                {/* Company password Field */}
                                <div className="relative mb-4">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="pl-10 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>


                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                                    onClick={handleCompanyProceed}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
