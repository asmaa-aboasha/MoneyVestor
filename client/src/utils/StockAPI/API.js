import axios from "axios";

const API = {
  // Fetch Data from Stock API
  getBooks: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  }
};

export default API;