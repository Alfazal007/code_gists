import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./components/Signup";
import UserProvider from "./context/UserContext";
import './index.css'
import { SignIn } from "./components/Signin";
import MyGists from "./components/MyGists";
import GistSearchPage from "./components/OthersGistsv0";
import DisplayOthersGistsCustom from "./components/DisplayOthersGistsCustom";
import CodeDisplay from "./components/GistDisplay";
import GistCreationForm from "./components/TakeInput";

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
		},
		{
			path: "/search",
			element: <GistSearchPage />
		},
		{
			path: "/user/:userId",
			element: <DisplayOthersGistsCustom />
		},
		{
			path: "/gist/:gistId",
			element: <CodeDisplay />
		},
		{
			path: "/create",
			element: <GistCreationForm />
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
