import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App.tsx"
import "./index.css"
import { store } from "./redux/store.ts"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
)
serviceWorkerRegistration.register({
	onUpdate: (registration: any) => {
		alert("New content is available! Please refresh.")
		if (registration && registration.waiting) {
			registration.waiting.postMessage({ type: "SKIP_WAITING" })
		}
	},
	onSuccess: (registration: any) => {
		console.log("Service worker registered successfully.", registration)
	}
})
