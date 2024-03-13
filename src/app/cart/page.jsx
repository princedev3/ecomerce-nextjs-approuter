"use client"
import { useCartStore } from '@/libs/store'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'




const CartPage = () => {

const session = useSession()
const router = useRouter()

    const {products, totalItem,totalPrice,addTocart, clearFromcart, removeFromCart} = useCartStore()
    useEffect(()=>{
        useCartStore.persist.rehydrate()
    },[])

    const handleCheckOut= async()=>{
            if(!session){
              toast.error("you have to login")
              router.push("/")
            }else{
              try {
                const res = await fetch(`/api/order`,{
                  method:"POST",
                  body:JSON.stringify({
                    product:products,
                    price:totalPrice,
                    status:"not paid",
                    userEmail:session?.data?.user?.email
                  })
                })
                const data = await res.json()
                router.push(`/pay/${data.id}`)
              } catch (error) {
                console.log(error)
              }
            }
    }  
  return (
    <div>
        <div className="flex flex-col md:flex-row p-6 bg-fuchsia-50/30 min-h-[calc(100vh-80px)]">
            <div className="flex-1 p-2 lg:p-10 flex flex-col items-center justify-center    ">
                {products.length>0 && products.map((item,idx)=>(
                    <div key={idx} className='flex gap-2 items-center justify-between w-full'>
                        <div className="w-[120px] h-[120px]  relative">
                            <Image src={item.image} alt='' fill className='object-contain'/>
                        </div>
                        
                            <p>{item.name} </p>
                            <p className='text-gray-600'><span className='mr-3 font-semibold text-black'>{item.price}</span> x <span className='ml-3 font-semibold text-black'>{item.quantity}pcs</span></p>
                            <p onClick={()=>removeFromCart(item)}  className='px-2 py-1 bg-red-600 text-white rounded-lg text-xl font-semibold'>X</p>
                    </div>
                ))}
            </div>

            <div className="flex-1  my-auto ">
            <div className="h-1/2 p-4 bg-fuchsia-50  flex flex-col gap-4 justify-center ">
        <div className="flex justify-between">
          <span className="">Subtotal () </span>
          <span className="">${totalPrice} </span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost </span>
          <span className="">$00.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost </span>
          <span className="text-green-500">Free</span>
        </div>
        <hr  className='my-2'/>
        <div className="flex justify-between">
          <span className="">Total Cost </span>
          <span className="font-bold">$ {totalPrice} </span>
        </div>
      <div className=' w-full flex items-center justify-center'>
    
        <button onClick={handleCheckOut} disabled={session.status==="unauthenticated"} className="disabled:cursor-not-allowed  disabled:bg-red-300 disabled:text-white bg-red-500 text-white p-3 rounded-md w-1/2 self-end">CHECKOUT</button>
      </div>
      
      </div>
            </div>
        </div>
    </div>
  )
}
// 
export default CartPage