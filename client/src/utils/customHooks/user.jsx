import useToken from './token';
import Axios from 'axios';

const useAuthStatus = () =>{
    const {getToken} = useToken();
    const token = getToken();
    const getStatus = async()=>{
        try {
            if(!token || token.length===0) return false;
            var response = await Axios.get(
                'http://localhost:5000/checkAuth',
                {
                    headers: {
                    Authorization: token,
                    },
                }
            )
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    return {
        getStatus
    };
}

export default useAuthStatus;