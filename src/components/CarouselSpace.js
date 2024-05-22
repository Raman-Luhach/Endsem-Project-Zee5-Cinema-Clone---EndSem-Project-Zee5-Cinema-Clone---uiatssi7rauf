import { useContext, useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "./context/ApiContext";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

function CardDashboard({ _id, thumbnail, keywords, title }) {
    const [isHovered, setIsHovered] = useState(false);
    const [video, setVideo] = useState(null);
    const navigate = useNavigate();

    function handleVideo() {
        fetch(`https://academics.newtonschool.co/api/v1/ottx/show/${_id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "projectID": "treoo5dhf86s",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log("API response data:", data); // Log the API response data
                setVideo(data.video_url);
                navigate(`/video/${encodeURIComponent(video)}`); // Navigate after setting video state
            })
            .catch((error) => {
                console.error("Error fetching video:", error);
            });
    }



    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative transition-transform duration-300 transform hover:scale-105 overflow-hidden rounded-xl shadow-lg"
            style={{ width: '250px', height: '350px' }}
        >
            {!isHovered ? (
                <img src={thumbnail} className="w-full h-full object-cover rounded-xl" alt="thumbnail" />
            ) : (
                <div className="absolute inset-0 bg-white flex flex-col justify-between p-4 rounded-xl shadow-inner">
                    <div className="flex justify-center">
                        <img src={thumbnail} className="w-48 h-48 object-cover rounded-xl" alt="thumbnail" />
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <div className="font-semibold text-black">{title}</div>
                        <div className="flex gap-2 text-black mt-2">
                            {keywords.map((item, index) => (
                                <div key={index} className="px-3 py-1 text-sm bg-gray-200 rounded-full">{item}</div>
                            ))}
                        </div>
                    </div>
                    <button
                        className="text-black bg-amber-50 w-20 mt-4 border border-solid border-black py-2 rounded-full"
                        onClick={handleVideo}
                    >
                        Watch
                    </button>
                </div>
            )}
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
