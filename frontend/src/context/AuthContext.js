import React, { createContext, useState } from 'react'

export const UserAuthContext = createContext({ loggedInUser: null, setLoggedInUser: () => { } });
const AuthContext = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <UserAuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {props.children}
        </UserAuthContext.Provider>
    )
}

export default AuthContext
