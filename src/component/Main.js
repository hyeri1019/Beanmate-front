import {useLocation, useNavigate} from "react-router-dom";
import  { useState, useEffect, useRef, useCallback } from 'react';
import Api from "../customApi";

import "../fade.css"

function Main() {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const obsRef = useRef(null);

    useEffect(() => {
        console.log('??'+currentPage)
        setIsLoading(true);
        getPosts(currentPage).then((data) => {
            setList((prevList) => [...prevList, ...data.posts]);
            setHasMore(data.pagination.hasNext);
            setIsLoading(false);
        });
    }, [currentPage,hasMore]);

    const handleObserver = async(entries) => {
         const target =  entries[0];
        if (target.isIntersecting && hasMore) {
             setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
        if (obsRef.current) observer.observe(obsRef.current);
        return () => observer.disconnect();
    }, [hasMore,currentPage]);

    const getPosts = useCallback(async (page) => {
        const response = await Api.get(`/feeds?page=${page}`);
        return response.data;
    }, [hasMore,currentPage]);

    return (
        <div className="wrap min-h-[100vh]">
            {list.map((post) => (
                <img src={`http://localhost:8080/uploads/${post.imageName}`} width="500px" height="300px" />
            ))}
            {isLoading && <div className="py-3 bg-blue-500 text-center">로딩 중</div>}
            {!isLoading && hasMore && (
                <div ref={obsRef} className="py-3 bg-red-500 text-white text-center">
                    옵저버 Element
                </div>
            )}
        </div>
    );
}
export default Main;