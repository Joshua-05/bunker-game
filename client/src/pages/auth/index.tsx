import { useLocation, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import LoginPage from "../../components/login";
import RegisterPage from "../../components/registr";
import { Box } from "@mui/material";
import { useState } from "react";
import { instance } from "../../api/baseUrl";
import { AppErrors } from "../../common/errors";
import { useUserStore } from "../../store/UserStore";

const AuthRootComponent: React.FC = (): JSX.Element => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [username, setUsername] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const addUser = useUserStore(state => state.addUser)

	


	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		if (location.pathname === '/login') {
			try {
				const userData = {
					email,
					password,
				};
				const user = await instance.post("auth/login", userData);
				addUser(user.data.dataValues)
				// console.log(user.data.dataValues)
				navigate('/')
			} catch (e) {
				return e
			}
			
		}
		else {
			if (password === repeatPassword){
				const userData = {
					firstName,
					username,
					email,
					password
				};
				const user = await instance.post("auth/register", userData);
				addUser(user.data.dataValues)
				navigate('/')
			} else {
				throw new Error(AppErrors.PasswordDoNotMatch)
			}
		}
	};

	return (
		<>
		<div className={style.root}>
			<form className={style.form} onSubmit={handleSubmit}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					flexDirection="column"
					maxWidth={640}
					margin="auto"
					padding={5}
					borderRadius={5}
					boxShadow={"5px 5px 10px #ccc"}
				>
					{location.pathname === "/login" ? (
						<LoginPage setEmail={setEmail} setPassword={setPassword} />
					) : location.pathname === "/registr" ? (
						<RegisterPage
							setFirstName={setFirstName}
							setUsername={setUsername}
							setEmail={setEmail}
							setPassword={setPassword}
							setRepeatPassword={setRepeatPassword}
						/>
					): null}
				</Box>
			</form>
		</div>
		</>
	);
};

export default AuthRootComponent;
