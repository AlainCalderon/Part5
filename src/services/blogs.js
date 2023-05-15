import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = async () => {
  const request = await axios.get(baseUrl);
  const sorted = request.data.sort((a, b) => b.likes - a.likes);
  return sorted;
};

const setToken = (resToken) => {
  token = `Bearer ${resToken}`;
};

const postBlog = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const postReq = await axios.post(baseUrl, newBlog, config);
  return postReq.data;
};

const postLike = async (blogId, blogData) => {
  const req = await axios.put(`${baseUrl}/${blogId}`, blogData);
  return req.data;
};

const deleteReq = async (blogId) => {
  const config = { headers: { Authorization: token } };
  const req = await axios.delete(`${baseUrl}/${blogId}`, config);
  return req;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, postBlog, postLike, deleteReq };
