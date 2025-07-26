import { matchPath, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Header } from "../../components/wrap/wrap.tsx";

import AuthRoot from "../../pages/auth/index.tsx";
import LobbiListPage from "../../pages/lobbiList/index.tsx";
import MenuPage from "../../pages/menu/index.tsx";
import RulesPage from "../../pages/rules/index.tsx";
import CreateLobbiPage from "../../pages/lobbiList/create.tsx";
import PrivateRoute from "./privateRoute.tsx";
import GamePage from "../../pages/game/index.tsx";
import CardsPage from "../../pages/card/index.tsx";
import CreateCardPage from "../../pages/card/create.tsx";
import LobbyRoomPage from "../../pages/lobbyRoom/index.tsx";

export const RoutesWrapper = () => {
	const location = useLocation(); 
	const hideHeaderAndFooter = matchPath('/game/:lobbyId', location.pathname) !== null
	return (
		<>
			{!hideHeaderAndFooter && <Header />}
			<Routes>
				<Route path="login" element={<AuthRoot />} />
				<Route path="registr" element={<AuthRoot />} />
				<Route path="/" element={<MenuPage />} />
				<Route path="rules" element={<RulesPage />} />
				<Route path="cards" element={<CardsPage />} />
				<Route path="cards-create" element={<CreateCardPage />} />
				<Route element={<PrivateRoute />}>
					<Route path="lobby" element={<LobbiListPage />} />
					<Route path="lobby-create" element={<CreateLobbiPage />} />
					<Route path="lobby-room/:lobbyId" element={<LobbyRoomPage />} />
					<Route path="game/:lobbyId" element={<GamePage />} />
				</Route>
			</Routes>
			{!hideHeaderAndFooter && <Footer />}
		</>
	);
};