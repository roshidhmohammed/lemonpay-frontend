import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import LoginPage from './LoginPage'
import LoginSignupPageParent from './LoginSignupPageContainer'


const Pages = () => {
    const pageRouter = createBrowserRouter([
        {
            path:"/",
            element:<LoginSignupPageParent/>
        },
        // {
        //     path:"/signup",
        //     element:<SignUpPage/>
        // },
        // {
        //     path:"/view-task",
        //     element:<ViewTask/>
        // },
        // {
        //     path:"/add-task",
        //     element:<AddTask/>
        // },
        // {
        //     path:"/edit-task",
        //     element:<EditTask/>
        // }
    ])
    
  return (
   <div >
     <RouterProvider router={pageRouter}/>
   </div>
  )
}

export default Pages