import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Api from "../customApi";

function CommentList({ pno }) {
    const [comments, setComments] = useState([]);
    const [page, setePage] = useState(0);


    const [paging, setPaging] = useState([{
        totalPages: 0, startPage: 0, endPage: 0, hasNext: false, hasPrev: false, prevIndex: 0, nextIndex: 0
    }])

    const arr = [];
    for (let i = paging.startPage; i <= paging.endPage; i++) {
        arr.push(i);
    }


    useEffect(() => {
        Api.get('/comments?page='+page+'&pno='+pno)
            .then(res => {
                setComments(res.data.comments);
                setPaging(res.data.commentsPagination)
            })
            .catch(error => {
                console.error(error);
            });
    }, [pno]);

    return (
        <div>
            <h2>댓글</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.cno}>
                        <p>{comment.comment}</p>
                        <p>By {comment.commenter}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentList;