/** @format */
import React from "react";

interface ScoreBadgeProps {
	score: number;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
	const getStyles = () => {
		if (score > 69) {
			return {
				container: "bg-green-100",
				text: "text-green-600",
				label: "Strong",
			};
		} else if (score > 49) {
			return {
				container: "bg-yellow-100",
				text: "text-yellow-600",
				label: "Good Start",
			};
		} else {
			return {
				container: "bg-red-100",
				text: "text-red-600",
				label: "Needs Work",
			};
		}
	};

	const styles = getStyles();

	return (
		<div className={`${styles.container} px-3 py-1 rounded-full inline-block`}>
			<p className={`${styles.text} text-sm font-semibold`}>{styles.label}</p>
		</div>
	);
};
