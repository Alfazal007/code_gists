import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Search, LogOut } from 'lucide-react';
import axios from 'axios';
import { UserContext } from '@/context/UserContext';

const Navbar: React.FC = () => {
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext)

	const handleLogout = () => {
		logout()
	};

	async function logout() {
		try {
			const res = await axios.post("http://localhost:8000/api/v1/user/logout", {}, { withCredentials: true })
			console.log({ res })
		} catch (err) {
			console.log(err)
		} finally {
			setUser(null)
			navigate('/signin');
		}
	}

	return (
		<nav className="bg-gray-950 text-gray-100 shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-4">
						<Button
							variant="ghost"
							className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							onClick={() => navigate('/')}
						>
							<Home className="h-5 w-5 mr-2" />
							Home
						</Button>
						<Button
							variant="ghost"
							className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							onClick={() => navigate('/search')}
						>
							<Search className="h-5 w-5 mr-2" />
							Search Gists
						</Button>
					</div>
					<div>
						<Button
							variant="ghost"
							className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							onClick={handleLogout}
						>
							<LogOut className="h-5 w-5 mr-2" />
							Logout
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

