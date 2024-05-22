import NavBar from "./components/navBar";
import LoginPage from "./components/signIn";
import SignUp from "./components/signUp";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PrimeReactProvider} from "primereact/api";
import CarouselSpace from "./components/CarouselSpace";
import Video from "./components/Video";
// import Body from "./components/pages/Body";

function App() {
    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <NavBar />,
                children: [
                    {
                        path:"/",
                        element:<CarouselSpace/>
                    },
                    {
                        path:"/login",
                        element:<LoginPage/>
                    },
                    {
                        path:"/signup",
                        element:<SignUp/>
                    },
                    {
                        path: "/video/:videoUrl",
                        element: <Video/>
                    }
                ]
            }
        ]
    );
      return (
        <div className="App bg-black">
            <PrimeReactProvider>
                <RouterProvider router={router}/>
            </PrimeReactProvider>
        </div>
      );
}

export default App;
