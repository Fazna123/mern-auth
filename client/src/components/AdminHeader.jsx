import { Link, useNavigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import { signOut } from "../redux/admin/adminSlice";
import { useDispatch } from "react-redux";


function AdminHeader() {
  const dispatch = useDispatch();
  const {currentAdmin} = useSelector(state =>state.admin)
  const navigate = useNavigate();
  console.log(currentAdmin)
  const handleSignOut = async () => {
    try {
      await fetch('/api/admin/signout');
      dispatch(signOut())
      navigate('/admin-sign-in');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className='bg-slate-200'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
           <Link to='/admin-home'>
            <h1 className="font-bold">Redux Web</h1>
            </Link>
            <ul className="flex gap-4">
            <Link to='/admin-home'>
                <li>AdminHome</li>
                </Link>
               
                <Link to='/admin-home'>
                  {currentAdmin ? (
                    <img src={currentAdmin.profilePicture} alt="profile"
                    className="h-7 w-7 rounded-full object-cover"/>
                  ):(

                 
                <li>Sign In</li>
                )}
                </Link>
                {currentAdmin ?(
                <span onClick={handleSignOut} >Sign Out</span>
                ):(""  )}
            </ul>
        </div>
    </div>
  )
}

export default AdminHeader