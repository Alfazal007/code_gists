import { UserContext } from "@/context/UserContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Gist } from "./MyGistsv0"
import axios from "axios"
import { format } from "date-fns"
import { Button } from "./ui/button"
import Navbar from "./Navbarv0"

const DisplayOthersGistsCustom = () => {
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	const { userId } = useParams()
	const [gists, setGists] = useState<Gist[]>([]);
	const [offset, setOffset] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const limit = 10;

	useEffect(() => {
		if (!user) {
			navigate("/signin")
			return
		}
		if (!userId || !parseInt(userId)) {
			navigate("/")
			return
		}
		if (userId == user.id) {
			navigate("/")
			return
		}
	}, [])

	useEffect(() => {
		fetchGists()
	}, [offset]);

	const fetchGists = async () => {
		setLoading(true);
		try {
			const responseGists = await axios.get(`http://localhost:8000/api/v1/gists/getUserGists/${userId}/${offset}/10`, {
				withCredentials: true
			});
			console.log({ responseGists })
			const responseCount = await axios.get(`http://localhost:8000/api/v1/gists/getUserGistsCount/${userId}`, { withCredentials: true })
			setGists(responseGists.data.data);
			setTotalCount(responseCount.data.data);
		} catch (error) {
			console.error('Error fetching gists:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleNextPage = () => {
		setOffset(prevOffset => prevOffset + 1);
	};

	const handlePreviousPage = () => {
		setOffset(prevOffset => Math.max(0, prevOffset - 1));
	};

	if (totalCount == 0) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen bg-gray-900 flex items-center justify-center">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-gray-100 mb-4">No posts yet</h1>
					</div>
				</div>
			</>
		)
	}
	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gray-900 text-gray-100 p-8">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-3xl font-bold mb-8 text-center text-white">Your Gists</h1>

					{loading ? (
						<div className="text-center">Loading...</div>
					) : (
						<>
							<ul className="space-y-4">
								{gists.map(gist => (
									<li key={gist.id} className="bg-gray-800 rounded-lg p-4 shadow-md cursor-pointer" onClick={() => { navigate(`/gist/${gist.id}`) }}>
										<h2 className="text-xl font-semibold text-white">{gist.name}</h2>
										<p className="text-gray-400 text-sm mt-4">
											{format(new Date(gist.updatedAt), 'PPP')}
										</p>
									</li>
								))}
							</ul>

							<div className="mt-8 flex justify-between items-center">
								<Button
									onClick={handlePreviousPage}
									disabled={offset === 0}
									className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600"
								>
									Previous
								</Button>
								<span className="text-gray-400">
									Total Gists = {totalCount}
								</span>
								<Button
									onClick={handleNextPage}
									disabled={(offset * limit) >= totalCount}
									className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600"
								>
									Next
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default DisplayOthersGistsCustom
