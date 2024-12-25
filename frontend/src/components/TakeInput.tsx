import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from '@/hooks/use-toast';
import Navbar from './Navbarv0';

const GistCreationForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		code: '',
		isPublic: true
	});
	const [isSending, setIsSending] = useState(false)

	const { user } = useContext(UserContext)
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) {
			navigate("/signin")
		}
	}, [])

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsSending(true)
		const createGistUrl = `http://localhost:8000/api/v1/gists/createGist`
		if (formData.code == "") {
			toast({ title: "No code to send", variant: "destructive" })
			return
		}
		if (formData.name == "") {
			toast({ title: "No name to gist", variant: "destructive" })
			return
		}
		if (formData.name.length > 6) {
			toast({ title: "Name max length is 6", variant: "destructive" })
			return
		}

		try {
			await axios.post(createGistUrl, {
				code: formData.code,
				isPublic: formData.isPublic,
				name: formData.name
			}, { withCredentials: true })
			toast({ title: "Gist created successfully" })
		} catch (err) {
			toast({ title: "issue creating the gist", variant: "destructive" })
		} finally {
			setIsSending(false)
			navigate("/")
		}
	};
	return (
		<>
			<Navbar />
			<div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
				<div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
					<div className="p-4 bg-gray-700 border-b border-gray-600 flex justify-between items-center">
						<div className="flex space-x-2">
							<div className="w-3 h-3 rounded-full bg-red-500"></div>
							<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
							<div className="w-3 h-3 rounded-full bg-green-500"></div>
						</div>
						<button
							disabled={isSending}
							onClick={handleSubmit}
							className={`px-4 py-2 ${isSending
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-green-600 hover:bg-green-500 cursor-pointer'
								} text-white rounded-md transition-colors`}
						>
							Save Gist
						</button>
					</div>

					<form onSubmit={handleSubmit} className="p-6 space-y-4">
						<div className="space-y-2">
							<label htmlFor="name" className="block text-gray-300 text-sm font-medium">
								Gist Name
							</label>
							<input
								type="text"
								id="name"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
								placeholder="Enter gist name..."
								required
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="code" className="block text-gray-300 text-sm font-medium">
								Code
							</label>
							<textarea
								id="code"
								value={formData.code}
								onChange={(e) => setFormData({ ...formData, code: e.target.value })}
								className="w-full h-[50vh] px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
								placeholder="Enter your code here..."
								required
							/>
						</div>
						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="isPublic"
								checked={formData.isPublic}
								onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
								className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
							/>
							<label htmlFor="isPublic" className="text-gray-300 text-sm font-medium">
								Make gist public
							</label>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default GistCreationForm;

