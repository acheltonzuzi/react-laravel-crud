import axios from "axios";

const axiosClient=axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}api`
})

//Interceptors sao funcoes especiais que sao executadas antes de mandar um request ou depois de receber um resposta

//Criando interceptor de um request
axiosClient.interceptors.request.use((config)=>{
    const token=localStorage.getItem("ACCESS_TOKEN")
    config.headers.Authorization=`Bearer ${token}`

    return config
})

//Criando interceptor de um response
axiosClient.interceptors.response.use((res)=>{
    return res;
},
(error)=>{
    try {
        const {res}=error;
        if(res.status===401){
            localStorage.removeItem("ACCESS_TOKEN")
        }
    } catch (error) {
        console.log(error);
    }
    throw error
}
)

export default axiosClient