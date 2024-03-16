"use client"
import React, { useRef, useState } from 'react'
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
const category = [
    "Avalanche","Black and Bleu","Crunchy spice","Night bite","angry nacho","Breakfast"
]
const CreateProduct = () => {

    const ref = useRef()
    const[name,setName]= useState("")
    const[price,setPrice]=useState(0)
    const[desc,setDesc]=useState("")
    const[ ingridient,setIngridient]=useState("")
    const[isFeatured,setIsFeatured]=useState(false)
  const [cat,setCat]=useState("")
    const[image,setImage]=useState('')


    const handleImageUpload=(result)=>{
const info = result.info
if("secure_url" in info && "public_id" in info){
    const url = info.secure_url
    const public_id = info.public_id
    setImage(url)
  
}
    }

    const handleCreateProduct = async(e)=>{
        e.preventDefault()
        if(!name || !image || !cat|| !ingridient || !desc || !price || !isFeatured){
            return
        }
        try {
            const res = await fetch(`http://localhost:3000/api/products`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                  },
                body:JSON.stringify({name,image,cat,ingridient,desc,price:parseInt(price),isFeatured})
            })

          ref.current.reset()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <div className=" px-6 py-4 md:px-12 lg:px-40">
            <form ref={ref} onSubmit={handleCreateProduct} action="max-w-sm mx-auto my-5">
                <div className="my-5">
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="">Name of product</label>
                    <input onChange={(e)=>setName(e.target.value)} className='bg-gray-50 outline-slate-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" placeholder='Name of product'/>
                </div>
                <div className="my-5">
                    <label className='block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="">price of product</label>
                    <input onChange={(e)=>setPrice(e.target.value)}  className='bg-gray-50 outline-slate-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="number" placeholder='Name of price'/>
                </div>
                <div className="my-5">
                    <label className='block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="">Description of product</label>
                    <input onChange={(e)=>setDesc(e.target.value)}  className='bg-gray-50 outline-slate-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" placeholder=' Product description'/>
                </div>
                <div  className={`${image?"block":"hidden"} my-5 w-full h-48 relative`} >
                     {image && <Image src={image}  fill className='absolute object-contain '/>}
                </div>
                <div className="my-5 w-full">
                <CldUploadButton onUpload={handleImageUpload} className='w-full' uploadPreset={process.env.NEXT_PUBLIC_cloudinary_uploadPreset}>
                    <div className="w-full h-40 border-2 rounded-xl border-dotted flex items-center justify-center bg-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

                    </div>
                    <p className='text-sm italic text-red-500'>add image only from unSplash</p>
                </CldUploadButton>
            
                     </div>
                <div className="my-5">
                    <label className='block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white'  htmlFor="">List of Ingridents</label>
                    <input onChange={(e)=>setIngridient(e.target.value)}  className='bg-gray-50 outline-slate-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" placeholder=' Product Recipe'/>
                </div>
                <div className="my-5">
                    <label className='block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white'  htmlFor="">Featured Product</label>
                    <input onChange={()=>setIsFeatured(!isFeatured)}  className='bg-gray-50 outline-slate-300 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 !text-5xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="checkbox" placeholder=' Product Recipe'/>
                </div>
                <div className="my-5 flex flex-col">
                    <label htmlFor="">Category</label>
                  <select onChange={(e)=>setCat(e.target.value)}  className='  w-[45%] md:w-[30%] flex items-center mx-auto px-4 py-4 outline-none shadow-md border'  name="" id="">
                    {category.map(item=>(

                    <option key={item} className='' value={item} >{item} </option>
                    ))}
                   
                  </select>
                </div>
               
                <button    type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateProduct

