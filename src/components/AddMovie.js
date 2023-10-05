import React from 'react'
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { addDoc } from "firebase/firestore"
import { moviesRef } from '../firebase/firebase'
import swal from 'sweetalert'

const AddMovie = () => {
    const [form, setForm] = useState({
        title: "",
        year: "",
        description: "",
        image: "",
        rating: 0,
        rated: 0
    })
    const [loading, setLoading] = useState(false);
    const addMovie = async () => {
        setLoading(true)
        await addDoc(moviesRef, form)
        swal({
            title: "Successfully Added",
            icon: "success",
            button: false,
            timer: "3000"
        })
        setForm({
            title: "",
            year: "",
            description: "",
            image: ""
        })
        setLoading(false)
    }

    return (
        <div>
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-8 mx-auto">
                    <div class="flex flex-col text-center w-full mb-4">
                        <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-red-500">Add Movie</h1>
                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-white">Title</label>
                                    <input type="text"
                                        id="name"
                                        name="name"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        class="w-full bg-gray-100 rounded border border-red-500  focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="email"
                                        class="leading-7 text-sm text-white">Year</label>
                                    <input type="email"
                                        id="email"
                                        name="email"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                                        class="w-full bg-white rounded border border-red-500 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message"
                                        class="leading-7 text-sm text-white">Image Link</label>
                                    <input id="message"
                                        name="message"
                                        value={form.image}
                                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                                        class="w-full bg-white rounded border border-red-500 focus:border-red-500
                                         focus:bg-white focus:ring-2 focus:ring-red-500 h-11 text-base outline-none
                                          text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message"
                                        class="leading-7 text-sm text-white">Description</label>
                                    <textarea id="message"
                                        name="message"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        class="w-full bg-white rounded border border-red-500 focus:border-red-500
                                         focus:bg-white focus:ring-2 focus:ring-red-500 h-32 text-base outline-none
                                          text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={addMovie} class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 
                                    focus:outline-none hover:bg-red-600 rounded text-lg">
                                    {loading ? <TailSpin height={25} color='white' /> : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddMovie