import Zee5Logo from '../assets/zee5-seeklogo.svg';
import { useContext, useState, useEffect } from "react";
import { ApiContext } from "./context/ApiContext";
import {Outlet, useNavigate} from "react-router-dom";

export default function NavBar() {
    const { isSignedIn, setIsSignedIn } = useContext(ApiContext);
    const nav = useNavigate();
    const [inOut, setInOut] = useState("Sign In");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setInOut("Sign Out");
        } else {
            setInOut("Sign In");
        }
    }, [isSignedIn]);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setInOut("Sign In")
        setIsSignedIn(false);
        nav("/");
    };

    const handleSignIn = () => {
        setInOut("Sign Out")

        nav("/login");
    };

    return (
        <div>
            <div className="flex justify-between items-center h-20 w-full bg-black">
                <img className="ml-12 text-amber-50 h-12 w-12" src={Zee5Logo} alt="icon"/>
                <button
                    className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded mr-16"
                    onClick={inOut === "Sign Out" ? handleSignOut : handleSignIn}
                >
                    {inOut}
                </button>
            </div>
            <main>
                <Outlet/>
            </main>
        </div>
)
    ;
}
