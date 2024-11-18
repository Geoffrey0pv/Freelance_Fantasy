// CommentList.jsx
import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, loading }) => {
    if (loading) {
        return <div className="animate-pulse text-gray-400">Cargando comentarios...</div>;
    }

    return (
        <div className="space-y-4">
            {comments.length > 0 ? (
                comments.map((comment) => <Comment key={comment.id} comment={comment} />)
            ) : (
                <p className="text-gray-500">No hay comentarios aún. ¡Sé el primero en comentar!</p>
            )}
        </div>
    );
};

export default CommentList;