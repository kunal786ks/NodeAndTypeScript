import * as React from 'react';
import {useNavigate} from 'react-router-dom'
export interface IHomePageProps {
}

export default function HomePage (props: IHomePageProps) {
    const navigate=useNavigate()
    const HandleLogout=()=>{
        localStorage.removeItem('auth-token');
        navigate('/login')
    }
    const bData = JSON.parse(localStorage.getItem('auth-token') || "{}")
  return (
    <div>
      <h1>Home Page</h1>
      <p>name: { bData?.user?.name || bData?.newUser?.name}</p>
      <p>email: { bData?.user?.email || bData?.newUser?.email}</p>
      <button onClick={HandleLogout}>Logout</button>
    </div>
  );
}
