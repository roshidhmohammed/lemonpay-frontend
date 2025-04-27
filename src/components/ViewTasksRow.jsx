import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const ViewTasksRow = ({
  task,
  index,
  showActions,
  setShowActions,
  setTaskId,
}) => {
  const { taskName, description, dueDate, _id } = task;

  const converDateFormat = (ISODate) => {
    const isoDate = ISODate;

    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  };

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
