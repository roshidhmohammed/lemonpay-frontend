import { userAuthenticationFail, userAuthenticationReq, userAuthenticationSuccess } from "../features/user/userAuthenticationSlice";
import { axisoInstance } from "../utils/axiosInstance";

export const userAuthentication =
  () => async (dispatch) => {
    try {
      dispatch(userAuthenticationReq());
      
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`,
        },
      };
      const { data } = await axisoInstance.get("/api/user/get-details", config);
      dispatch(userAuthenticationSuccess(data));
    } catch (error) {
      if (error) {
        localStorage.removeItem("userInfo");
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            window.location.reload()
        dispatch(userAuthenticationFail(errorMessage));
      }
    }
  };


