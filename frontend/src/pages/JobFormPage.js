import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import * as CONST from '../api/api-endpoints'
import { UserAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const JobFormPage = () => {
    const { loggedInUser } = useContext(UserAuthContext)
    console.log("vkklv", loggedInUser)
    const [candidates, setEmails] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [jobForm, setJobForm] = useState({
        title: '',
        description: '',
        experienceLevel: '',
        candidates: [],
        endDate: '',
        company: ''
    })

    useEffect(() => {
        setJobForm({ ...jobForm, candidates: candidates })
    }, [candidates])


    const handleFormChange = (e) => {
        setJobForm({
            ...jobForm,
            [e.target.name]: e.target.value
        })
    }
    // Function to handle adding email on 'Enter' key press
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (inputValue.trim() && validateEmail(inputValue)) {
                setEmails([...candidates, inputValue]);
                setInputValue(""); // Clear input
            }
        }
    };

    // Function to validate email format
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // Function to remove email from the list
    const removeEmail = (indexToRemove) => {
        setEmails(candidates.filter((_, index) => index !== indexToRemove));
    };

    const handleJobSubmit = async (e) => {
        e.preventDefault()
        setJobForm({ ...jobForm, company: loggedInUser })
        console.log(jobForm)
        try {
            const res = await axios.post(`${CONST.REACT_BACKEND_API}/jobs/post`, jobForm, { headers: { 'Authorization': localStorage.getItem('token') } })
            console.log(res)
            if (res.status === 201) {
                return toast.success(res?.data?.message)
            }
            toast.error("Something went wrong.")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong.")

        }
    }


    return (
        <div className="min-h-screen bg-white p-8">
            {/* Navbar Section */}
            <Navbar isLoggedIn={true} />

            {/* <div className="flex flex-col md:flex-row"> */}
            {/* Sidebar */}
            <Sidebar >

                {/* Form Section */}
                <div className="flex-grow">
                    <form className="space-y-6" onSubmit={handleJobSubmit}>
                        {/* Job Title */}
                        <div className="flex items-center space-x-4">
                            <label className="w-48 text-lg font-semibold">Job Title</label>
                            <input
                                name="title"
                                type="text"
                                placeholder="Enter Job Title"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleFormChange}
                            />
                        </div>

                        {/* Job Description */}
                        <div className="flex items-start space-x-4">
                            <label className="w-48 text-lg font-semibold">Job Description</label>
                            <textarea
                                name="description"
                                placeholder="Enter Job Description"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                onChange={handleFormChange}
                            ></textarea>
                        </div>

                        {/* Experience Level */}
                        <div className="flex items-center space-x-4">
                            <label className="w-48 text-lg font-semibold">Experience Level</label>
                            <select
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleFormChange}
                                name="experienceLevel"
                            >
                                <option value="">Select Experience Level</option>
                                <option value="entry">Entry Level</option>
                                <option value="mid">Mid Level</option>
                                <option value="senior">Senior Level</option>
                            </select>
                        </div>

                        {/* Add Candidate (multiple email tags) */}
                        <div className="flex items-center space-x-4">
                            <label className="w-48 text-lg font-semibold">Add Candidate</label>
                            <div className="w-full px-4 py-2 border rounded-md flex flex-wrap items-center space-x-2 focus-within:ring-2 focus-within:ring-blue-500">
                                {/* Email Tags */}
                                {candidates.map((email, index) => (
                                    <div
                                        key={index}
                                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md flex items-center space-x-1 mb-2"
                                    >
                                        <span>{email}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeEmail(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                {/* Input for adding email */}
                                <input
                                    type="candidates"
                                    placeholder="Add candidate email"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-grow focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* End Date */}
                        <div className="flex items-center space-x-4">
                            <label className="w-48 text-lg font-semibold">End Date</label>
                            <input
                                name="endDate"
                                type="date"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={jobForm.endDate}
                                onChange={handleFormChange}
                            />
                        </div>

                        {/* Send Button */}
                        <button
                            type="submit"
                            className="w-100 bg-blue-600 text-white py-2 px-5 float-right rounded-md font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </Sidebar>
            {/* </div> */}
        </div>
    );
};

export default JobFormPage;
