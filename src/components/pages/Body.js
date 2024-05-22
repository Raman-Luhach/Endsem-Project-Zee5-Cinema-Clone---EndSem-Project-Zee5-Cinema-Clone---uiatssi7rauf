import {useState , useEffect} from "react";

export default function Body(){
    const [data, setData] = useState(null);
    const [ setError] = useState(null);

    useEffect(() => {
        fetch('https://academics.newtonschool.co/api/v1/ott/show', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'projectID': 'treoo5dhf86s',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => setError(error));
    }, []);
    console.log(data)

    return (
        // <Carousel value={data} numScroll={1} numVisible={3}  />
        <></>
    )
}