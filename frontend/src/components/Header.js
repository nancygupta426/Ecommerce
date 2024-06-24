import React, { useContext, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {
  const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch()
    const [menuDisplay,setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()

    const handleLogout = async() => {
      const fetchData = await fetch(SummaryApi.logout_user.url,{
        method : SummaryApi.logout_user.method,
        credentials : 'include'
      })
     

      const data = await fetchData.json()

      if(data.success){
        toast.success(data.message)
        dispatch(setUserDetails(null))
        navigate("/")
      }

      if(data.error){
        toast.error(data.message)
      }

    }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
       
        <div className="bg-red-500 p-3 text-white text-3xl rounded-sm">
        <Link to={"/"}>
           Find the Best Electronics Items at One Place :- TechCenter
           </Link>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {
              user?._id && (
              <div className="text-3xl cursor-pointer relative flex justify-center" onClick={()=>setMenuDisplay(preve => !preve)}>
                <FaRegCircleUser />
              </div>
              )
            }

            {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                        <nav>
                          {
                            user?.role === ROLE.ADMIN && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                            )
                          }
                         
                        </nav>
                      </div>
                    )
                  }
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
