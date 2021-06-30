import useToken from "./token";
import Axios from "axios";

const useAuthStatus = () => {
  const { getToken } = useToken();
  const token = getToken();
  const getStatus = async () => {
    try {
      if (!token || token.length === 0) return false;
      var response = await Axios.get("https://peaceful-island-93608.herokuapp.com/checkAuth", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return {
    getStatus,
  };
};

export default useAuthStatus;
