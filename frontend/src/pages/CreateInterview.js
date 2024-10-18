import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'

const CreateInterview = () => {
    const navigate = useNavigate()
    const handleCreateInterview = () => {
        navigate('/jobform')
    }
    return (
        <>
            <div className="min-h-screen bg-white p-8">
                <Navbar />
                <Sidebar>
                    <button
                        type="submit"
                        className="w-100 bg-blue-600 text-white py-2 px-5 float-right rounded-md font-semibold hover:bg-blue-700 transition-colors"
                        onClick={handleCreateInterview}
                    >
                        Create Interview
                    </button>
                </Sidebar>
            </div>
        </>
    )
}

export default CreateInterview
