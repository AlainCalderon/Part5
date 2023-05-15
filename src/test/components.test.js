/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";
test("Blog Title check", () => {
  const blogData = {
    title: "Sample Title",
    author: "Sample author",
    url: "sample.com",
    likes: 1,
  };
  const userData = {
    name: "lain",
  };

  const { container } = render(<Blog blog={blogData} user={userData} />);

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const title = container.querySelector(".blog-title");
  expect(title).toHaveTextContent("Sample Title");
});

test("Button click shows url and likes", async () => {
  const blogData = {
    title: "Sample Title",
    author: "Sample author",
    url: "sample.com",
    likes: 1,
  };
  const userData = {
    name: "lain",
  };

  const { container } = render(<Blog blog={blogData} user={userData}></Blog>);
  const user = userEvent.setup();
  const button = screen.getByText("Blog Details");
  await user.click(button);
  const url = container.querySelector(".blog-url");
  const likes = container.querySelector(".blog-likes");

  expect(url).toHaveTextContent("Link to blog: Blog Link");
  expect(likes).toHaveTextContent("1");
});

test("Check if likes is clicked twice,", async () => {
  const blogData = {
    title: "Sample Title",
    author: "Sample author",
    url: "sample.com",
    likes: 1,
  };
  const userData = {
    name: "lain",
  };

  const mockHandler = jest.fn();

  const { container } = render(
    <Blog blog={blogData} user={userData} likeFunc={mockHandler} />
  );

  const button = container.querySelector(".like-btn");
  await userEvent.click(button);
  await userEvent.click(button);
  expect(mockHandler).toBeCalledTimes(2);
});

test("Blog From test", async () => {
  const blogData = {
    title: "Sample Title",
    author: "Sample author",
    url: "sample.com",
    likes: 1,
  };
  const userData = {
    name: "lain",
  };

  const user = userEvent.setup();
  const mockHandler = jest.fn();
  const {container} = render(<BlogForm handleBlog={mockHandler} currentUser={userData}/>);
  const button = container.querySelector(".blog-sub-btn");
  const title = container.querySelector('.blog-title-input');
  const auth = container.querySelector('.author-input');
  const url = container.querySelector('.url-input');
  fireEvent.change(title,{target:{value:"sample"}})
  fireEvent.change(auth,{target:{value:"sample"}})
  fireEvent.change(url,{target:{value:"sample"}})
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
  console.log(mockHandler.mock)
  expect(mockHandler.mock.lastCall[0]).toStrictEqual({"title":"sample","author":"sample","url":"sample","user":"lain"})
});
