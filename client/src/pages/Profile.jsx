import useStore from "../store";
import PostComponent from "../components/PostComponent";

const Profile = () => {
  const user = useStore((s) => s.user);
  const posts = useStore((s) => s.posts);

  if (!user) return <p>Сначала войдите</p>;

  const myPosts = posts
    .filter((p) => p.userId === user.id)
    .sort((a, b) => b.id - a.id);

  const avatarLetter = user.name ? user.name[0].toUpperCase() : "U";

  return (
    <div>
      <div className="profile">
        <div className="avatar">{avatarLetter}</div>
        <div>
          <h2>{user.name}</h2>
          <p>ID: {user.id}</p>
          <p>📊 Постов: {myPosts.length}</p>
        </div>
      </div>

      <div className="feed-header">
        <h3>Мои записи</h3>
        <span className="post-count">{myPosts.length} постов</span>
      </div>

      {myPosts.length === 0 && <p>У вас пока нет постов</p>}

      {myPosts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Profile;