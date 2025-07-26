import { IUser } from "../../common/types/auth"
import style from "./voteWidget.module.css"

interface IVoteWidgetProps {
    users: IUser[]
}

const VoteWidget = (props : IVoteWidgetProps) => {
    const users = props.users
    return(
        <div className={style.widget}>
            <div>
                <h2>Голосование</h2>
                {
                    users.map(item => <p key={item.id}>{item.username}</p>)
                }
            </div>
        </div>
    )
}

export default VoteWidget