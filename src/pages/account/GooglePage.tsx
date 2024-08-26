// import axios from "axios"
// import { useEffect } from "react"

// const GooglePage = () => {
// 	useEffect(() => {
// 		const fetchUser = async () => {
// 			const queryParams = new URLSearchParams(window.location.search)
// 			const code = queryParams.get("code")

// 			if (code) {
// 				const response = await axios.get(`http://localhost:4500/auth/google/callback?code=${code}`)
// 				console.log(response.data) // User data from Google
// 				// Handle user data (e.g., save to state, redirect, etc.)
// 			}
// 		}
// 		fetchUser()
// 	}, [])
// 	return <div>Loading...</div>
// }

// export default GooglePage
