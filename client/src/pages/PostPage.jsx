import { useParams } from "react-router-dom";
import useStore from "../store";
import PostComponent from "../components/PostComponent";
import Loader from "../components/Loader";

const PostPage = () => {
  const { id } = useParams();
  const posts = useStore((s) => s.posts);
  const post = posts.find((p) => p.id == id);

  if (!post) return <Loader />;

  return <PostComponent post={post} />;
};

export default PostPage;