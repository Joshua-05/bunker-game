import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { instance } from "../baseUrl";

const navigate = useNavigate();
const addUser = useUserStore(state => state.addUser)

interface IUserData {
	email: string,
	password: string
}

export const authUser = async(userData: IUserData) => {
    try {
        const user = await instance.post("auth/login", userData);
        addUser(user.data.dataValues)
        navigate('/')
    } catch (e) {
        return e
    }
}