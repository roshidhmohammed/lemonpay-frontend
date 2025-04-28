import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { converDateFormat } from "../helpers/converDateFormat";

const ViewTasksRow = ({
  task,
  index,
  showActions,
  setShowActions,
  setTaskId,
}) => {
  const { taskName, description, dueDate, _id } = task;

  const handleActions = (id) => {
    setShowActions(!showActions);
    setTaskId(id);
  };

  return (
    <>
      <tr class="  shadow-2xl text-[#000000] text-lg    shadow-gray-200   ">
        <td className="px-6 py-5  ">{index}</td>
        <th scope="row" className="px-6 py-4 font-medium  ">
          {converDateFormat(dueDate)}
        </th>
        <td className="px-6 py-4">{taskName}</td>
        <td className="px-6 py-4">{description}</td>
        <td className="px-6 py-4">
          <HiOutlineDotsVertical
            className=" text-xl hover:cursor-pointer"
            onClick={() => handleActions(_id)}
          />
        </td>
      </tr>
    </>
  );
};

export default ViewTasksRow;
