import React, { useContext } from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
  const useAppstate = useContext(Appstate)

  return (
    <div className='sticky top-0 z-10 text-3xl text-red-500 font-bold p-3 border-b-2 border-gray-500 flex justify-between items-center'
      style={{
        backgroundColor: 'rgb(15, 15, 15)'
      }}>
      <Link to={'/'}><span className='cursor-pointer'>FLick<span className='text-white' >FLow</span></span></Link>
      {useAppstate.login ?
        <Link to={'/addmovie'}><h1 className='text-lg text-white mr-2  flex items-center cursor-pointer'>
          <Button color='error'>
            <AddBoxOutlinedIcon className='mr-1 items-center' color='error' />
            <span className='text-white'> Add New</span>
          </Button></h1>
        </Link>
        :
        <Link to={'/login'}><h1 className='text-lg text-white mr-2  flex items-center cursor-pointer'>
          <Button color='error' variant='contained' >
            <span className='text-white font-bold'>Login</span>
          </Button></h1>
        </Link>
      }
    </div>
  )
}

export default Header