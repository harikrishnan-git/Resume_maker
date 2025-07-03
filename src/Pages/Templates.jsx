
import Template3 from '../assets/Template3.jpg'
import Template2 from '../assets/Template2.jpg'
import Template1 from '../assets/Template1.jpg'
import { useNavigate } from 'react-router-dom'

export default function Templates() {
    const navigate = useNavigate();

    const convertImageToBase64 = (url, callback) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; 
        img.src = url;
        img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        

        const dataURL = canvas.toDataURL('image/jpeg'); // or "image/png"
        callback(dataURL);
        };
    }
    const handleClick = (imgUrl) => {
      convertImageToBase64(imgUrl, (base64Image) => {
      localStorage.setItem('selectedTemplate', base64Image);
      alert('Template image saved to localStorage!');
      navigate('/jd'); // Navigate to the desired page after saving
    });
    }
  return (
    <div className='flex rounded justify-center items-center gap-4 '>
    <button className='scale' onClick={()=>handleClick(Template1)}><img src={Template1} alt="template1" className='' /></button>
    <button className='scale' onClick={()=>handleClick(Template2)}><img src={Template2} alt="template2" /></button>
    <button className='scale' onClick={()=>handleClick(Template3)}><img src={Template3} alt="template3" /></button>
    
    </div>
  )
}
