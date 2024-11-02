import Header from "./Component/Header";
import profil from "./assets/profil.jpg";
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	Card,
	CardBody,
	CardHeader,
	Carousel,
	Chip,
	IconButton,
	SpeedDial,
	SpeedDialHandler,
	Tooltip,
	Typography,
} from "@material-tailwind/react";
import data from "./data.json";
import "./App.css";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUpIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

function App() {
	const [isMobile, setIsMobile] = React.useState(false);
	const [open, setOpen] = React.useState(1);

	const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

	useEffect(() => {
		const handleResize = () => {
			let p;
			if (window.innerWidth < 640) {
				p = 1;
			} else if (window.innerWidth < 768) {
				p = 5;
			} else if (window.innerWidth < 1024) {
				p = 7;
			} else {
				p = 8;
			}
            const toMatch = [
                /Android/i,
                /webOS/i,
                /iPhone/i,
                /iPad/i,
                /iPod/i,
                /BlackBerry/i,
                /Windows Phone/i
            ];
			setIsMobile(experienceSize + p * 16 * 2 > window.innerWidth || toMatch.some((toMatchItem) => {
                return navigator.userAgent.match(toMatchItem);
            }));
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

    const renderHtml = (html: string) => <div dangerouslySetInnerHTML={{ __html: html }}></div>;

	const realisation = data.realisation.map((item, j) => (
		<Card
			className="mt-6 my-6 mx-auto lg:w-80 md:w-60 sm:w-80 hover:shadow-xl transition-shadow"
			key={item.name + "_" + j}
		>
			<CardHeader color="white" className="relative border">
				{item.img.length === 1 ? (
					item.img[0].endsWith("mp4") ? (
						<video className="max-h-72 m-auto" controls>
							<source
								src={require("./assets/" + item.img[0])}
								type="video/mp4"
							/>
							Votre navigateur ne supporte pas la vidéo.
						</video>
					) : (
						<img
							src={require("./assets/" + item.img[0])}
							alt={item.name}
							className="max-h-72 m-auto"
						/>
					)
				) : (
					<Carousel
						prevArrow={({ handlePrev, firstIndex }) => (
							<IconButton
								variant="text"
								size="lg"
								onClick={handlePrev}
								className="!absolute top-2/4 left-4 -translate-y-2/4"
							>
								<ArrowLeftIcon
									className="size-6"
									strokeWidth={2}
									color={firstIndex ? "#d1d5db" : "black"}
								/>
							</IconButton>
						)}
						nextArrow={({ handleNext, lastIndex }) => (
							<IconButton
								variant="text"
								color="black"
								size="lg"
								onClick={handleNext}
								className="!absolute top-2/4 !right-4 -translate-y-2/4"
							>
								<ArrowRightIcon
									className="size-6"
									strokeWidth={2}
									color={lastIndex ? "#d1d5db" : "black"}
								/>
							</IconButton>
						)}
						className="items-center"
					>
						{item.img.map((img, i) =>
							img.endsWith("mp4") ? (
								<video
									key={item.name + "_" + i}
									className="max-h-72 m-auto"
									controls
								>
									<source
										src={require("./assets/" + img)}
										type="video/mp4"
									/>
								</video>
							) : (
								<img
									src={require("./assets/" + img)}
									alt={item.name + "_" + i}
									key={item.name + "_" + i}
									className="max-h-72 m-auto"
								/>
							)
						)}
					</Carousel>
				)}
			</CardHeader>
			<CardBody>
				<Typography variant="h5" color="blue-gray" className="mb-2">
					{item.name}
				</Typography>
				<Typography>{renderHtml(item.desc)}</Typography>
			</CardBody>
		</Card>
	));
	const experienceMobile = data.experience_formation.map((item, j) => (
		<Accordion key={item.name + "_" + j} open={open === j + 1}>
			<AccordionHeader
				onClick={() => handleOpen(j + 1)}
				className={
					"px-4 " +
					(j === data.experience_formation.length - 1 &&
					open !== j + 1
						? "border-b-0"
						: "")
				}
			>
				{open === j + 1 ? (
					<div className="flex flex-col">
						<Typography color="blue-gray" variant="h5">
							{item.name}
						</Typography>
						<Typography color="blue-gray" variant="h6">
							{item.where}
						</Typography>
						<Typography color="blue-gray" variant="paragraph">
							{item.what}
						</Typography>
					</div>
				) : (
					item.name
				)}
			</AccordionHeader>
			<AccordionBody className="px-4  whitespace-pre-line">
				{item.desc}
				{item.special && (
					<Typography
						variant="small"
						color="blue-gray"
						className="font-normal opacity-80 before:content-['✭'] before:mr-1 before:text-yellow-800 after:content-['✭'] after:ml-1 after:text-yellow-800"
					>
						{item.special}
					</Typography>
				)}
			</AccordionBody>
		</Accordion>
	));

	const experienceSize =
		data.experience_formation
			.map((item) => item.date.length * 8)
			.reduce((a, b) => a + b, 0) + 48;

	const experience = data.experience_formation.map((item, j) => {
		let width = item.date.length * 8;
		let width2 = Math.sqrt(2 * 80 ** 2);
		let translateX = (84 * (Math.sqrt(2) - 1)) / Math.sqrt(2);
		return (
			<div
				className={
					"h-full flex " +
					(j % 2 === 0 ? "flex-col" : "flex-col-reverse")
				}
				key={item.name + "_" + j}
			>
				<div
					className={
						"h-1/2 flex " +
						(j % 2 === 0 ? "flex-col" : "flex-col-reverse")
					}
					style={{ width: width + "px" }}
				>
					<div className="flex h-1/2 relative">
						<Tooltip
							placement="right"
							className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
							content={
								<div className="w-80">
									<Typography color="blue-gray" variant="h5">
										{item.name}
									</Typography>
									<Typography color="blue-gray" variant="h6">
										{item.where}
									</Typography>
									<Typography
										color="blue-gray"
										variant="paragraph"
									>
										{item.what}
									</Typography>
									<Typography
										variant="small"
										color="blue-gray"
										className="font-normal opacity-80 whitespace-pre-line"
									>
										{item.desc}
									</Typography>
									{item.special && (
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal opacity-80 before:content-['✭'] before:mr-1 before:text-yellow-800 after:content-['✭'] after:ml-1 after:text-yellow-800"
										>
											{item.special}
										</Typography>
									)}
								</div>
							}
						>
							<Chip
								size="lg"
								value={item.date}
								className={
									"absolute left-1/2 z-10 text-sm -translate-x-1/2" +
									(j % 2 === 0
										? " -translate-y-full top-full"
										: " top-0") +
									(item.type === "formation"
										? " bg-red-900"
										: "")
								}
							/>
						</Tooltip>
					</div>
					<div className="flex flex-row-reverse h-1/2 relative w-40">
						<div
							className={
								"border-b border-black top-1/2 absolute " +
								(j % 2 === 0 ? "rotate-45" : "-rotate-45")
							}
							style={
								{
									width: width2 + "px",
									"--tw-translate-x": translateX + "px",
								} as React.CSSProperties
							}
						></div>
						<div
							className={
								"absolute left-full size-4 bg-white z-10 border-black border-2 rounded-full -translate-y-1/2 " +
								(j % 2 === 0 ? "top-full" : "")
							}
						></div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className="scroll-smooth" id="top">
			<Header />
			<div className="fixed bottom-8 right-8 hidden sm:block">
				<SpeedDial>
					<SpeedDialHandler>
						<a href="#top">
							<IconButton size="lg" className="rounded-full">
								<ArrowUpIcon className="h-5 w-5" />
							</IconButton>
						</a>
					</SpeedDialHandler>
				</SpeedDial>
			</div>
			<div
				className={
					"max-w-full flex md:p-32 sm:p-20 p-12 md:flex-row flex-col"
				}
				id="qui-suis-je"
			>
				<div className="h-fit md:my-auto sm:mr-10 self-center mb-10">
					<img
						src={profil}
						className="md:max-h-[50rem] lg:max-h-96 max-h-80 rounded-lg"
						alt="profil"
					/>
				</div>
				<div className={"flex flex-col m-auto"}>
					<Typography variant="h2" className="mb-5">
						Qui suis-je ?
					</Typography>
					<Typography variant="lead">
                    Récemment arrivée sur Morges, 
je recherche une équipe avec qui  relever de nouveaux défis au quotidien. Dès à présent disponible,
je recherche un poste de chef de projet, chargée de communication ou social media manager. 😀
					</Typography>
				</div>
			</div>
			<div
				className="flex max-w-full flex-col lg:p-32 md:p-28 sm:p-20 p-4 lg:pt-24 md:pt-20 sm:pt-12 pt-0 sm:!pb-12 !pb-4"
				id="realisation"
			>
				<Typography variant="h2" className="mb-8 ml-8">
					Mes réalisations
				</Typography>
				<div className="max-w-full grid flex-wrap justify-around gap-4 grid-cr items-center">
					{realisation}
				</div>
			</div>
			<div
				className="flex max-w-full flex-col lg:p-32 md:p-28 sm:p-20 p-4 lg:pt-24 md:pt-20 sm:pt-12 pt-0 sm:!pb-12 !pb-4"
				id="xp"
			>
				<Typography variant="h2" className="mb-8 ml-8">
					Mes expériences et <span className={isMobile ? "" : "bg-red-900 text-white"}>{isMobile ? "" : <>&nbsp;</>} formations &nbsp;</span>
				</Typography>
				{/* <div
					className={
						"max-w-full h-80 flex flex-row relative w-fit m-auto " +
						(isMobile ? "none" : "")
					}
				>
					{experience}
					<div className="w-12"></div>
					<div className="w-full absolute h-[1px] border-b-2 border-black top-1/2"></div>
				</div> */}
				<div
					className={
						"max-w-full flex flex-col relative w-fit m-auto border-blue-gray-100 border rounded-lg "
					}
				>
					{experienceMobile}
				</div>
			</div>
		</div>
	);
}

export default App;
