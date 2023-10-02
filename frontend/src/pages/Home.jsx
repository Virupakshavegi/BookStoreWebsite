import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Spinner } from '../Components/spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import { BookCard } from '../Components/Home/BookCard';
import { BookTable } from '../Components/Home/BookTable';



export const Home = () => {
  const [books,setBooks]=useState([]);
  const [loading,setLoading]=useState(false);
  const[showtype,setShowType]=useState('table')
  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:5555/books')
    .then((response)=>{
      setBooks(response.data.data)
      setLoading(false)
    })
    
    .catch((error)=>{
      console.log(error);
    })
  },[]);
  return (
    <div className='p-4'>
      <div className='flex justify-center gap-x-4'>
        <button className='bg-sky-400 hover:bg-sky-700 px-4 py-1 rounded-lg' onClick={()=>setShowType('table')}>Table</button>

        <button className='bg-sky-400 hover:bg-sky-700 px-4 py-1 rounded-lg' onClick={()=>setShowType('card')}>Card</button>
        
        
      </div>
      <div className=''></div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books list</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
      {loading?(
        <Spinner/>
      ):(showtype=='table'?
        (<BookTable books={books}/>):(<BookCard books={books}/>)
      )}
    </div>
  )
}
