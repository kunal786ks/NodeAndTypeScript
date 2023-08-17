import * as React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {NavLink, useNavigate} from 'react-router-dom';

interface ISignUpProps {
}

const SignUp: React.FunctionComponent<ISignUpProps> = (props) => {
    const [name,setName]=useState<string>()
    const [email,setEmail]=useState<string>()
    const [password,setPassword]=useState<string>()
    const [phone,setPhone]=useState<number>()
    const [address,setAddress]=useState<string>()
    const navigate=useNavigate();
    type CreateUserRes={
        name:string,
        email:string,
        password:string,
        phone:number,
        address:string
    }
    const addUser=async()=>{
        try{
            const {data}=await axios.post<CreateUserRes>('http://localhost:4000/user/adduser',{
                name,
                email,
                password,
                phone,
                address
            })
            console.log(data);
            localStorage.setItem('auth-token',JSON.stringify(data));
        }catch(err){
            console.log(err);
        }
    }
    const handleclick=()=>{
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(phone)
        console.log(address)
        addUser();
        navigate('/')
    }
   
  return <div style={{textAlign:'center'}}>
    <h1>welcome to signup</h1>
    <form style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        <input type='text' placeholder='enter you Name' onChange={(e)=>setName(e.target.value)}/>
        <input type='email' placeholder='enter you email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='enter you password' onChange={(e)=>setPassword(e.target.value)}/>
        <input type='number' placeholder='enter you phone' onChange={(e)=>setPhone(parseInt(e.target.value))}/>
        <input type='text' placeholder='enter you address' onChange={(e)=>setAddress(e.target.value)}/>
    </form>
    <button onClick={handleclick}>Submit</button>
    <NavLink to='/login'>Already a User ? Login</NavLink>
  </div>;
};

export default SignUp;
