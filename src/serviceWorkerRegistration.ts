// Check if the browser supports service workers
const isLocalhost = Boolean(
	window.location.hostname === "localhost" ||
		window.location.hostname === "[::1]" ||
		window.location.hostname.match(/^127(?:\.(?:[0-9]{1,3})){3}$/)
)

export function register(config: any) {
	if ("serviceWorker" in navigator) {
		const publicUrl = new URL(import.meta.env.VITE_PUBLIC_URL || "/", window.location.href)
		if (publicUrl.origin !== window.location.origin) {
			return
		}

		window.addEventListener("load", () => {
			// Use the JavaScript file for the service worker
			const swUrl = `${import.meta.env.VITE_PUBLIC_URL || ""}/service-worker.js` // change to .js file

			if (isLocalhost) {
				// Localhost: Check if the service worker exists
				checkValidServiceWorker(swUrl, config)

				// Log service worker updates for development
				navigator.serviceWorker.ready.then(() => {
					console.log("This app is being served by a service worker.")
				})
			} else {
				// Register service worker in production
				registerValidSW(swUrl, config)
			}
		})
	}
}

function registerValidSW(swUrl: string, config: any) {
	navigator.serviceWorker
		.register(swUrl)
		.then((registration) => {
			registration.onupdatefound = () => {
				const installingWorker = registration.installing
				if (installingWorker == null) {
					return
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === "installed") {
						if (navigator.serviceWorker.controller) {
							// New content is available
							console.log("New content is available; please refresh.")
							if (config && config.onUpdate) {
								config.onUpdate(registration)
							}
						} else {
							// Content is cached for offline use
							console.log("Content is cached for offline use.")
							if (config && config.onSuccess) {
								config.onSuccess(registration)
							}
						}
					}
				}
			}
		})
		.catch((error) => {
			console.error("Error during service worker registration:", error)
		})
}

function checkValidServiceWorker(swUrl: string, config: any) {
	fetch(swUrl, { headers: { "Service-Worker": "script" } })
		.then((response) => {
			const contentType = response.headers.get("content-type")
			if (response.status === 404 || (contentType != null && contentType.indexOf("javascript") === -1)) {
				navigator.serviceWorker.ready.then((registration) => {
					registration.unregister().then(() => {
						window.location.reload()
					})
				})
			} else {
				registerValidSW(swUrl, config)
			}
		})
		.catch(() => {
			console.log("No internet connection found. App is running in offline mode.")
		})
}

export function unregister() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.ready
			.then((registration) => {
				registration.unregister()
			})
			.catch((error) => {
				console.error(error.message)
			})
	}
}
