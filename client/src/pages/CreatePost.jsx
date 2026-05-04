import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

const CreatePost = () => {
  const addPost = useStore((s) => s.addPost);
  const user = useStore((s) => s.user);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const submit = () => {
    if (!text) {
      alert("Введите текст поста");
      return;
    }

    if (!user) {
      alert("Сначала войдите в систему");
      navigate("/login");
      return;
    }

    addPost({
      id: Date.now(),
      title: title || "Новый пост",
      body: text,
      userId: user.id,
      userName: user.name,
      imageUrl: imageUrl || null,
      likes: [],
      comments: [],
    });

    setText("");
    setTitle("");
    setImageUrl("");
    navigate("/");
  };

  return (
    <div className="create-post">
      <h2>Создать пост</h2>
      <input
        type="text"
        placeholder="Заголовок (необязательно)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="6"
        placeholder="Введите текст поста..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL картинки (необязательно)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      {imageUrl && (
        <div className="image-preview">
          <img src={imageUrl} alt="Preview" />
        </div>
      )}
      <button onClick={submit}>Опубликовать</button>
    </div>
  );
};

export default CreatePost;