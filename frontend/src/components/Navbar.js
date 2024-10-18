import React, { useContext } from 'react'
import { UserAuthContext } from '../context/AuthContext'
const Navbar = () => {
    const { LoggedInUser } = useContext(UserAuthContext)
    return (
        <><div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-10">
            {/* Logo and Contact */}
            <div className="text-4xl font-bold text-blue-600">cuvette</div>
            <div className="flex items-center">
                <div className="text-lg text-gray-600 mr-4">Contact</div>
                {LoggedInUser && <div className="flex items-center">
                    <div className="bg-gray-200 w-8 h-8 rounded-full mr-2"></div>
                    <span className="text-gray-600">Your Name</span>
                </div>}
            </div>
        </div>
        </>
    )
}

export default Navbar
