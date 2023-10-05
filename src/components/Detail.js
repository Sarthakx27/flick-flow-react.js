import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';
import { InfinitySpin } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { db, moviesRef } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Reviews from './Reviews';

const Detail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    Rating: 0,
    rated: 0
    })
  useEffect(() => {
    async function getData(){
      setLoading(true)
      const _doc = doc(db, "movies", id)
      const _data = await getDoc(_doc)
      setData(_data.data())
      setLoading(false)
    }
    getData()
  },[])
  return (
    <div className='p-4 mt-4 flex w-full flex-col md:flex-row items-center md:items-start justify-center'>
      { loading ? <div className='infinity'> <InfinitySpin color='red' /> </div> :
        <>
      <img className='h-96' src={data.image} />
      <div className='md:ml-4 ml-0 w-full md:w-1/2'>
        <h1 className='text-3xl font-bold text-red-500 mb-2'>{data.title}<span className='text-xl'>({data.year})</span> </h1>
        <Stack spacing={0}>
         <Rating name="half-rating" defaultValue={data.rating/data.rated} precision={0.5} size='small' readOnly emptyIcon={<StarIcon 
                            style={{ opacity: 1, color: "gray" }} fontSize='1' />}/>
        </Stack>
        <p className='mt-3 '>{data.description}</p>
        <Reviews id={id} prevRating={data.rating} usersRated={data.rated}/>

      </div>
        </>
      }
    </div>
  )
}

export default Detail