// Comment.jsx
import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-md shadow">
            <p className="text-sm text-gray-400">{comment.user.username}</p>
            <p className="text-gray-300 mt-1">{comment.text}</p>
            <p className="text-xs text-gray-500 mt-2">{new Date(comment.date).toLocaleString()}</p>
        </div>
    );
};

export default Comment;