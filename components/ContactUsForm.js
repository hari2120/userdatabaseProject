import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import getHeaders from '../libs/utils/getHeaders';

const ContactUsForm = () => {
  const [userData, setUserData] = useState({});
  const [inputValues, setinputValues] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    message: ''
  })
  console.log(inputValues);
  const router = useRouter()
  
  const accessToken = useSelector((accToken) => accToken.user);
  const headers = getHeaders(accessToken.accessToken);
  console.log('headers', headers);
  const callApiData = async() => {
    try{
      const res = fetch('http://localhost:8000/getdata',{
        method:"GET",
        headers: headers
    })
      const data = await (await res).json();
      console.log('data', data);
      setUserData({name: data.name, email: data.email, phone: data.phone});
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
    callApiData();
  }, [])
  // send data to backend...
  const submitDetails = async (event) => {
    event.preventDefault();
    console.log(event);
    const name = event.target.name.value; // accessing directly
    const email = event.target.email.value; // accessing directly
    const phone = event.target.phone.value;
    const message = event.target.message.value;

    const res = await fetch('http://localhost:8000/contact', {
      method: "POST",
      headers,
      body: JSON.stringify({name, email, phone, message})
    },
    )
    
    const data = await res.json();
    if(!data){
      console.log("message not sent");
    } else{
      alert("message sent successfully");
      setUserData({...userData, message: ""})
    }

  }
  return (
    <div className="container">
      <div className="contact3 py-5">
        <div className="row no-gutters">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="card-shadow">
                  <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/2.jpg" className="img-fluid"/>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-box ml-3">
                  <h1 className="font-weight-light mt-2">Quick Contact</h1>
                  <form className="mt-4" onSubmit={submitDetails}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <input className="form-control" type="text" name="name" defaultValue={userData.name} onChange={(e)=> setinputValues({...inputValues, name: e.target.value}) } placeholder="name"/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <input className="form-control" type="email" name="email" defaultValue={userData.email} onChange={(e)=> setinputValues({...inputValues, email: e.target.value}) } placeholder="email address"/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <input className="form-control" type="text" name="phone" onChange={(e)=> setinputValues({...inputValues, phone: e.target.value}) } defaultValue={userData.phone} placeholder="phone"/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <textarea className="form-control" rows="3" name="message" onChange={(e)=> setinputValues({...inputValues, message: e.target.value}) } placeholder="message"></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button type="submit" className="btn btn-primary mt-3 text-white border-0 px-3 py-2"><span> SUBMIT</span></button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card mt-4 border-0 mb-4">
                  <div className="row">
                    <div className="col-lg-4 col-md-4">
                      <div className="card-body d-flex align-items-center c-detail pl-0">
                        <div className="mr-3 align-self-center">
                          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png"/>
                        </div>
                        <div className="">
                          <h6 className="font-weight-medium">Address</h6>
                          <p className="">601 Sherwood Ave.
                            <br/> San Bernandino</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="card-body d-flex align-items-center c-detail">
                        <div className="mr-3 align-self-center">
                          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png"/>
                        </div>
                        <div className="">
                          <h6 className="font-weight-medium">Phone</h6>
                          <p className="">251 546 9442
                            <br/> 630 446 8851</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="card-body d-flex align-items-center c-detail">
                        <div className="mr-3 align-self-center">
                          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png"/>
                        </div>
                        <div className="">
                          <h6 className="font-weight-medium">Email</h6>
                          <p className="">
                            info@wrappixel.com
                            <br/> 123@wrappixel.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsForm
