import React from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axisoInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      enterTaskName: "",
      description: "",
      datePicker: null,
    },
  });
  const handleSave = async (data) => {
    const taskName = data.enterTaskName;
    const description = data.description;
    const date = data.datePicker;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userInfo")}`,
      },
    };
    await axisoInstance
      .post(
        "/api/user/add-task",
        { taskName: taskName, description: description, date: date },
        config
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Task created successfully");
          reset();
          navigate("/view-task");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="flex justify-center h-screen items-center flex-col my-auto">
      <h1 className="text-[#000000] font-bold text-3xl">Add Task</h1>

      <form
        onSubmit={handleSubmit(handleSave)}
        className="sm:w-[500px] w-[300px] mt-10"
      >
        <div>
          <input
            type="text"
            placeholder="Enter Task Name"
            {...register("enterTaskName", {
              required: "Task name is required.",
            })}
            className="p-2 px-5 my-2 h-16 w-full rounded-lg text-md font-normal bg-[#efefef]"
          />
          {errors.enterTaskName && (
            <p className="text-red-700 text-sm font-bold">
              {errors.enterTaskName.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Description"
            {...register("description", {
              required: "Description is required.",
            })}
            className="p-2 px-5 my-2 h-16 w-full rounded-lg text-md font-normal bg-[#efefef]"
          />
          {errors.description && (
            <p className="text-red-700 text-sm font-bold">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className=" w-full">
          <Controller
            control={control}
            className=" w-full"
            name="datePicker"
            rules={{ required: "Date and Time is required." }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={15}
                dateFormat="d/MM/yyyy hh:mm aa"
                minDate={new Date()}
                placeholderText="Select Date and Time"
                className="p-2 px-5 my-2 h-16 sm:w-[500px] w-[300px] rounded-lg bg-[#efefef]"
              />
            )}
          />
          {errors.datePicker && (
            <p className="text-red-700 text-sm font-bold">
              {errors.datePicker.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 justify-center items-center mt-5">
          <button
            type="submit"
            className="bg-[#1E3BA3] px-12 text-[#FFFFFF] p-4 rounded-full text-lg hover:cursor-pointer hover:bg-[#353e60f5]"
          >
            Save
          </button>
        </div>
      </form>
      <button
        onClick={() => handleCancel()}
        className="mt-3 px-10 text-[#000000] p-4 rounded-full text-lg hover:cursor-pointer hover:bg-[#bfc0c1f5]"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddTask;
