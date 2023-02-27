import React from "react";
import Modal from "react-modal";

const PostModal = ({ post, isOpen, onRequestClose }) => {


    return (
                <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
                    <h2>{post.title}</h2>
                    <img src={`http://localhost:8080/uploads/${post.imageName}`} alt="이미지" />
                    <p>{post.content}</p>
                    <p>{post.writer}</p>
                </Modal>
    );
};

export default PostModal;