import { useContext, useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "./context/ApiContext";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

function CardDashboard({ _id, thumbnail, keywords, title }) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    function handleVideo() {
        fetch(`https://academics.newtonschool.co/api/v1/ottx/show/${_id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "projectID": "treoo5dhf86s",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("API response data:", data); // Log the API response data
                const videoUrl = data.data.video_url;
                navigate(`/video/${encodeURIComponent(videoUrl)}`); // Navigate directly using the video URL from the API response
            })
            .catch((error) => {
                console.error("Error fetching video:", error);
            });
    }



    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative mt-10 z-50 overflow-visible p-4 transition-all duration-300 transform hover:p-2 hover:bottom-8  rounded-xl shadow-lg"
            // style={{ width: '250px', height: '350px' }}
        >
                <div className=" overflow-visible z-50 inset-0 bg-white flex flex-col justify-between rounded-xl shadow-inner">
                    <div className={`flex justify-center ${isHovered && 'p-2'}`}>
                        <img src={thumbnail} className="h-[350px] z-50 object-cover rounded-xl" alt="thumbnail" />
                    </div>
                    { isHovered &&
                    <>
                        <div className="flex flex-col gap-2 p-2 pl-4">
                            <div className="font-semibold text-black text-sm">{title}</div>
                            <div className="flex gap-1 text-black text-sm">
                                {keywords.map((item, index) => (
                                    <div key={index} className="text-clip text-sm mr-2 rounded-full">{item}</div>
                                ))}
                            </div>
                            <button
                                className="text-sm  text-black bg-amber-50 w-20 p-1 border border-solid border-black rounded-full"
                                onClick={handleVideo}
                            >
                                Watch
                            </button>
                        </div>

                    </>
                    }
                </div>

        </div>
    );
}

export default function CarouselSpace() {
    const [categoryList, setCategoryList] = useState([]);
    const value = useContext(ApiContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategoryList() {
            let res = await fetch(
                "https://academics.newtonschool.co/api/v1/ottx/categories",
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        projectID: "treoo5dhf86s",
                    },
                }
            );
            let data = await res.json();
            if (data.message === "success") {
                setCategoryList(data.data);
            } else {
                navigate("/error");
            }
        }
        fetchCategoryList();
    }, [navigate]);

    const CategoryWise = {};
    if (categoryList.length !== 0) {
        categoryList.forEach((item) => {
            const List = value.data.filter((itm) => itm.type === item);
            CategoryWise[item] = List;
        });
    }

    function capitalizeFirstLetter(str) {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
        <div className="flex flex-col text-white mt-16 p-14">
            {categoryList.map((category, index) => (
                <div key={index} className="mb-12">
                    <div className="text-5xl mb-4">{capitalizeFirstLetter(category)}</div>
                    <Carousel
                        value={CategoryWise[category] || []}
                        numVisible={5}
                        numScroll={2}
                        className="custom-carousel"
                        circular
                        itemTemplate={(item) => <CardDashboard {...item} />}
                    />
                </div>
            ))}
        </div>
    );
}
