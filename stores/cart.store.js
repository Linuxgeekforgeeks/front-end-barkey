import{ create} from "zustand"


export const useCartStore=create((set)=>({
    cartItems:[],
    setCartItem:(cartData)=>set((state)=>({
        cartItems:[...state.cartItems,{...item,quantity:1}]
    })),
    clearCart:()=>set({cartItems:[]})
}))