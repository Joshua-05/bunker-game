import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css"
import {Avatar} from "@mui/material"
import { useUserStore } from "../../store/UserStore";

function Profile() {
	const nav = useNavigate()
	const user = useUserStore(state => state.userStore)
	const exit = useUserStore(state => state.reset)
	const exits = () => {
		exit();
		nav("/login")
	}
	return(
		<>
		<div className={style.profile}>
			<p>{user?.firstName}</p>
			<Avatar src="/broken-image.jpg" />
			<button onClick={exits}>Exit</button>
		</div>
		</>
	)
}

function Sign(){
	const nav = useNavigate()
	const click = (path: string) => {
		return () => {
			nav(path)
		}
	}
	return(
		<div className={style.sign}>
			<button className={style.btn_in} onClick={click("/login")}>Sign In</button>
			<button className={style.btn_up} onClick={click("/registr")}>Sign Up</button>
		</div>
	)
}

export const Header: React.FC = () : JSX.Element => {
	const user = useUserStore(state => state.userStore)
	return (
		
		<header>
			<div className={style.logo}><Link to = '/'>БУНКЕР</Link></div>
			<div className={style.nav}>
				<Link to ='/lobby'><button className={style.nav_but}>ИГРАТЬ</button></Link>
				<Link to = '/rules'><button className={style.nav_but}>ПРАВИЛА</button></Link>
				<Link to = '/cards'><button className={style.nav_but}>КАРТЫ</button></Link>
			</div>

			{user ? <Profile /> : <Sign />}
			
			
		</header>
		
	);
}

export function Footer() {
	return (
		<footer>
			Все права отсутствуют бла-бла-бла-бла-бла-бла-бла-бла-бла-бла
		</footer>
	);
}
