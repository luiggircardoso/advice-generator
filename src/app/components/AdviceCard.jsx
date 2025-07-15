import gsap from "gsap";
import React from "react";

function AdviceCard({ props }) {
    const cardRef = React.useRef(null);

    React.useEffect(() => {
        if (props.loading) {
            gsap.to(cardRef.current, {
                duration: 0.5,
                backgroundColor: "#374151",
                ease: "power2.out"
            });
        } else {
            gsap.to(cardRef.current, {
                duration: 0.5,
                backgroundColor: "#1f2937",
                ease: "power2.out"
            });
        }
    }, [props.loading]);

    return (
        <div 
            ref={cardRef}
            className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-700 card"
        >
            <h2 className="text-2xl font-bold mb-4">Advice</h2>
            <p className="text-gray-300">{props.loading ? "Loading..." : props.advice}</p>
        </div>
    )
}
export default AdviceCard;