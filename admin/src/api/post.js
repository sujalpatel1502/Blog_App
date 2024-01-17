import client from "./client"

export const getPosts=async(pageNo,limit)=>{
    try {
       const {data}= await client(`/post/latestpost?pageNo=${pageNo}&limit=${limit}`);
       console.log("oggggggg",data);
       return data;
    } catch (error) {
        const{response}=error
        if(response?.data){
            return response.data;
        }
        return { error:error.message || error};
    }
}

export const deletePost=async(id)=>{
    try {
       const {data}= await client.delete(`/post/${id}`);
       console.log("oggggggg",data);
       return data;
    } catch (error) {
        const{response}=error
        if(response?.data){
            return response.data;
        }
        return { error:error.message || error};
    }
}

export const searchPost=async(query)=>{
    try {
       const {data}= await client(`/post/search?title=${query}`);
       console.log("oggggggg",data);
       return data;
    } catch (error) {
        const{response}=error
        if(response?.data){
            return response.data;
        }
        return { error:error.message || error};
    }
}

export const createPost=async(formData)=>{
    console.log("hereeeeeeeee",formData);
    try {
       const {data}= await client.post('/post/create',formData);
       console.log("oggggggg",data);
       return data;
    } catch (error) {
        const{response}=error
        if(response?.data){
            return response.data;
        }
        return { error:error.message || error};
    }
}


export const updatePost=async(formData)=>{
    console.log("hereeeeeeeee",formData);
    try {
       const {data}= await client.post('/post/create',formData);
       console.log("oggggggg",data);
       return data;
    } catch (error) {
        const{response}=error
        if(response?.data){
            return response.data;
        }
        return { error:error.message || error};
    }
}