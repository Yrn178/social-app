import { create } from "zustand";

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  posts: JSON.parse(localStorage.getItem("posts")) || [],
  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },
  setPosts: (posts) => {
    localStorage.setItem("posts", JSON.stringify(posts));
    set({ posts });
  },
  addPost: (post) =>
    set((s) => {
      const newPosts = [post, ...s.posts];
      localStorage.setItem("posts", JSON.stringify(newPosts));
      return { posts: newPosts };
    }),
  likePost: (postId, userId) =>
    set((s) => {
      const updatedPosts = s.posts.map((post) => {
        if (post.id === postId) {
          const hasLiked = post.likes?.includes(userId);
          return {
            ...post,
            likes: hasLiked
              ? post.likes.filter((id) => id !== userId)
              : [...(post.likes || []), userId],
          };
        }
        return post;
      });
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return { posts: updatedPosts };
    }),
  addComment: (postId, comment) =>
    set((s) => {
      const updatedPosts = s.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), comment],
          };
        }
        return post;
      });
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return { posts: updatedPosts };
    }),
}));

export default useStore;