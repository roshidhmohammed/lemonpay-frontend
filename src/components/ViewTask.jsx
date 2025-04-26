import React, { useEffect, useState } from 'react'
import { IoAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { axisoInstance } from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import ViewTasksRow from './ViewTasksRow';

const ViewTask = () => {
  const [allTasks, setAllTasks] = useState()
const navigate = useNavigate()

useEffect(()=>{
  fetchTasks()
},[])

const fetchTasks =async()=>{
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userInfo")}`,
    },
}

  await axisoInstance.get("/api/user/all-tasks",config)
  .then((res)=>{
    setAllTasks(res.data.tasks)
  })
  .catch((error)=>{
toast.error(error.response?.data?.message || 'Failed to fetch the tasks');
  })
}
  const addTask =()=>{
    navigate("/add-task")
  }

  console.log(allTasks)

  return (
    <div>
     
<h1 className=' mt-16 mb-10 ml-10 text-3xl text-[#1E3BA3] font-medium'>Task Management</h1>

<div className=' flex justify-end mr-10 mb-10'>
  <button className=' p-5 px-8 rounded-full bg-[#1E3BA3] text-[#ffffff] flex items-center gap-2' 
  onClick={()=>addTask()}>
    <IoAddSharp className='text-[#ffffff]  text-2xl font-bold'/>
    Add Task
  </button>
</div>

<div className="relative overflow-x-auto mx-10">
    <table className="w-full text-sm text-left rtl:text-right ">
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
        <tbody className=''>
          {allTasks?.map((task, index) => (

            <ViewTasksRow key={task?._id} task={task} index={index+1}/>
          ))}
          
        </tbody>
    </table>
</div>

    </div>
  )
}

export default ViewTask
