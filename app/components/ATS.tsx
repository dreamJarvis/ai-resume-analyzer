/** @format */

import React from "react";

interface Suggestion {
	type: "good" | "improve";
	tip: string;
}

interface ATSProps {
	score: number;
	suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
	const getGradientBg = () => {
		if (score > 69) return "from-green-100";
		if (score > 49) return "from-yellow-100";
		return "from-red-100";
	};

	const getIcon = () => {
		if (score > 69) return "/icons/ats-good.svg";
		if (score > 49) return "/icons/ats-warning.svg";
		return "/icons/ats-bad.svg";
	};

	const getSuggestionIcon = (type: "good" | "improve") => {
		return type === "good" ? "/icons/check.svg" : "/icons/warning.svg";
	};

	return (
		<div
			className={`bg-gradient-to-br ${getGradientBg()} to-white rounded-lg p-6 shadow-md`}>
			{/* Top Section */}
			<div className='flex items-center gap-4 mb-6'>
				<img src={getIcon()} alt='ATS Status' className='w-12 h-12' />
				<h2 className='text-2xl font-bold text-gray-800'>
					ATS Score - {score}/100
				</h2>
			</div>

			{/* Description Section */}
			<div className='mb-6'>
				<h3 className='text-lg font-semibold text-gray-700 mb-2'>
					ATS Compatibility
				</h3>
				<p className='text-gray-500 text-sm mb-4'>
					Your resume has been analyzed for Applicant Tracking System
					compatibility. Review the suggestions below to improve your score.
				</p>
			</div>

			{/* Suggestions List */}
			<div className='mb-6'>
				<div className='space-y-3'>
					{suggestions.map((suggestion, index) => (
						<div key={index} className='flex items-start gap-3'>
							<img
								src={getSuggestionIcon(suggestion.type)}
								alt={suggestion.type}
								className='w-5 h-5 mt-0.5 flex-shrink-0'
							/>
							<p className='text-gray-700 text-sm'>{suggestion.tip}</p>
						</div>
					))}
				</div>
			</div>

			{/* Closing Line */}
			<div className='text-center'>
				<p className='text-gray-600 text-sm font-medium'>
					Keep improving your resume to increase ATS compatibility!
				</p>
			</div>
		</div>
	);
};

export default ATS;
