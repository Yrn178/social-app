import { useEffect, useState } from "react";
import useStore from "../store";
import { fetchPosts } from "../api/posts.js";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";
import PostComponent from "../components/PostComponent";

const Feed = () => {
  const { posts, setPosts } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    
    if (!savedPosts || JSON.parse(savedPosts).length === 0) {
      fetchPosts()
        .then((apiPosts) => {
          const postsWithUsers = apiPosts.map((post, index) => ({
            ...post,
            userId: (index % 5) + 1,
            userName: `User ${(index % 5) + 1}`,
            likes: [],
            comments: [],
            imageUrl: null,
          }));
          setPosts(postsWithUsers);
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMsg />;

  return (
    <div>
      <div className="feed-header">
        <h2>Новости</h2>
        <span className="post-count">{posts.length} постов</span>
      </div>

      {posts.length === 0 && (
        <p>Нет постов. Создайте первый пост!</p>
      )}

      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;