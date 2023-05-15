import { useState } from "react";
import Proptypes from "prop-types";
import Message from "./Message";

const BlogForm = ({ handleBlog,currentUser }) => {
  const [blogTitle, setTitle] = useState("");
  const [blogAuthor, setAuthor] = useState("");
  const [blogUrl, setUrl] = useState("");
  const [message, setMsg] = useState(null);


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
     await handleBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        user: currentUser.name,
      });
      setMsg("Added new Blog");
      setTitle("");
      setAuthor("");
      setUrl("");
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    } catch (err) {
      setMsg("Failed to add blog");
      setTimeout(() => {
        setMsg(null);
      }, 5000);
      console.log(err);
    }
  };

  return (
    <div>
      {message ? <Message msg={message}></Message> : null}
      <form onSubmit={handleSubmit}>
        <p>Title: </p>
        <input
          className="blog-title-input"
          type="text"
          name="Title"
          value={blogTitle}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        ></input>
        <p>Author: </p>
        <input
        className="author-input"
          type="text"
          name="Author"
          value={blogAuthor}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        ></input>
        <p>URL: </p>
        <input
        className="url-input"
          type="text"
          name="Url"
          value={blogUrl}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        ></input>
        <button type="submit" className="blog-sub-btn">submit</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleBlog: Proptypes.func.isRequired,
};

export default BlogForm;
