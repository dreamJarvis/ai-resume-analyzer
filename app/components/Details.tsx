/** @format */

import React from "react";
import { cn } from "~/lib/utils";
import {
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionContent,
} from "./Accordian";

interface Tip {
	type: "good" | "improve";
	tip: string;
	explanation: string;
}

// Helper Components
interface ScoreBadgeProps {
	score: number;
}

const ScoreBadgeHelper: React.FC<ScoreBadgeProps> = ({ score }) => {
	const getStyles = () => {
		if (score > 69) {
			return {
				bg: "bg-green-100",
				text: "text-green-600",
				icon: "✓",
			};
		} else if (score > 39) {
			return {
				bg: "bg-yellow-100",
				text: "text-yellow-600",
				icon: "⚠",
			};
		} else {
			return {
				bg: "bg-red-100",
				text: "text-red-600",
				icon: "✕",
			};
		}
	};

	const styles = getStyles();

	return (
		<div
			className={cn(
				styles.bg,
				"px-3 py-1 rounded-full flex items-center gap-2",
			)}>
			<span className={cn(styles.text, "text-sm font-bold")}>
				{styles.icon}
			</span>
			<span className={cn(styles.text, "text-sm font-semibold")}>
				{score}/100
			</span>
		</div>
	);
};

interface CategoryHeaderProps {
	title: string;
	categoryScore: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
	title,
	categoryScore,
}) => {
	return (
		<div className='flex items-center justify-between'>
			<h3 className='text-lg font-semibold text-gray-800'>{title} </h3>
			<ScoreBadgeHelper score={categoryScore} />
		</div>
	);
};

interface CategoryContentProps {
	tips: Tip[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
	const goodTips = tips.filter((t) => t.type === "good");
	const improveTips = tips.filter((t) => t.type === "improve");

	return (
		<div className='space-y-6'>
			{/* Tips Grid */}
			<div className='grid grid-cols-2 gap-4'>
				{tips.map((tip, index) => (
					<div key={index} className='flex items-start gap-3'>
						<div
							className={cn(
								"w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
								tip.type === "good" ? "bg-green-100" : "bg-yellow-100",
							)}>
							<span
								className={cn(
									"text-sm font-bold",
									tip.type === "good" ? "text-green-600" : "text-yellow-600",
								)}>
								{tip.type === "good" ? "✓" : "!"}
							</span>
						</div>
						<p className='text-sm text-gray-700'>{tip.tip}</p>
					</div>
				))}
			</div>

			{/* Explanation Boxes */}
			<div className='space-y-3'>
				{goodTips.length > 0 && (
					<div>
						<h4 className='text-sm font-semibold text-green-700 mb-2'>
							Strengths
						</h4>
						{goodTips.map((tip, index) => (
							<div
								key={index}
								className='mb-2 p-3 bg-green-50 border-l-4 border-green-500 rounded'>
								<p className='text-sm text-gray-700'>{tip.explanation}</p>
							</div>
						))}
					</div>
				)}

				{improveTips.length > 0 && (
					<div>
						<h4 className='text-sm font-semibold text-yellow-700 mb-2'>
							Areas to Improve
						</h4>
						{improveTips.map((tip, index) => (
							<div
								key={index}
								className='mb-2 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded'>
								<p className='text-sm text-gray-700'>{tip.explanation}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

// Main Component

const Details = ({ feedback }: { feedback: Feedback }) => {
	const categories = [
		{
			id: "tone-style",
			title: "Tone & Style",
			score: feedback.toneAndStyle.score,
			tips: feedback.toneAndStyle.tips,
		},
		{
			id: "content",
			title: "Content",
			score: feedback.content.score,
			tips: feedback.content.tips,
		},
		{
			id: "structure",
			title: "Structure",
			score: feedback.structure.score,
			tips: feedback.structure.tips,
		},
		{
			id: "skills",
			title: "Skills",
			score: feedback.skills.score,
			tips: feedback.skills.tips,
		},
	];

	return (
		<div className='w-full max-w-2xl mx-auto p-4'>
			<h2 className='text-2xl font-bold text-gray-900 mb-6'>
				Feedback Details
			</h2>
			<Accordion allowMultiple className='space-y-2'>
				{categories.map((category) => (
					<AccordionItem key={category.id} id={category.id}>
						<AccordionHeader itemId={category.id}>
							<CategoryHeader
								title={category.title}
								categoryScore={category.score}
							/>
						</AccordionHeader>
						<AccordionContent itemId={category.id}>
							<CategoryContent tips={category.tips} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default Details;
