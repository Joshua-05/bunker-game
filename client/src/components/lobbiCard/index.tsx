import { useNavigate } from "react-router-dom"
import { ILobbi } from "../../common/types/lobbi/index.ts"
import style from "./style.module.css"
import ModalPassword from "../modalPassword/index.tsx"
import { useState } from "react"

interface ILobbiProps{
    lobbi: ILobbi
}

export default function LobbiCard({lobbi}: ILobbiProps) {
    const [flag, setFlag] = useState(false)
    const [pas, setPas] = useState('')

    const nav = useNavigate()
    const Clicked = async() => {
        lobbi.password
        ? (setFlag(true), pas === lobbi.password && 
            
            nav(`/lobby-room/${lobbi.id}`)
        )
        :   nav(`/lobby-room/${lobbi.id}`)
    }
    return (
        <>
            <div className={style.card}>
                <p>{lobbi.name}</p>
                <p>{lobbi.current}/{lobbi.count}</p>
                <span>{lobbi.access}</span>
                <button onClick={Clicked}>Enter</button>
            </div>
            {flag === true && <ModalPassword setPas = {setPas} />}
        </>
    )
}