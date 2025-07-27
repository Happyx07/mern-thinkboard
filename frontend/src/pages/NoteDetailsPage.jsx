import React, { useEffect } from 'react'
import { useParams, useNavigate,Link} from 'react-router'
import { toast } from 'react-hot-toast'
import api from '../lib/axios'
import { ArrowLeftIcon, LoaderIcon, Trash, Trash2Icon } from 'lucide-react'

const NoteDetailsPage = () => {

  const [note,setNote]  = React.useState(null)
  const [loading,setLoading] = React.useState(true)
  const [saving,setSaving] = React.useState(false)
  

  const navigate = useNavigate()

  const {id} = useParams()
  
  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
        
      } catch (error) {
        toast.error('Failed to fetch note')
        console.error('Error fetching note:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) return;
    
    try {

       await api.delete(`/notes/${id}`);
        
          toast.success('Note deleted successfully');
          navigate('/');
        }
         catch(error) {
          toast.error('Failed to delete note')
          console.error('Error deleting note:', error)
        }
    
  };
  const handleSave = () => {

    if (!note.title || !note.content) {
      toast.error('Please fill in all fields')
      return
    }
    setSaving(true)
    api.put(`/notes/${id}`, note)
      .then(() => {
        toast.success('Note updated successfully')
        navigate('/')
      })
      .catch((error) => {
        toast.error('Failed to update note')
        console.error('Error updating note:', error)
      })
      .finally(() => {
        setSaving(false)
      })

  };

  if (loading) {
    return(
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <LoaderIcon className="animate-spin size-10 text-primary" />
        </div>
    );
  }



  return (
    <div className='min-h-screen bg-base-200 '>
      <div className='container mx-auto p-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className='btn btn-ghost'>
              <ArrowLeftIcon className='text-primary size-5' />
            Back to Notes
          
            </Link>
            <button onClick={handleDelete} className='btn btn-error'>
              <Trash2Icon className=' size-5' />

              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-contro mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" 
                placeholder='Note title' 
                value={note.title} 
                className="input input-bordered w-full"
                 onChange={(e) => setNote({ ...note,title:e.target.value})} />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea 
                placeholder='Write your note here...' 
                value={note.content} 
                className="textarea textarea-bordered h-32"
                 onChange={(e) => setNote({ ...note,content: e.target.value})} />
                </div>

                <div className="card-actions justify-end ">
                  <button className='btn btn-primary' onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NoteDetailsPage
