import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This effect runs when the app starts to check if a token exists
        // and fetches user data if it does.
        const fetchUser = async () => {
            if (token) {
                // Set the token in axios headers for all subsequent requests
                axios.defaults.headers.common['x-auth-token'] = token;
                try {
                    // TODO: Create this backend route later to get user data
                    const res = await axios.get('/api/auth/user');
                    setUser(res.data);
                    // For now, we'll just simulate setting a user
                    // setUser({ name: 'Kunj' });
                    
                } catch (err) {
                    console.error('Auth Error:', err);
                    // If token is invalid, remove it
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    axios.defaults.headers.common['x-auth-token'] = null;
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, [token]);

    // Login function
    const login = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/auth/login', body, config);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            
            return { success: true };
        } catch (err) {
            console.error('Login failed:', err.response.data.message);
            return { success: false, message: err.response.data.message };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        axios.defaults.headers.common['x-auth-token'] = null;
    };

    const authContextValue = {
        token,
        isAuthenticated: !!user, // True if user object is not null
        user,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Create a custom hook to use the context easily
export const useAuth = () => {
    return useContext(AuthContext);
};



// 15-08-2025(gemini)

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// // Create the context
// const AuthContext = createContext(null);

// // Create a custom hook to use the context easily
// export const useAuth = () => useContext(AuthContext);

// // Create the provider component
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     const [loading, setLoading] = useState(true);

//     // Set the authorization header for all axios requests when the token changes
//     useEffect(() => {
//         if (token) {
//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//             localStorage.setItem('token', token);
//         } else {
//             delete axios.defaults.headers.common['Authorization'];
//             localStorage.removeItem('token');
//         }

//         // Fetch user data if we have a token but no user object
//         const fetchUser = async () => {
//             if (token && !user) {
//                 try {
//                     const { data } = await axios.get('/api/users/me');
//                     setUser(data);
//                 } catch (error) {
//                     console.error("Failed to fetch user on load", error);
//                     // If token is invalid, log out
//                     logout();
//                 }
//             }
//             setLoading(false);
//         };

//         fetchUser();
//     }, [token]);

//     const login = (newToken) => {
//         setToken(newToken);
//     };

//     const logout = () => {
//         setUser(null);
//         setToken(null);
//     };

//     // --- THIS IS THE KEY FUNCTION ---
//     // This function will be called after applying to a scholarship
//     const refetchUser = async () => {
//         try {
//             console.log("Refetching user data...");
//             const { data } = await axios.get('/api/users/me');
//             setUser(data);
//             console.log("User data updated:", data);
//         } catch (error) {
//             console.error("Could not refetch user data", error);
//         }
//     };

//     const value = {
//         user,
//         token,
//         login,
//         logout,
//         refetchUser, // Expose the new function
//         isAuthenticated: !!user,
//         loading
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

