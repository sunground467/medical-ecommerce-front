const cacheName = "pwa-cache-v1"
const urlsToCache = [
	"/",
	"/index.html",
	"/categoryProd",
	"/myProfile",
	"/search-product",
	"/dashboard",
	"/styles.css", // Static CSS
	"/main.js", // Main JS file
	"/vite.svg" // Static assets
]

// Install Event - Cache Static Files
self.addEventListener("install", (event: any) => {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			console.log("Opened cache")
			return cache.addAll(urlsToCache)
		})
	)
})

// Fetch Event - Serve from Cache or Network
self.addEventListener("fetch", (event: any) => {
	const requestUrl = new URL(event.request.url)

	// Skip Vite and other development-related assets
	if (
		requestUrl.pathname.includes("@vite") || // Skip Vite client assets
		requestUrl.pathname.includes("/src/") || // Skip source code files
		requestUrl.pathname.includes("@react-refresh") // Skip react-refresh files
	) {
		return fetch(event.request) // Fetch from the network directly
	}

	// Handle navigation requests for SPAs (single-page apps)
	if (event.request.mode === "navigate") {
		// Check if the requested URL is already cached
		event.respondWith(
			caches.match(event.request).then((response) => {
				// If cached, serve from cache
				if (response) {
					return response
				}
         console.log('navigatore',navigator)
				// If not cached and the user is offline
				if (!navigator.onLine) {
					// Show an alert that something went wrong when offline
					return new Response(JSON.stringify({ message: "You are offline and the page is not cached." }), {
						status: 500,
						statusText: "Page not cached and offline."
					})
				}

				// If online, try fetching from the network
				return fetch(event.request)
					.then((networkResponse) => {
						if (networkResponse.ok) {
							// Cache the new request for future use
							caches.open(cacheName).then((cache) => {
								cache.put(event.request, networkResponse.clone())
							})
						}
						return networkResponse
					})
					.catch(() => {
						// Handle fetch error (could be offline or other issues)
						return new Response(JSON.stringify({ message: "Something went wrong, please try again later." }), {
							status: 500,
							statusText: "Network Error"
						})
					})
			})
		)
	} else {
		// Serve other assets from cache (images, CSS, etc.)
		event.respondWith(
			caches.match(event.request).then((response) => {
				return response || fetch(event.request) // Cache-first strategy
			})
		)
	}
})

// Activate Event - Cleanup Old Caches
self.addEventListener("activate", (event: any) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== cacheName) {
						console.log("Clearing old cache:", cache)
						return caches.delete(cache) // Delete old caches
					}
				})
			)
		})
	)
})
