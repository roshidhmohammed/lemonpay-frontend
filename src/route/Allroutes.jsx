import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSignupPageContainer from "../components/LoginSignupPageContainer";
import ViewTask from "../components/ViewTask";
import ProtectedRoute from "../utils/ProtectedRoute";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";

const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignupPageContainer />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/view-task" element={<ViewTask />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AllRoutes;
