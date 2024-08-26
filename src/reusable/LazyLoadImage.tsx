import { useEffect, useRef, useState } from "react"

const LazyLoadImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
	const imgRef = useRef<any>()
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsIntersecting(true)
						observer.disconnect()
					}
				})
			},
			{
				threshold: 0.1
			}
		)

		if (imgRef.current) {
			observer.observe(imgRef.current)
		}

		return () => {
			if (imgRef.current) {
				observer.unobserve(imgRef.current)
			}
		}
	}, [])

    
	useEffect(() => {
		if (isIntersecting && imgRef.current) {
			const img = imgRef.current
			const tempImg = new Image()
			tempImg.src = src
			tempImg.onload = () => {
				img.src = src
				img.style.filter = "none" // Remove blur when image is loaded
			}
		}
	}, [isIntersecting, src])

	return (
		<img
			ref={imgRef}
			src={isIntersecting ? src : ""}
			alt={alt}
			className={`${className} cursor-pointer`}
			loading="lazy"
			style={{ filter: "blur(10px)" }}
		/>
	)
}

export default LazyLoadImage
