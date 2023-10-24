import {ReactNode} from 'react'
// import React, {  useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import BellIcon  from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon  from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'


function Header(){

    // // Opening right sidebar for notification
    // const openNotification = () => {
    //     dispatch(openRightDrawer({header : "Notifications", bodyType : RIGHT_DRAWER_TYPES.NOTIFICATION}))
    // }


    // function logoutUser(){
    //     localStorage.clear();
    //     window.location.href = '/'
    // }

    return(
        <>
            <div className="navbar  flex justify-between z-10 shadow-md ">


                {/* Menu toogle for mobile view or small screen */}
                <div className="">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                    <Bars3Icon className="h-5 inline-block w-5"/></label>
                    <h1 className="text-2xl font-semibold ml-2">Title</h1>
                </div>

                

            <div className="order-last">

                {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}
                
                {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}


            {/* Light and dark theme selection toogle **/}
            <label className="swap ">
                <input type="checkbox"/>
                <SunIcon />
                <MoonIcon  />
            </label>


                {/* Notification icon */}
                <button className="btn btn-ghost ml-4  btn-circle" >
                    <div className="indicator">
                        <BellIcon className="h-6 w-6"/>

                    </div>
                </button>


                {/* Profile icon, opening menu on click */}
                <div className="dropdown dropdown-end ml-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        {/* <img src="https://placeimg.com/80/80/people" alt="profile" /> */}
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="justify-between">
                     
                            Profile Settings
                            <span className="badge">New</span>
                            
                        </li>
                        <li className=''>Bill History</li>
                        <div className="divider mt-0 mb-0"></div>
                     
                    </ul>
                </div>
            </div>
            </div>

        </>
    )
}

export default Header