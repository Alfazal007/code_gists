import React, { useContext, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import Navbar from './Navbarv0';
import { toast } from '@/hooks/use-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';

const GistSearchPage: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("")
	const [isSearching, setIsSearching] = useState(false)
	const navigate = useNavigate()
	const { user } = useContext(UserContext)

	useEffect(() => {
		if (!user) {
			navigate("/signin")
		}
	}, [])

	const handleSearch = async () => {
		if (!searchQuery) {
			return
		}
		setIsSearching(true)
		try {
			const searchUserByNameUrl = `http://localhost:8000/api/v1/user/getUser/${searchQuery}`
			const responseUserId = await axios.get(searchUserByNameUrl, { withCredentials: true })
			if (responseUserId.status == 200) {
				navigate(`/user/${responseUserId.data.data.id}`)
			}
		} catch (err) {
			toast({
				title: "User not found",
				variant: "destructive"
			})
			console.log(err)
		} finally {
			setIsSearching(false)
		}
	};

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
				<div className="w-full max-w-md space-y-8">
					<h1 className="text-4xl font-bold text-center text-white mb-8">
						Search Others' Gists
					</h1>
					<div className="space-y-4">
						<Input
							type="text"
							placeholder="Enter username to search"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full h-14 text-xl bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
						/>
						<Button
							disabled={isSearching}
							onClick={handleSearch}
							className={`w-full h-14 text-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold ${isSearching ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
						>
							<Search className="mr-2 h-6 w-6" /> Search
						</Button>
					</div>
				</div>
			</div >
		</>
	);
};

export default GistSearchPage;

