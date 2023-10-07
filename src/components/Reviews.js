import React, { useContext, useEffect, useState } from 'react'
import { Button, Rating, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { reviewsRef,db } from '../firebase/firebase';
import { InfinitySpin } from 'react-loader-spinner';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({id, prevRating, usersRated}) => {
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState("")
    const [data, setData] = useState([]);
    const [reviewsloading, setreviewsLoading] = useState(false)
    const useAppstate = useContext(Appstate)
    const navigate = useNavigate()
    const [newAdded, setNewAdded] = useState(0)
 
    const sendReview = async () => {
        
        setLoading(true)
        try{
                if (useAppstate.login) {
                await addDoc(reviewsRef,{
                    movieid: id,
                    name: useAppstate.userName,
                    rating: rating,
                    review: form,
                    timestamp: new Date().getTime()
                    
                })
                const ref = doc(db, "movies", id)  //for rating cal
                await updateDoc(ref, {
                    rating: prevRating + rating,
                    rated: usersRated + 1
                })
                setForm("")
                setRating(0)
                setNewAdded(newAdded + 1) //to update the reviews
                swal({
                    title: "Review Added",
                    icon: "success",
                    button: false,
                    timer: 3000
                })
            
            } else{
                navigate('/login')
            }
        }
             catch (error) {
            swal({
                title: error.message,
                icon: "error",
                button: false,
                timer: 3000
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        async function getData() {
            setreviewsLoading(true)
            setData([])             //this will refresh all the reviews without duplicating preivious reviews, it will simply clear the state first.
            let quer = query(reviewsRef, where('movieid', '==', id)) //find the reviews for a specific movie
            const querySnapshot = await getDocs(quer);               //all the reviews in querySnapshot 

            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })

            setreviewsLoading(false)
        }
        getData();
    },[newAdded])

  return (
    <div className='mt-4 w-full border-t-2 pb-3 '>
        <div className='mb-3 mt-3'> <Stack spacing={0}>
                    <Rating name="half-rating" 
                            defaultValue={0} 
                            precision={0.5} 
                            size='medium' 
                            emptyIcon={<StarIcon 
                            style={{ opacity: 1, color: "gray" }}/>}
                            value= {rating}
                            onChange={(event, newValue) => {
                                setRating(newValue)}}  // {(rate) => setRating(rate)}
                            />
                </Stack></div>
        <input 
            value={form}
            onChange={(e) => setForm(e.target.value)}
            placeholder='Enter your review...'
            className='w-full p-2 outline-none card mb-4'
        />
        
        <Button onClick={sendReview} color='error' variant='outlined'>
            {loading ? <InfinitySpin color='red' /> :"Sumbit"}</Button>

            {
                reviewsloading ? 
                <div className='mt-6 flex justify-center'><InfinitySpin color='red' /></div>
                :
                <div className='mt-5 p-2 '>
                    {data.map((e, i) => {
                        return(
                            <div key={i} className=' text-sm bg-neutral-900 p-2 rounded border m-2 border-red-600'>
                                <div className='flex items-center justify-between'>
                                    <p className=' text-red-500'>{e.name}</p>
                                    <p className='ml-2'>{new Date(e.timestamp).toLocaleString()}</p>
                                </div>
                                <Stack spacing={0}>
                                    <Rating name="half-rating" 
                                            defaultValue={e.rating} 
                                            precision={0.5} 
                                            size='small' 
                                            emptyIcon={<StarIcon 
                                            style={{ opacity: 1, color: "gray" }} fontSize='1'/> }
                                            readOnly
                                    />
                                </Stack>
                                <p>{e.review}</p>
                            </div>
                        )
                    })}
                </div>
            }
    </div>
  )
}

export default Reviews