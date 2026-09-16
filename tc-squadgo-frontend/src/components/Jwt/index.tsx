import { useAuth } from "../../context/AuthContext"
import { api } from "../../services/api"

const Jwt: React.FC = () => {
    const { singOut } = useAuth()
    
    api.interceptors.response.use(undefined, (err) => {
        if(err.response.status === 401) {
            singOut()
        }
    
        throw err
    })

    return <></>
}

export default Jwt