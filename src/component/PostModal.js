import React from "react";
import Modal from "react-modal";
import CommentList from "./CommentList";
import {Grid} from "@mui/material";
import Like from "./Like";
import {useNavigate} from "react-router-dom";

const PostModal = ({ post, isOpen, onRequestClose }) => {

    const navigate = useNavigate();

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <h2>{post.title}</h2>
                    <img src={`http://localhost:8080/uploads/${post.imageName}`} alt="이미지" />
                    <p>{post.content}</p>
                    <p onClick={() =>
                        navigate('/creator/'+post.writer)}>{post.writer}</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CommentList pno={post.pno}></CommentList>
                </Grid>
            </Grid>
            <Like pno={post.pno}></Like>
        </Modal>
    );
};

export default PostModal;