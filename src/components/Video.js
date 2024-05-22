import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Video() {
    const { videoUrl } = useParams();

    useEffect(() => {
        // You can use videoUrl here to load the video

        console.log("Video URL:", videoUrl);
    }, [videoUrl]);

    return (
        <div className="flex justify-center items-center h-screen">
            <video controls autoPlay className="max-w-full max-h-full">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Video;
