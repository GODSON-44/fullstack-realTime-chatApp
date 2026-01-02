import {create} from "zustand"

//created this variable and used set to manipulate the localstorage globaly from anywhere if need


export const useThemeStore = create((set)=>({

    theme:localStorage.getItem("chat-theme")||"dark", // get a theme from localStorage if no them initially then set it to dark
    setTheme:(theme)=>{
        localStorage.setItem("chat-theme", theme); // update the localstorage
        set({theme}); // then update the state
    },
}));