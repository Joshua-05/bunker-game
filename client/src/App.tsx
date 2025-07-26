import { BrowserRouter } from "react-router-dom";
// import { ColorModeContext, useMode } from "./theme/index.ts";
// import { CssBaseline, ThemeProvider } from "@mui/material";
import { RoutesWrapper } from "./utils/router/RoutesWrapper.tsx";

// shift alt f
export default function App() {
	// const [theme, colorMode] = useMode();
	return (
		<>
				<BrowserRouter>
					{/* <ColorModeContext.Provider value={colorMode}> */}
						{/* <ThemeProvider theme={theme}> */}
							{/* <CssBaseline /> */}
							
								<RoutesWrapper/>
							
						{/* </ThemeProvider> */}
					 {/* </ColorModeContext.Provider> */}
				</BrowserRouter>
		</>
	);
}



