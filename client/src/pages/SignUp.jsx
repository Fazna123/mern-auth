import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      
      if (formData.username.trim().length < 3) {
        toast.error("Enter a valid name");
      
      } else {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div>
      <Header/>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <ToastContainer autoClose={2000}/>
      <p className='text-red-700 mt-5'>{toast.error ? error: ''}</p>
    </div>
    </div>
  );
}




// import {Link, useNavigate} from 'react-router-dom'
// import { useState } from 'react';
// import OAuth from '../components/OAuth';
// import Header from '../components/Header';

// function SignUp() {
//   const [formData, setFormData] = useState({});
//   const [error,setError]=useState(false);
//   const [Loading,setLoading]= useState(false);
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({...formData,[e.target.id]:e.target.value})
    
//   }
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try{
//       setLoading(true);
//       setError(false)
//       const res = await fetch('/api/auth/signup',{
//         method:'POST',
//         headers:{
//           'Content-Type':'application/json',
  
//         },
//         body:JSON.stringify(formData)
//       });
//       const data = await res.json();
//       setLoading(false);
//       if(data.success === false){
//         setError(true)
//         return;
//       }
//       navigate('/')
//     }catch(error){
//       setLoading(false);
//       setError(true);
//     }
    
//   }
//   return (
//     <div>
//       <Header />
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}> 
//         <input type='text' placeholder='Username' id='username' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
//         <input type='email' placeholder='Email' id='email' className="bg-slate-100 p-3 rounded-lg"  onChange={handleChange}/>
//         <input type='password' placeholder='Password' id='password' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
//         <button disabled={Loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase 
//         hover:opacity-95 disabled:opacity-80">
//           {Loading?'Loading...':'Sign Up'}
//         </button>
//         <OAuth />
//       </form >
//       <div className="flex gap-5 mt-5">
//         <p>Have an account?</p>
//         <Link to='/sign-in'>
//           <span className="text-blue-500">Sign In</span>
//         </Link>       
//       </div> 
//        <p className="text-red-700 mt-5">{error && 'Something went wrong'}</p>
//     </div>
//     </div>
//   )
// }

// export default SignUp