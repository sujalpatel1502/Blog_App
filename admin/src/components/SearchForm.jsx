import React, { useState } from 'react'
import { useSearch } from './context/SearchProvider';

function SearchForm() {
    const[query,setuery]=useState('');
    const{handleSearch}=useSearch();
    const handleSubmit = (e)=>{
            e.preventDefault();
            if(!query.trim()) return;
            handleSearch(query);
    }
  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={({target})=>setuery(target.value)} placeholder='Serach......'  className='border border-gray-500 outline-none ring focus:ring-1 ring-blue-500 w-56'/>
    </form>
  )
}

export default SearchForm
