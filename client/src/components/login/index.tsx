import { TextField, Button, Typography } from "@mui/material";
import style from "../../pages/auth/style.module.css";
import { IPropsLogin } from "../../common/types/auth";
import { Link } from "react-router-dom";

 const LoginPage : React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
	const { setEmail, setPassword } = props;
	return (
		<>
			<Typography variant="h1" fontFamily={"Poppins"} textAlign={"center"}>
				Авторизация
			</Typography>
			<Typography
				variant="body1"
				fontFamily={"Poppins"}
				textAlign={"center"}
				marginBottom={3}
			>
				Введите ваш логин и пароль
			</Typography>
			<TextField
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
				onChange={(event) => setPassword(event.target.value)}
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
				Вадите
			</Button>
			<Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
				У вас нет аккаунта?{" "}
				<Link to="/registr"><span className={style.incitingText}>Зарегистрируйся</span>{" "}</Link>
			</Typography>
		</>
	);
}

export default LoginPage