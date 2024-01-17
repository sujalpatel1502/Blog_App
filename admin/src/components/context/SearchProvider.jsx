import React, { Children, createContext, useState } from 'react'
import { searchPost } from '../../api/post';
import { useContext } from 'react';
const SearchContext=createContext()
export default function SearchProvider({children}) {
    const[searchResult,setSearResult]=useState([]);
    const handleSearch=async(query)=>{
            const{error,posts}=await searchPost(query);
            if(error) return console.log(error);
            setSearResult(posts);
    }
    const resetSearch=async()=>{
       
        setSearResult([]);
}
  return (
    <SearchContext.Provider value={{searchResult,handleSearch,resetSearch}}>
        {children}
    </SearchContext.Provider>
  )
}

export  const useSearch=()=>useContext(SearchContext);


