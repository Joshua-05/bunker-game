import { IUser } from "../../common/types/auth"
import style from "./style.module.css"

interface IUserInLobbyCard {
    users: IUser
}

const UserInLobbyCard = ({users}: IUserInLobbyCard) => {
    return (
        <div className={style.card}>
            <p>{users.username}</p>
        </div>
    )
}

export default UserInLobbyCard