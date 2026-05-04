import { useState } from "react";

export default function useStore() {
  const [posts, setPosts] = useState([]);

  return { posts, setPosts };
}