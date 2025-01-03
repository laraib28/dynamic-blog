"use client"; // Correct directive to enable client-side rendering

import React, { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded-md p-2"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <ul className="space-y-2">
        {comments.map((comment, index) => (
          <li
            key={index}
            className="border border-gray-300 rounded-md p-2 bg-gray-100"
          >
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
