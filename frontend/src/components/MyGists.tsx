import { UserContext } from "@/context/UserContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import GistsLandingPage from "./MyGistsv0"

const MyGists = () => {
	const { user } = useContext(UserContext)
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) {
			navigate("/signin")
			return
		}
	}, [])

	return (
		<>
			<GistsLandingPage />
		</>
	)
}

export default MyGists
