import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LogForm from "./components/LogForm";
import BlogForm from "./components/BlogForm";
import User from "./components/User";
import Toggle from "./components/Toggle";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userInfo, setUser] = useState(null);

  //add blogs func
  const createBlog = async (blogData) => {
    try {
      await blogService.postBlog(blogData);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  //
  const handleLike = async (id, data) => {
    try {
      await blogService.postLike(id, data);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteReq(id);
      const newBlog = await blogService.getAll();
      setBlogs(newBlog);
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = async (creds) => {
    try {
      const logReq = await loginService.logIn(creds);
      if (logReq.status === 200) {
        window.localStorage.setItem("userData", JSON.stringify(logReq.data));
        blogService.setToken(logReq.data.token);
        const newBlog = await blogService.getAll();
        setBlogs(newBlog);
        const userData = window.localStorage.getItem("userData");
        const jsonUser = JSON.parse(userData);
        setUser(jsonUser);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = () => {
    blogService.setToken(null);
    window.localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    (async () => {
      const getblog = await blogService.getAll();
      setBlogs(getblog);
    })();
  }, []);

  useEffect(() => {
    const userData = window.localStorage.getItem("userData");
    if (userData) {
      const jsonUser = JSON.parse(userData);
      setUser(jsonUser);
      blogService.setToken(jsonUser.token);
    }
  }, []);

  return (
    <div>
      {!userInfo ? (
        <LogForm logFunc={loginUser}></LogForm>
      ) : (
        <>
          <div className="user-area">
            <User user={userInfo} logoutFunc={logoutUser}></User>
            <Toggle buttonLabel="Add Blog">
              <BlogForm handleBlog={createBlog} currentUser={userInfo} />
            </Toggle>
          </div>
          <div className="blog-container">
            <h2 className="blog-header">Blogs</h2>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={userInfo}
                likeFunc={handleLike}
                deleteFunc={deleteBlog}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
