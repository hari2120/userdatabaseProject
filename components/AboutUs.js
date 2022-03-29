import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import getHeaders from '../libs/utils/getHeaders';

const AboutUs = () => {
  const [userData, setUserData] = useState({});
  const router = useRouter()
  
  const accessToken = useSelector((accToken) => accToken.user);
  const headers = getHeaders(accessToken.accessToken);
  console.log('headers', headers);
  const callAboutPage = async() => {
    try{
      const res = fetch('http://localhost:8000/about',{
        method:"GET",
        headers: headers
    })
      const data = await (await res).json();
      console.log('data', data);
      if(!res.status === 200){
        const error = new Error(res.Error);
        throw error
      }

    }catch(err){
      console.log(err);
      router.push("/login")
    }
  }
  useEffect(() => {
    callAboutPage();
  }, [])
  return (
    <div>
      heyy About
    </div>
  )
}

export default AboutUs
