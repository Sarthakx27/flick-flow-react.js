import React, { useContext } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { query, where, getDocs } from 'firebase/firestore'
import { usersRef } from '../firebase/firebase'
import swal from 'sweetalert'
import bcrypt from 'bcryptjs'
import { Appstate } from "../App"

const Login = () => {
    const navigate = useNavigate()
    const useAppstate = useContext(Appstate)
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const login = async () => {
        setLoading(true)
        try {
            const quer = query(usersRef, where('mobile', '==', form.mobile))
            const querySnapshot = await getDocs(quer)

            querySnapshot.forEach((doc) => {
                const _data = doc.data()
                const isUser = bcrypt.compareSync(form.password, _data.password)
                console.log(form.password)
                console.log(_data.password)

                if (isUser) {
                    useAppstate.setLogin(true)
                    useAppstate.setUserName(_data.name)

                    swal({
                        title: "Logged In",
                        icon: "success",
                        button: false,
                        timer: 1500
                    })
                    navigate('/')
                } else {
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        button: false,
                        timer: 1500
                    })
                }
            })

        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                button: false,
                timer: 3000
            })
        }
        setLoading(false)
    }
    return (
        <div className=' text-white '>

            <div class="container px-5 py-24 mx-auto flex justify-center flex-col items-center">
                <div class=" bg-white rounded-lg p-8 flex flex-col">
                    <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Login</h2>
                    <div class="relative mb-4">
                        <label for="Mobile number" class="leading-7 text-sm text-gray-600">Mobile number</label>
                        <input type="number"
                            name="email"
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
                    <button
                        onClick={login}
                        class="text-white bg-red-500 border-0 mx-24 py-2 px-6 focus:outline-none hover:bg-red-700 
                    rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : 'Login'}</button>
                </div>
                <div className='flex flex-col mt-3 text-sm '>
                    <p>Do not have acoount? <Link to={'/signup'}><span className='text-blue-500'>Sign Up</span></Link></p>
                </div>
            </div>

        </div>
    )
}

export default Login