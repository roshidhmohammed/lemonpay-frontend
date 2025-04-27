import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axisoInstance } from "../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm({
    defaultValues: {
      enterTaskName: "",
      description: "",
      datePicker: null,
    },
  });

  const fetchTask = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userInfo")}`,
      },
    };

    await axisoInstance
      .get(`/api/user/single-task/${id}`, config)
      .then((res) => {
        const fetchedTask = res.data.task;
        reset({
          enterTaskName: fetchedTask.taskName,
          description: fetchedTask.description,
          datePicker: new Date(fetchedTask.dueDate),
        });
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to fetch the tasks"
        );
      });
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleEdit = async (data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`,
        },
      };

      const payload = {
        taskName: data.enterTaskName,
        description: data.description,
        dueDate: data.datePicker,
      };

      await axisoInstance
        .put(`/api/user/edit-task/${id}`, payload, config)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/view-task");
        });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update the task");
    }
  };

  return (
    <div className="flex justify-center h-screen items-center flex-col my-auto">
      <h1 className="text-[#000000] font-bold text-3xl">Edit Task</h1>

      <form
        onSubmit={handleSubmit(handleEdit)}
        className="sm:w-[500px] w-[350px] mt-10"
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
                className="p-2 px-5 my-2 h-16 sm:w-[500px] w-[350px] rounded-lg bg-[#efefef]"
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
            disabled={!isDirty}
            className="bg-[#1E3BA3] px-12 text-[#FFFFFF] p-4 rounded-full text-lg hover:cursor-pointer hover:bg-[#353e60f5]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
