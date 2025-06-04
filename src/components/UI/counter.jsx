import { memo, useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const Counter = memo((props) => {
	const [counterOn, setCounter] = useState(false);
	const elementRef = useRef(null);

	useEffect(() => {
		// Create observer instance
		const observer = new IntersectionObserver(
			([entry]) => {
				// When element enters viewport
				if (entry.isIntersecting) {
					setCounter(true);
				} else {
					setCounter(false);
				}
			},
			{ threshold: 0.1 } // trigger when at least 10% of the element is visible
		);

		// Start observing the element
		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		// Clean up
		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []);

	return (
		<div ref={elementRef}>
			<div
				style={{
					...props.style,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<div>
					{counterOn && (
						<CountUp
							start={props.start}
							end={props.end}
							duration={props.duration}
							delay={0}></CountUp>
					)}
					+
				</div>
				<p
					style={{
						fontFamily: "Poppins",
						fontSize: "1.8rem",
						fontWeight: "300",
					}}>
					{props.title}
				</p>
			</div>
		</div>
	);
});

export default Counter;
