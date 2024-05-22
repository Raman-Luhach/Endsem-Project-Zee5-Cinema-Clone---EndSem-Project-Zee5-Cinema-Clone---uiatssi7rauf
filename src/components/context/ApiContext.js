import { createContext } from "react";
import React, { useEffect, useState } from 'react';
// import axios from 'axios';


export const ApiContext = createContext(null);

export const ContextProvider = (props)=>{
    const [data, setData] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://academics.newtonschool.co/api/v1/ott/show?limit=1000', {
                    headers: {
                        'accept': 'application/json',
                        'projectID': 'treoo5dhf86s',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error state if necessary
            }
        };

        fetchData();
    }, []);
    // Empty dependency array means this effect runs once after the initial render



    return (
        <ApiContext.Provider value={{data, isSignedIn, setIsSignedIn}}>
            <div>
                {props.children}
            </div>
        </ApiContext.Provider>

    )
}