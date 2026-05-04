import { Link } from "react-router-dom";
import { useState } from "react";
import useStore from "../store";

const PostComponent = ({ post }) => {
  const user = useStore((s) => s.user);
  const likePost = useStore((s) => s.likePost);
  const addComment = useStore((s) => s.addComment);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (!user) {
      alert("Войдите чтобы поставить лайк");
      return;
    }
    likePost(post.id, user.id);
  };

  const handleAddComment = () => {
    if (!user) {
      alert("Войдите чтобы оставить комментарий");
      return;
    }
    if (!commentText.trim()) return;

    addComment(post.id, {
      id: Date.now(),
      text: commentText,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString(),
    });
    setCommentText("");
  };

  const likesCount = post.likes?.length || 0;
  const hasLiked = user && post.likes?.includes(user.id);
  const commentsCount = post.comments?.length || 0;

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-author">
          <div className="post-avatar">
            {post.userName ? post.userName[0]?.toUpperCase() : "U"}
          </div>
          <div>
            <div className="post-author-name">
              {post.userName || `Пользователь ${post.userId}`}
            </div>
            <div className="post-date">
              {new Date(post.id).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <Link to={`/post/${post.id}`} className="post-link">
        <h4>{post.title}</h4>
        <p>{post.body}</p>
      </Link>

      {post.imageUrl && (
        <div className="post-image">
          <img src={post.imageUrl} alt="Post" />
        </div>
      )}

      <div className="post-actions">
        <button 
          className={`action-btn like-btn ${hasLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          ❤️ {likesCount > 0 && <span>{likesCount}</span>}
        </button>
        <button 
          className="action-btn comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {commentsCount > 0 && <span>{commentsCount}</span>}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-avatar">
                    {comment.userName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="comment-content">
                    <div className="comment-author">{comment.userName}</div>
                    <div className="comment-text">{comment.text}</div>
                    <div className="comment-date">
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-comments">Нет комментариев. Будьте первым!</p>
            )}
          </div>

          {user && (
            <div className="add-comment">
              <textarea
                placeholder="Напишите комментарий..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="3"
              />
              <button onClick={handleAddComment}>Отправить</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostComponent;