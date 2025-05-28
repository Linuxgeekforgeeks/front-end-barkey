import { create } from "zustand";


export const useNewsletterStore=create((set)=>({
    subscribers:[],
    setSubcribers:(subscribers)=>set({subscribers}),
    clearSubscribers:()=>set({subscribers:[]})
}))