import React, { useContext, useState } from 'react';
import { UserAuthContext } from '../context/AuthContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()
    const { loggedInUser, setLoggedInUser } = useContext(UserAuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        setLoggedInUser(false)
        setDropdownOpen(false);
        localStorage.clear()
        navigate('/')
    };

    return (
        <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-10">
            {/* Logo and Contact */}
            <div className="text-4xl font-bold text-blue-600">cuvette</div>
            <div className="flex items-center">
                <div className="text-lg text-gray-600 mr-4">Contact</div>
                {loggedInUser && (
                    <div className="relative">
                        {/* Name with light border and dropdown */}
                        <div
                            onClick={toggleDropdown} // Toggle dropdown on click
                            className="flex items-center cursor-pointer p-2 border border-gray-300 rounded-lg"
                        >
                            <div className="bg-gray-200 w-8 h-8 rounded-full mr-2"></div>
                            <span className="text-gray-600">{loggedInUser}</span>
                            {dropdownOpen ? <ChevronUpIcon className="h-5 w-5 text-gray-600 mr-2" /> : <ChevronDownIcon className="h-5 w-5 text-gray-600 mr-2" />}
                        </div>

                        {/* Dropdown menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
