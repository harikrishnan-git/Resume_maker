import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function HistoryDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [HistoryDetails,setHistoryDetails] = useState(null);
    useEffect(() => {
        const fetchHistoryDetails = async () => {
            const response = await fetch(`http://localhost:4000/api/history/${id}`);
            if (!response.ok) {
                throw new Error('Could not fetch history details');
            }
            const data = await response.json();
            setHistoryDetails(data);
        };
        fetchHistoryDetails();
    },[]);
    const getPdfBlobUrl = (pdfBuffer) => {
        const byteArray = new Uint8Array(pdfBuffer.data);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
    };

    if (!HistoryDetails || !HistoryDetails.resumePdf) {
    return <div className="text-white">Loading...</div>;
  }

   const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/historydelete/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete history');
      }

      navigate('/dashboard'); // Redirect to dashboard after deletion
      alert('History deleted successfully');
      
    } catch (error) {
      console.error('Error deleting history:', error);
    }
   }
    
  return (
   <div className='bg-black min-h-screen px-5 py-15'>
       <div className="text-white border border-zinc-600 p-4 rounded bg-zinc-900 ">
            <div className='flex mb-5'>
                <p className='text-xl'><strong> {HistoryDetails.companyName}</strong></p>
                <button className='ml-auto mr-5 rounded bg-white text-black font-bold w-[100px] hover:bg-gray-200' onClick={handleDelete}>Delete</button>
            </div>
            <div className='flex gap-5'>
                <p className='w-[700px]'>{HistoryDetails.jobDescription}</p>
                <div  className="rounded shadow-lg w-full max-w-[700px] h-[700px]">
                    <iframe
                        src={getPdfBlobUrl(HistoryDetails.resumePdf)}
                        width="700px"
                        height="700px"
                        className="rounded shadow-lg"
                    />
                </div>
            </div>
            <p className='text-sm text-gray-400 mt-2'>Created at: {new Date(HistoryDetails.createdAt).toLocaleDateString()}</p>
            
          </div>
        </div>
    
  )
}
