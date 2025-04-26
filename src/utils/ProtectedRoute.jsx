import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Redux
import { userAuthentication } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user);

  console.log(user?.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAuthentication());
  }, []);

  return user?.userInfo ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
