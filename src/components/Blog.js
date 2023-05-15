import Toggle from "./Toggle";

const Blog = ({ blog, user, likeFunc, deleteFunc }) => {
  let identifier = blog.title.toString();
  
  identifier.replace(/\s+/g,'')
  console.log(typeof identifier)
  const liStyle = {
    listStyle: "none",
    margin: ".25rem",
  };
  const blogDiv = {
    border: "solid 1px ",

    margin: ".5rem",
  };

  const likeEvent = async (e) => {
    e.preventDefault();
    try {
      blog.likes += 1;
      await likeFunc(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      });
      console.log(blog);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteEvent = (e) => {
    e.preventDefault();
    if (window.confirm("Delete BlogPost?")) {
      try {
        deleteFunc(blog.id);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div style={blogDiv}>
      <ul>
        <li>
          <h4 className="blog-title"> {blog.title} </h4>
          <Toggle buttonLabel="Blog Details" className="toggle-btn">
            <ul>
              <li style={liStyle}>Author: {blog.author}</li>
              <li style={liStyle} className="blog-likes">
                Likes: <p className="like-count">{blog.likes}</p>
                <button onClick={likeEvent} className="like-btn">
                  Like 
                </button>
              </li>
              <li style={liStyle} className="blog-url">
                Link to blog: <a href={blog.url}>Blog Link</a>
              </li>
              <li style={liStyle}>Blog Poster: {blog.user.name}</li>

              {blog.user.name === user.name ? (
                <li style={liStyle}>
                  <button
                    onClick={deleteEvent}
                    data-button-name="delete-blog-btn"
                  >
                    Remove
                  </button>
                </li>
              ) : null}

            </ul>
          </Toggle>
        </li>
      </ul>
    </div>
  );
};

export default Blog;
