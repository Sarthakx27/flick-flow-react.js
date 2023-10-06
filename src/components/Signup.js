import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from 'firebase/auth'
import app from '../firebase/firebase'
import swal from 'sweetalert'
import { addDoc } from 'firebase/firestore'
import { usersRef } from '../firebase/firebase'
import bcrypt from 'bcryptjs'

const auth = getAuth(app)
const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: ""
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
   const [OTP, setOTP] = useState("");

   const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  
  }

  const uploadData = async () => {
    try{
      const salt = bcrypt.genSaltSync(10)
      var hash = bcrypt.hashSync(form.password, salt)
      await addDoc(usersRef,{
        name: form.name,
        password: hash,
        mobile: form.mobile
      })
    } catch(err) {
      console.log(err);
    }
  }

  const verifyOTP = () => {
    try {
      setLoading(true)
      window.confirmationResult.confirm(OTP).then((result) => {
          uploadData()
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000
        })
        navigate('/login')
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const requestOtp = () => {
      setLoading(true);
      generateRecaptha();
      let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          swal({
            text: "OTP Sent",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setOtpSent(true);
          setLoading(false);
        }).catch((error) => {
          console.log(error)
        })
  }

  return (
    <div>

      <div class="container px-5 py-24 mx-auto flex justify-center flex-col items-center">
        {otpSent ? 
            <>
          <div class=" bg-white rounded-lg p-8 flex flex-col">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Sign Up</h2>
            <div class="relative mb-4">
              <label for="Mobile number" class="leading-7 text-sm text-gray-600">OTP</label>
              <input  
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                class="w-full bg-white rounded border border-gray-300
              focus:border-red-500  focus:ring-1  text-base outline-none text-gray-700 py-1 px-3 " />
            </div>
            <button 
            onClick={verifyOTP}
            class="text-white mx-24 bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 
                    rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : 'Confirm OTP'}</button>
          </div>
        </>
        :
        <>
          <div class=" bg-white rounded-lg p-8 flex flex-col">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Sign Up</h2>
            <div class="relative mb-4">
              <label for="Mobile number" class="leading-7 text-sm text-gray-600">Name</label>
              <input type="text"
                name="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                class="w-full bg-white rounded border border-gray-300
              focus:border-red-500  focus:ring-1  text-base outline-none text-gray-700 py-1 px-3 " />
            </div>
            <div class="relative mb-4">
              <label for="Mobile number" class="leading-7 text-sm text-gray-600">Mobile number</label>
              <input type="number"
                name="number"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                class="w-full bg-white rounded border border-gray-300
              focus:border-red-500  focus:ring-1  text-base outline-none text-gray-700 py-1 px-3 " />
            </div>
            <div class="relative mb-4">
              <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
              <input type="password"
                name="email"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                class="w-full bg-white rounded border border-gray-300
              focus:border-red-500  focus:ring-1  text-base outline-none text-gray-700 py-1 px-3 " />
            </div>
            <button onClick={requestOtp} class="text-white bg-red-500 border-0 py-2 mx-24 px-6 focus:outline-none hover:bg-red-700 
                    rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : 'Request OTP'}</button>
          </div>
        </>}
        <div className='flex flex-col mt-3 text-sm '>
          <p>Already have an acoount? <Link to={'/login'}><span className='text-blue-500'>Login</span></Link></p>
        </div>
      </div>
          <div id='recaptcha-container'></div>
    </div>
  )
}


export default Signup