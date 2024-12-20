import React, {useState} from 'react'
import { IoClose } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Darkmode from './Darkmode';
import { useSelector } from 'react-redux';


const Navbar = () => {

  const {currentUser} = useSelector((state) => state.user)

  const headerLink = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "About",
      link: "/about",
    },
  ];

  let [open, setOpen] = useState(false);

  return (
    <>
      <div className=" w-full bg-white fixed top-0 left-0 shadow-md z-50 dark:bg-gray-950 ">
        <div className=" bg-white dark:bg-gray-950 text-black dark:text-white flex justify-between items-center md:px-10 px-7 py-4 md:py-0 relative h-16 ">
          <div className=" flex items-center ">
            <p className=' text-black text-2xl font-bold dark:text-white '>Auth</p>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className=" absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer w-7 h-7 text-xl flex items-center md:hidden  "
          >
            {open ? <IoClose /> : <MdMenu />}
          </div>

          <ul
            className={` md:flex md:justify-center md:items-center md:pb-0 pb-8 md:gap-14 md:z-auto  absolute md:static z-[-1] w-full left-0 text-center transition-all duration-300 ease-in-out ${
              open
                ? "top-12 bg-white shadow-md md:shadow-none dark:bg-gray-950 dark:text-white "
                : "top-[-230px]"
            } `}
          >
            {headerLink.map((data) => (
              <li key={data.id} className=" my-7 md:my-0 ">
                <Link className=" text-lg hover:font-semibold text-black dark:text-white " to={data.link}>
                  {" "}
                  {data.name}
                </Link>
              </li>
            ))}

            {/* <div className=' flex justify-center flex-col sm:flex-row gap-5 mx-32 sm:mx-0 '> */}
            {/* <Link className=' text-black'
               to='/profile'   >
                  {
                    currentUser ? (
                      <img src={currentUser.profilePic} alt="Profile" className='w-7 h-7 rounded-full object-cover' />
                    ) : (
                      SignIn
                    )
                  }
            </Link> */}

            <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <p className='text-black'>
                Sign In
              </p>
            )}
          </Link>
            {/* <Link className=' text-green-600 bg-transparent border border-green-600 hover:bg-green-600 hover:text-white font-medium rounded-3xl text-base px-5 py-1.5 dark:bg-none dark:hover:bg-green-600 active:scale-95 transition-all duration-300 '
               to='/signup'  >
                  Join now
            </Link> */}

            {/* </div> */}

          </ul>

          <div className=" flex md:space-x-4 space-x-0 items-center ">
            <form action="" className=" bg-transparent px-4 py-1.5 flex items-center rounded-xl w-28 md:w-60 mr-12 md:mr-0 border border-gray-400 ">
              <input type="text" placeholder='Search ...' className=' bg-transparent focus:outline-none overflow-hidden text-black dark:text-white ' />
              <IoSearchOutline className=' text-xl text-gray-400 '  />
            </form>
            <div className=' px-1 '>
            <Darkmode/>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar