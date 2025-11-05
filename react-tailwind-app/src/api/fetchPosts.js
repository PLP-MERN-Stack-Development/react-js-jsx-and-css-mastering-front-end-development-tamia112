import axios from 'axios';
export const fetchPosts = async (page = 1, limit = 10) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts', { params: { _page: page, _limit: limit }});
  return res.data;
};
