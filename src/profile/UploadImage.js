import React, {useRef, useState, useEffect} from 'react';
import userIcon from "../assets/user1.png";
import "./ProfileForm.css"

export default function UploadImage() {
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const fileInputRef = useRef();

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            console.log("IMAGE", image)
            reader.onloadend = () => {
                setPreview(reader.result)
               
            }
            reader.readAsDataURL(image)
        } else {
            setPreview(null);
        }
    },[image])
   

    return (
        <div>
           <form>
               <div className='uploadImg'>
               <img src={preview ? preview : userIcon} className='rounded-circle mt-4' style={{maxWidth:'300px', maxHeight:'300px'}} alt="profile icon" />
               <button 
                    className='changeImgBtn'
                    onClick={(event) => {
                        event.preventDefault();
                        fileInputRef.current.click(); 
                    }}
               >
                  Choose profile Image 
               </button>
                <input 
                    type="file"
                    ref={fileInputRef}
                    style={{display:"none"}}
                    accept='image/*'
                    onChange={(event) => {
                        const file = event.target.files[0];
                        if(file && file.type.substring(0, 5) === "image") {
                            setImage(file);
                        } else {
                            setImage(null);
                        }
                    }}
                /> 
               </div>
               
           </form> 
        </div>
    )
}
