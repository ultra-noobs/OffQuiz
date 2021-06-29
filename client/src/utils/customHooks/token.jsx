const useToken = () =>{
    const getToken = () =>{
        const token = localStorage.getItem("token");
        return token;
    }
    const setToken = (token) =>{
        console.log(token);
        localStorage.setItem("token",token);
    }
    const removeToken = ()=>{
        localStorage.removeItem("token");
    }
    return {
        getToken,setToken,removeToken
    };
}

export default useToken;