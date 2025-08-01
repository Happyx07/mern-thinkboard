import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import api from '../lib/axios'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchNotes = async () => {
      try{ 
      const res= await api.get('/notes')
      console.log(res.data)
      setNotes(res.data) ;
      setLoading(false);
      
    }catch (error) {
        console.error('Error fetching notes:', error);
        if (error.response.status === 429) {
          console.error('Too many requests. Please try again later.');
        }else{
          toast.error('Error fetching notes. Please try again later.');
        }

      }finally {
        setLoading(false);
      }
      
    }
    fetchNotes()
  }, []);



  return <div className='min-h-screen'>
    <Navbar/> 

    <div className='max-w-7xl mx-auto p-4 mt-6'>
      {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

    {notes.length === 0 && !loading && <NotesNotFound/>}
      
    

      {notes.length > 0 && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <NoteCard key={note._id} note={note} setNotes={setNotes} />
          
        ))}



      </div>
    )}
    </div>
    </div>
}

export default HomePage
