import { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import Header from '../components/Header';
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    if (error) {
      // Clear the error after 5 seconds
      const errorTimer = setTimeout(() => {
        setIsVisible(false);
        dispatch(signInFailure(null));
      }, 5000);

      // Cleanup the timer when the component unmounts or when a new error occurs
      return () => clearTimeout(errorTimer);
    }
  }, [error, dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div>  <Header/>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <Link to='/admin-sign-in'>
          <span className='text-blue-500'>Admin Sign In</span>
        </Link>
        <ToastContainer autoClose={2000}/>
        <p className={`text-red-700 mt-5 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {error ? toast(error.message) || 'Something went wrong!' : ''}
      </p>

    </div>
    </div>
  );
}


// import {Link, useNavigate} from 'react-router-dom'
// import { useState } from 'react';
// import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import OAuth from '../components/OAuth';
// import Header from '../components/Header';

// function SignIn() {
//   const [formData, setFormData] = useState({});
//   const {loading, error}=useSelector((state) => state.user);
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({...formData,[e.target.id]:e.target.value})
    
//   }
  
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try{
//       dispatch(signInStart());
//       const res = await fetch('/api/auth/signin',{
//         method:'POST',
//         headers:{
//           'Content-Type':'application/json',
  
//         },
//         body:JSON.stringify(formData)
//       });
//       const data = await res.json();
      
//       if(data.success === false){
//         dispatch(signInFailure(data));
//         return;
//       }
//       dispatch(signInSuccess(data));
//       navigate('/')
//     }catch(error){
//       dispatch(signInFailure(error))
//     }
    
//   }
//   return (
//     <div>

//     <Header />
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}> 
//         <input type='email' placeholder='Email' id='email' className="bg-slate-100 p-3 rounded-lg"  onChange={handleChange}/>
//         <input type='password' placeholder='Password' id='password' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
//         <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase 
//         hover:opacity-95 disabled:opacity-80">
//           {loading?'Loading...':'Sign In'}
//         </button>
//         <OAuth />
//       </form >
//       <div className="flex gap-5 mt-5">
//         <p>Dont have an account?</p>
//         <Link to='/sign-up'>
//           <span className="text-blue-500">Sign Up</span>
//         </Link>       
//       </div> 
//        <p className="text-red-700 mt-5">{ error ? error.message || 'Something went wrong': ''}</p>
//     </div>
//     </div>
//   )
// }

// export default SignIn