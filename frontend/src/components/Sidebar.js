import React from 'react'
import { HomeIcon } from "@heroicons/react/16/solid";

const Sidebar = (props) => {
    return (
        <>
            <div className="flex flex-col md:flex-row">
                <div className="flex-none mb-6 md:mb-0">
                    <div className="bg-gray-200 p-4 rounded-full w-12 h-12 flex items-center justify-center">
                        <HomeIcon />
                    </div>
                </div>

                {/* Vertical Line Separator */}
                <div className="border-l border-gray-300 mx-8"></div>
                {props.children}
            </div>
        </>
    )
}

export default Sidebar
