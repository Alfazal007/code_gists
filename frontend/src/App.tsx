import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./components/Signup";
import UserProvider from "./context/UserContext";
import './index.css'
import { SignIn } from "./components/Signin";
import MyGists from "./components/MyGists";

export interface User {
	accessToken: string;
	username: string;
	id: string;
}

function App() {
	const router = createBrowserRouter([
		{
			path: "/signup",
			element: <SignUp />,
		},
		{
			path: "/signin",
			element: <SignIn />,
		},
		{
			path: "/",
			element: <MyGists />
		}
	]);

	return (
		<>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</>
	);
}

export default App;
