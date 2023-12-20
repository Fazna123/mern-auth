import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminHeader from "../components/AdminHeader";

function AdminHome() {
 
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
  
    username: "",
    email: "",
  });
  const [AddFormData, setAddFormData] = useState({
    
    username: "",
    email: "",
  });
  const [filtered, setFiltered] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState();
  const [addloading, setAddLoading] = useState();
  const [errors, setErrors] = useState();

  
  const handleEditSubmit = (e) => {
    e.preventDefault();

    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    }
    if (formData.username.trim().length < 3) {
      toast.error("Enter a valid name");
    } else if (!isValidEmail(formData.email)) {
      toast.error("Enter a valid email");
    } else {
      setLoading(true);
      try {
        axios
          .patch(`/api/admin/admin-updateUser`, formData)
          .then((res) => {
            setLoading(false);
            setErrors(false);
            res.data.updatedUsers
              ? setUsers([...res.data.updatedUsers])
              : toast.error("Failed to update user");
            setFormData({
            
              username: "",
              email: "",
            });
          })
          .catch((err) => {
            setLoading(false);
            setErrors(err.response.data.message);
            toast.error(errors);
          });
      } catch (error) {
        setLoading(false);
        setErrors(error.message);
        toast.error(errors);
      }
    }
  };
  const handleAddSubmit = (e) => {
    e.preventDefault();

    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    }
    if (AddFormData.username.trim().length < 3) {
      toast.error("Enter a valid name");
    } else if (!isValidEmail(AddFormData.email)) {
      toast.error("Enter a valid email");
    } else {
      setAddLoading(true);
      try {
        axios
          .post(`/api/admin/admin-addUser`, AddFormData)
          .then((res) => {
            toast.success("User added successfully");
            setAddLoading(false);
            setErrors(false);
          res.data.allUsers
              ? setUsers([...res.data.allUsers])
              : toast.error("Failed to update user");
              setAddFormData({
              username:  "",
              email:"",
            })
          })
          .catch((err) => {
            setAddLoading(false);
            setErrors(err.response.data.message);
            toast.error(errors);
          });
      } catch (error) {
        setAddLoading(false);
        setErrors(error.message);
        toast.error(errors);
      }
    }
  };

  const handleUserDelete = (email) => {
    console.log(email);
    axios
      .delete(`/api/admin/deleteUser/${email}`)
      .then((res) => {
        if (res.data.updatedUsers) {
          setUsers([...res.data.updatedUsers]);
          toast.success("User deleted successfully");
        } else {
          toast.error("Failed to delete user");
        }
      })
      .catch((err) => {
        setErrors(err.response.data.message);
        toast.error(errors);
      });
  };
  
  const handleFiltering = () => {
    try {
      const filteredRegex = new RegExp(filtered, "i");
      const filteredUsers = [];

      for (const user of users) {
        if (filteredRegex.test(user.username)) {
          filteredUsers.push(user);
        }
      }

      setFilteredUsers(filteredUsers);
      console.log(filteredUsers, "Filtered and......");
    } catch (error) {
      setErrors(error);
      toast.error(errors);
    }
  };
  
  useEffect(() => {
    fetch("/api/admin/admin-home", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers([...data.usersDetails]);
        console.log(data)
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [formData,AddFormData]);
  
  useEffect(() => {
    // Log the updated state
    console.log(users);
  }, [users]);
  
  return (
    <div>
      <AdminHeader /> 
    <div className="h-screen text-black">
    <ToastContainer autoClose={2000}/>
      <div className="text-center text-black ">
        <h1 className="text-4xl font-bold m-2 underline underline-offset-4 p-5">
          Admin DashBoard
        </h1>
        <h3 className="text-2xl  font-semibold p-3">Users Management</h3>
      </div>
      <div className="flex justify-center p-5">
        <div className="flex items-center">
          <div className="flex border border-purple-200 rounded">
            <input
              type="text"
              className="block w-full px-4 py-2 text-grey-700 bg-slate-600 border rounded-md focus:border-grey-400 focus:ring-grey-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              value={filtered}
              onChange={(e) => setFiltered(e.target.value)}
            />
            <button
              onClick={handleFiltering}
              className="px-4 text-white bg-slate-900 border-l rounded "
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center row-auto">
        <div className=" flex justify-center items-center">
        <div className="h-[550px] overflow-y-scroll border rounded-lg">
  <table className="table-fixed border-separate border border-gray-400">
    <thead>
      <tr className="text-white text-xl h-[40px] sticky top-0 bg-zinc-800">
        <th colSpan={2} className="border-4 border-slate-600 md:w-[380px]">
          Username
        </th>
        <th className="border-4 border-slate-600 text-white md:w-[380px]">Email</th>
        <th className="border-4 border-slate-600 text-white md:w-[380px]">Delete User</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers.length ? (
        filteredUsers.map((user) => (
          <tr key={user._id} className="self-center">
            <td className="border border-r-0 border-slate-600"></td>
                          <td className="border border-l-0 border-slate-600">
                            <div className="flex items-center gap-2 p-2">
                              <img
                                src={user.profilePicture}
                                alt=""
                                className="h-10 w-10 rounded-[50%]"
                              />
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td className="border border-slate-600">
                            {user.email}
                          </td>
                          <td className="border border-slate-600 md:w-[380px]">
                            
                          <button
  className="px-40 text-white bg-gray-900 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
  onClick={() => handleUserDelete && handleUserDelete(user.email)}
>
  Delete
</button>

                           </td>
                         
                          <td className=" flex justify-end ">
                            <span className="flex ">
                              <MdDeleteOutline
                                size={35}
                                color="white"
                                className="hover:cursor-pointer"
                                onClick={() => handleUserDelete(user._id)}
                              />{" "}
                              <MdEdit
                                size={35}
                                color="white"
                                className="hover:cursor-pointer"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    _id: user._id,
                                    username: user.username,
                                    email: user.email,
                                  })
                                }
                              />{" "}
                            </span>
                          </td>
          </tr>
        ))
      ) : (
        users.map((user) => (
          <tr key={user._id} className="text-black">
             <td className="border border-r-0 border-slate-600"></td>
                          <td className="border border-l-0 border-slate-600">
                            <div className="flex items-center gap-2 p-2">
                              <img
                                src={user.profilePicture}
                                alt=""
                                className="h-10 w-10 rounded-[50%]"
                              />
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td className="border border-slate-600">
                            {user.email}
                          </td>
                          <td className="border border-slate-600 md:w-[380px]">
                            
                          <button
  className="px-40 self-center bg-gray-900 text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
  onClick={() => handleUserDelete && handleUserDelete(user.email)}
>
  Delete
</button>

                           </td>
                          <td className=" flex justify-end ">
                            <span className="flex ">
                              <MdDeleteOutline
                                size={35}
                                color="white"
                                className="hover:cursor-pointer"
                                onClick={() => handleUserDelete(user._id)}
                              />{" "}
                              <MdEdit
                                size={35}
                                color="white"
                                className="hover:cursor-pointer"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    _id: user._id,
                                    username: user.username,
                                    email: user.email,
                                  })
                                }
                              />{" "}
                            </span>
                          </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

        </div>
        <div className="flex justify-center w-72">
          <div className="border h-fit p-5 mb-12 md:mb-0 md:w-8/12 lg:w-5/6 xl:w-5/6">
            <p className="font-semibold text-center underline">
              Update User Name
            </p>
            <form onSubmit={handleEditSubmit} encType="multipart/form-data">

            <label htmlFor="email">Email</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

             

              <div className="text-center flex justify-center p-5 lg:text-left">
                <button id="updateUser"
                  type="submit"
                  className="px-40 bg-gray-900 text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Update User"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center w-72">
          <div className="border h-fit p-5 mb-12 md:mb-0 md:w-8/12 lg:w-5/6 xl:w-5/6">
            <p className="font-semibold text-center underline">
              Add User 
            </p>
            <form onSubmit={handleAddSubmit} encType="multipart/form-data">
            <label htmlFor="username">Username</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                value={AddFormData.username}
                onChange={(e) =>
                  setAddFormData({ ...AddFormData, username: e.target.value })
                }
              />
            <label htmlFor="email">Email</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                value={AddFormData.email}
                onChange={(e) =>
                  setAddFormData({ ...AddFormData, email: e.target.value })
                }
              />
              

             

              <div className="text-center flex justify-center p-5 lg:text-left">
                <button id="addUser"
                  type="submit"
                  className="px-40 bg-gray-900 text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  disabled={addloading}
                  >
                    {addloading ? "Loading..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  );
}

export default AdminHome;