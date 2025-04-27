import React from "react";
import { useNavigate } from "react-router-dom";
import { axisoInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const TaskActions = ({ taskId, showActions, setShowActions }) => {
  const navigate = useNavigate();

  const handleActions = async (action) => {
    if (action === "editTask") {
      navigate(`/edit-task/${taskId}`);
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`,
        },
      };
      await axisoInstance
        .delete(`/api/user/delete-task/${taskId}`, config)
        .then((res) => {
          toast.success(res.data.message || "Task deleted successfully");
          setShowActions(!showActions);
          window.location.reload();
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message || "Failed to delete the task"
          );
        });
    }
  };
  return (
    <div className=" flex flex-col justify-center items-start w-full gap-3 ">
      <button
        onClick={() => handleActions("editTask")}
        className=" bg-[#1E3BA3] text-[#ffffff] w-full rounded-lg p-2 hover:cursor-pointer hover:bg-[#2a324e]"
      >
        Edit
      </button>
      <button
        onClick={() => handleActions("delete")}
        className=" bg-[#e11414] text-[#ffffff] w-full rounded-lg p-2  hover:cursor-pointer hover:bg-[#512c2cf7]"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskActions;
