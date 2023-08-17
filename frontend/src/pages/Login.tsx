import * as React from 'react';
import {useState} from 'react';
import axios from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'
interface ILoginProps {
}

const Login: React.FC<ILoginProps> = (props) => {
    const [email,setEmail]=useState<string>()
    const [password,setPassword]=useState<string>()
    const navigate=useNavigate();
    type CreateRes={
        email:string,
        password:string
    }
    const login=async()=>{
        try{
            const {data}=await axios.post<CreateRes>('http://localhost:4000/auth/login',{
                email,
                password
            })
            console.log("jwt",data);      
            localStorage.setItem('auth-token',JSON.stringify(data))
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }
    const handleLogin=()=>{
        console.log(email)
        console.log(password)
        login()
    }
  return <div style={{textAlign:'center'}}>
    <h1>Welcome to Login Page</h1>
    <form style={{display:'flex',flexDirection:'column'}}>
        <input type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
        
    </form>
    <button onClick={handleLogin}>Submit</button>
    <NavLink to='/signup'>Register Here</NavLink>
  </div>;
};

export default Login;
