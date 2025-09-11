import axios from 'axios';
import { API_BASE_URL } from '../config/Config';

const api=axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json'
    }
});


// Add request interceptor to include token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx
        return response;
    },
    (error) => {
        // Handle errors (401 Unauthorized, etc.)
        if (error.response && error.response.status === 401) {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
        return Promise.reject(error);
    }
);


//________________  auth______________________


export const signupuser=  async(data)=>{
    const res= await api.post('/user/signup',data);
    console.log(res);
    
    return res.data;

}

export const login=async(aadharCardNumber,password)=>{
    const res= await api.post('/user/login',{aadharCardNumber,password})
    return res.data
}



// \------------------------Candidates-----------------------------------


 export  const getCandidates=async()=>{
    const res= await api.get('/candidate');
    // console.log(res.data);
    
    return res.data;
}



export const voteCandidate= async(candidateid,userid)=>{
    const res= await api.get(`/candidate/vote/${candidateid}/${userid}`);
    console.log(res.data);
    
    return res.data;
}


// ---------------------------------- result------------------------------



export const getVoteCounts=async()=>{
    const res=await api.get('/candidate/vote/count');
    return res.data
}

// ------------------------------Profile--------------------------------------

export const getProfile= async()=>{
    const res= await api.get('/user/profile');
    console.log(res.data);
    
    return res.data
}


export const updatePassword=async(currentPassword,newPassword)=>{
    const res= await api.put('/user/profile/password',{currentPassword,newPassword})
    return res.data;
}


// -------------------------------Admin (candidate CRUD)----------------------



export const addCandidate=async(data)=>{
    const res= await api.post('/candidate',data);
    return res.data
}


export const updateCandidate=async(candidateid,data)=>{
    const res= await api.put(`/candidate/${candidateid}`,data)
    return res.data
}

export const deleteCandidate = async (id) => {
  const res = await api.delete(`/candidate/${id}`);
  return res.data;
};