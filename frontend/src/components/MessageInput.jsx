import React from 'react'
import { Image, ImageIcon, Send, X } from 'lucide-react'
import { useState, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'


const MessageInput = () => {
    const [text, setText] = useState("")
    const [sending, setSending] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null); //to send our message of images
    const {sendMessage} = useChatStore();

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if (!file) return; 
        if(!file.type.startsWith("image/")){
            toast.error("Please select and image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = ()=>{
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const removeImage = ()=>{

        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";

    }

    const handleSendMessage = async(e)=>{
        e.preventDefault();
        if(!text.trim() && !imagePreview) return;
        
        setSending(true);

        try {
            await sendMessage({text:text.trim(), image: imagePreview})
            //clear form
            setText("");
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value  = "";
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Failed to send the message")
            
        }finally{
            setSending(false);
        }

    }

  return (
    <div className="px-4 py-3 border-t border-base-300 bg-base-100">
        {imagePreview && (
            <div className='mb-3 flex items-center gap-2'>
                <div className='relative'>
                    <img src={imagePreview} alt="Preview" className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />
                    <button onClick={removeImage} className=' absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center' type = "button">
                        <X className='size-3'/>
                    </button>
                </div>
            </div>
        )/* show the selected image preview with a cross button to remove this preview*/}
        <form onSubmit={handleSendMessage} className='flex items-center gap-2'>

            <input
            type="text"
            className='w-full input rounded-lg input-sm sm:input-mb outline-none focus:outline-none focus:ring-0'
            placeholder='Message..'
            value = {text}
            onChange={(e)=>setText(e.target.value)}
            />

            <input
             type="file"
             accept='image/*'
             className='hidden'
             ref = {fileInputRef}
             onChange={handleImageChange}
            />

            <button type='button' className={`hidden sm:flex btn btn-circle ${imagePreview?"text-emerald-500":"text-zinc-400"}`}
            onClick={()=>fileInputRef.current?.click()}// used to trigger the above hidden input of type file
            >
                <Image size = {20}/>
            </button>
            {!sending?(
                <button
                type='submit'
                className='btn btn-sm btn-circle'
                disabled={!text.trim() && !imagePreview}
            >
                <Send size = {20}/>
            </button>
            ):(<button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled
                    >
                    <span className="loading loading-spinner loading-xs"></span>
                    </button>
                )}
            

        </form>
    </div>
  )
}

export default MessageInput
