import { TextField, Button, Typography } from "@mui/material";
import style from "../../pages/auth/style.module.css";
import { IPropsRegister } from "../../common/types/auth";
import { Link } from "react-router-dom";

const RegisterPage: React.FC<IPropsRegister> = (props: IPropsRegister) : JSX.Element => {
	const {setFirstName, setUsername, setEmail, setPassword, setRepeatPassword} = props
	return (
		<>
			<Typography variant="h1" fontFamily={"Poppins"} textAlign={"center"}>
				Регистрация
			</Typography>
			<Typography
				variant="body1"
				fontFamily={"Poppins"}
				textAlign={"center"}
				marginBottom={3}
			>
				Укажите ваши данные
			</Typography>
			<TextField
				fullWidth={true}
				margin={"normal"}
				label="Name"
				variant="outlined"
				placeholder="Введите ваше имя"
				onChange={(event) => setFirstName(event.target.value)}
			/>
			<TextField
				fullWidth={true}
				margin={"normal"}
				label="Username"
				variant="outlined"
				placeholder="Введите ваш login"
				onChange={(event) => setUsername(event.target.value)}
			/>
			<TextField
				type="email"
				fullWidth={true}
				margin={"normal"}
				label="Email"
				variant="outlined"
				placeholder="Введите ваш email"
				onChange={(event) => setEmail(event.target.value)}
			/>
			<TextField
				type="password"
				fullWidth={true}
				margin={"normal"}
				label="Password"
				variant="outlined"
				placeholder="Введите ваш password"
				onChange = {(event) => setPassword(event.target.value)}
			/>
			<TextField
				type="password"
				fullWidth={true}
				margin={"normal"}
				label="Again password"
				variant="outlined"
				placeholder="Повторите ваш password"
				onChange = {(event) => setRepeatPassword(event.target.value)}
			/>
			<Button
				type="submit"
				sx={{
					fontFamily: "Poppins",
					marginTop: 2,
					marginBottom: 2,
					width: "60%",
				}}
				variant="contained"
			>
				Регистрация
			</Button>
			<Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
				Есть аккаунт? <Link to="/login"><span className={style.incitingText}>Авторизируйся</span>{" "}</Link>
			</Typography>
		</>
	);
}

export default RegisterPage