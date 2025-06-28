import React, { useEffect, useState } from 'react'

export default function UserHistory() {
    const userId = localStorage.getItem("userId");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/${userId}/history`); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHistory(data);
                console.log(data); 
            } catch (error) {
                console.error('Error fetching user history:', error);
            }
        };

        fetchUserHistory();
    }, []);

    const getPdfBlobUrl = (pdfBuffer) => {
    const byteArray = new Uint8Array(pdfBuffer.data);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  };
  const trimText = (text, wordLimit = 70) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};
  return (
    <div className="p-6 text-white">
      <ul className="space-y-4">
        {history.map((item, index) => (
          <li key={index} className="border border-zinc-600 p-4 rounded bg-zinc-900 ">
            <p className='text-xl mb-3'><strong> {item.companyName}</strong></p>
            <div className='flex gap-2'>
                <p className='w-[700px]'>{trimText(item.jobDescription)}</p>
                <div  className="overflow-hidden rounded shadow-lg w-full max-w-[500px] h-[300px]">
                    <iframe
                        src={getPdfBlobUrl(item.resumePdf)}
                        width="500px"
                        height="500px"
                        title={`Resume ${index + 1}`}
                        className="rounded shadow-lg"
                    />
                </div>
            </div>
            <p className='text-sm text-gray-400 mt-2'>Created at: {new Date(item.createdAt).toLocaleDateString()}</p>
            
          </li>
        ))}
      </ul>
    </div>
  )
}
