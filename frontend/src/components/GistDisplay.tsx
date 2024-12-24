import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import Navbar from "./Navbarv0";

const CodeDisplay = () => {
	const [code, setCode] = useState("")
	const navigate = useNavigate()
	const { gistId } = useParams()
	const [copied, setCopied] = useState(false);
	const [fetching, setIsFetching] = useState(true)

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	useEffect(() => {
		if (!gistId) {
			navigate("/")
			return
		}
		fetchCode()
	}, [])

	async function fetchCode() {
		const gistFetchUrl = `http://localhost:8000/api/v1/gists/get/${gistId}`
		try {
			const gistMetaData = await axios.get(gistFetchUrl, { withCredentials: true })
			console.log({ gistMetaData })
			if (gistMetaData.status != 200) {
				toast({ title: "Issue fetching the gist", variant: "destructive" })
				navigate("/")
				return
			}
			const gistData = await axios.get(gistMetaData.data.data.url)
			if (gistData.status != 200) {
				toast({ title: "Issue fetching the gist", variant: "destructive" })
				navigate("/")
				return
			}
			setCode(gistData.data)
			setIsFetching(false)
		} catch (err) {
			toast({ title: "Issue fetching the gist", variant: "destructive" })
			navigate("/")
			return
		}
	}

	return (
		<>
			<Navbar />
			{
				fetching ? <><CodeDisplayLoading /></> :

					<div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
						<div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
							<div className="p-4 bg-gray-700 border-b border-gray-600 flex justify-between items-center">
								<div className="flex space-x-2">
									<div className="w-3 h-3 rounded-full bg-red-500"></div>
									<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
									<div className="w-3 h-3 rounded-full bg-green-500"></div>
								</div>
								<button
									onClick={handleCopy}
									className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-gray-200 rounded-md flex items-center space-x-1 transition-colors"
								>
									{copied ? (
										<span>Copied!</span>
									) : (
										<>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
												/>
											</svg>
											<span>Copy</span>
										</>
									)}
								</button>
							</div>
							<div className="relative">
								<pre className="overflow-x-auto p-6 text-gray-300 font-mono text-sm h-[32rem]">
									<code>{code}</code>
								</pre>
							</div>
						</div>
					</div>
			}
		</>
	);
};


const CodeDisplayLoading = () => {
	return (
		<div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
			<div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
				<div className="p-4 bg-gray-700 border-b border-gray-600 flex justify-between items-center">
					<div className="flex space-x-2">
						<div className="w-3 h-3 rounded-full bg-red-500"></div>
						<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
						<div className="w-3 h-3 rounded-full bg-green-500"></div>
					</div>
					<button
						disabled
						className="px-3 py-1 bg-gray-600 text-gray-400 rounded-md flex items-center space-x-1 cursor-not-allowed"
					>
						<span>Copy</span>
					</button>
				</div>
				<div className="relative">
					<div className="h-[32rem] p-6 text-gray-500">
						Loading...
					</div>
				</div>
			</div>
		</div>
	);
};
export default CodeDisplay;
