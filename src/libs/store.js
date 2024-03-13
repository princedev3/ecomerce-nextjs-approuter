import {create} from "zustand"
import { persist } from "zustand/middleware"


export const useCartStore = create(persist((set,get)=>({
    products:[],
    totalItem:0,
    totalPrice:0,
    addToCart(item){
        const product = get().products
        const productInState = product.find(prod=>prod.id ===item.id)
        if(productInState){
       const updatedproduct = product.map(prod=>prod.id ===productInState.id?{...item,
        quantity:item.quantity+prod.quantity,
        price:item.price+prod.price
    }:item)
    set((state)=>({
        products:updatedproduct,
        totalPrice:state.totalPrice +item.price,
        totalItem:state.totalItem+item.quantity
     }))
        }else{
            set((state)=>({
               products:[...state.products,item],
               totalPrice:state.totalPrice +item.price,
               totalItem:state.totalItem+item.quantity
            }))
        }
    },
    removeFromCart(item){
        set((state)=>({
            products:state.products.filter(product=>product.id !==item.id),
            totalPrice:state.totalPrice -item.price,
            totalItem:state.totalItem-item.quantity
        }))
    },
    clearFromcart(){
        set((state)=>({
            products:[],
            totalPrice:0,
            totalItem:0
        }))

    },
}),{name:"cart",skipHydration:true}) )