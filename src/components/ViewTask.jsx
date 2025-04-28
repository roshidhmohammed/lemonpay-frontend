import React, { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { axisoInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import ViewTasksRow from "./ViewTasksRow";
import TaskActions from "./TaskActions";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { converDateFormat } from "../helpers/converDateFormat";

const ViewTask = () => {
  const [allTasks, setAllTasks] = useState();
  const [showActions, setShowActions] = useState(false);
  const [taskId, setTaskId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  });

  const fetchTasks = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userInfo")}`,
      },
    };

    await axisoInstance
      .get("/api/user/all-tasks", config)
      .then((res) => {
        setAllTasks(res.data.tasks);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to fetch the tasks"
        );
      });
  };
  const addTask = () => {
    navigate("/add-task");
  };
  return (
    <div
      className={`${
        showActions &&
        " relative bg-[#3e3e3e06] z-[999999]    transition-opacity inset-0 backdrop-blur-2xs  duration-300 top-0 left-0 right-0 bottom-0"
      } relative`}
    >
      <h1 className=" mt-16 mb-10 sm:ml-10 ml-2 text-3xl text-[#1E3BA3] font-medium">
        Task Management
      </h1>

      <div className=" flex justify-end sm:mr-10 mr-2 mb-10">
        <button
          className=" sm:p-5 p-2 sm:px-8 px-5 rounded-full bg-[#1E3BA3] text-[#ffffff] flex items-center gap-2"
          onClick={() => addTask()}
        >
          <IoAddSharp className="text-[#ffffff]  text-2xl font-bold" />
          Add Task
        </button>
      </div>

      <div className="relative overflow-x-auto md:mx-10 mx-2 ">
        {allTasks?.length === 0 ? (
          <h1 className=" text-center text-lg font-bold">
            No tasks available to display
          </h1>
        ) : (
          <>
            <div className="md:block hidden">
              <table className=" w-full text-sm text-left rtl:text-right mb-10 ">
                <thead className="    text-[#1E3BA3] text-xl font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Task
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {allTasks?.map((task, index) => (
                    <ViewTasksRow
                      key={task?._id}
                      task={task}
                      index={index + 1}
                      showActions={showActions}
                      setShowActions={setShowActions}
                      setTaskId={setTaskId}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className=" md:hidden block mb-10">
              {allTasks?.map((task) => (
                <ViewTaskMobile
                  key={task?._id}
                  task={task}
                  showActions={showActions}
                  setShowActions={setShowActions}
                  setTaskId={setTaskId}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {showActions && (
        <div className=" absolute z-50  bg-[#f1efef] shadow-2xl rounded-lg p-5 shadow-gray-400 sm:left-[38%] left-[20%] sm:right-[38%] right-[20%] py-10 top-[35%] flex justify-start flex-col">
          <TaskActions
            taskId={taskId}
            setShowActions={setShowActions}
            showActions={showActions}
          />
        </div>
      )}
    </div>
  );
};

export default ViewTask;

const ViewTaskMobile = ({ task, showActions, setShowActions, setTaskId }) => {
  const { taskName, description, dueDate } = task;
  const handleActions = () => {
    setShowActions(!showActions);
    setTaskId(task._id);
  };
  return (
    <div className=" flex justify-between  p-5 drop-shadow-amber-950  shadow-2xl  rounded-lg bg-gray-100 mt-2 ">
      <div className="flex flex-col gap-2 text-sm text-[#000000] font-medium">
        <h1>{taskName}</h1>
        <h1>{description}</h1>
        <h1>{converDateFormat(dueDate)}</h1>
      </div>
      <div>
        <HiOutlineDotsVertical
          className="mt-1"
          onClick={() => handleActions()}
        />
      </div>
    </div>
  );
};
