import axios from "axios";
const baseUrl = "/api/login";

const logIn = async (creds) => {
  try {
    const res = await axios.post(baseUrl, creds);
    console.log(res)
    return res;
  } catch (err) {
    console.log(err.response)
    return err;
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { logIn };
