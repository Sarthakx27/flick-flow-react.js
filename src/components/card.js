import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';
import { InfinitySpin } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore'; 
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Card = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const _data = await getDocs(moviesRef)
            _data.forEach((doc) => {
                setData((prv) => [...prv,{...(doc.data()),id: doc.id}])
            })
            
            setLoading(false)
        }
        getData()
    }, [])  

    return (
        <div className='flex flex-wrap p-3 mt-2 justify-between'>
            {loading ? <div className='infinity'> <InfinitySpin color='red' /> </div>:
            data.map((e,i) => {
            return(
                <Link to={`/Detail/${e.id}`}><div key={i} className='card shadow-lg p-2 font-semibold text-sm hover:-translate-y-2 cursor-pointer mt-5 transition-all duration-500 w-50'>
                <img className='h-60 md:h-96 md:min-w-30 md:max-w-30' src={e.image} 
                    ></img>
                <h1 className='flex flex-col md:block flex-none mt-1 '>{e.title}</h1>
                <h1 className='flex items-center mt-1 mb-1'><span className='text-red-500 pr-2'>Rating :</span><Stack spacing={0}>
                    <Rating name="half-rating" defaultValue={e.rating/e.rated} precision={0.5} size='small' readOnly emptyIcon={<StarIcon 
                            style={{ opacity: 1, color: "gray" }} fontSize='2' />}
                     />
                </Stack></h1>
                <h1><span className='text-red-500 pr-2'>Year :</span> {e.year}</h1>
            </div></Link>
            )
        })
        }
        </div>
    )
}

export default Card