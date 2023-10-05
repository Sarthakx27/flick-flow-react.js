import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    return (
        <div className=' text-white '>

            <div class="container px-5 py-24 mx-auto flex justify-center items-center">
                <div class=" bg-white rounded-lg p-8 flex flex-col">
                    <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Login</h2>
                    <div class="relative mb-4">
                        <label for="Mobile number" class="leading-7 text-sm text-gray-600">Mobile number</label>
                        <input type="number" 
                        name="email" 
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    <button class="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 
                    rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : 'Login'}</button>
                </div>
            </div>

        </div>
    )
}

export default Login