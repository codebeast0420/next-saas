import { useEffect, useState } from "react"
import { getFactAndQuote, getFactCard, getQuoteCard } from "../src/utils/contentful"
import FactQuoteCard from "./factQuoteCard";
import SlideBtn from "./slideBtn";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'
import { Navigation } from "swiper/core";

const FactAndQuote = () => {
	const [header, setHeader] = useState('');
	const [description, setDescription] = useState('');
	const [factCards, setFactCards] = useState([]);
	const [quoteCards, setQuoteCards] = useState([{}]);

	useEffect(() => {
		getFactAndQuote().then((res) => {
			setHeader(res.header);
			setDescription(res.description);
		})

		getFactCard().then((res) => {
			setFactCards(res.items)
		})

		getQuoteCard().then((res) => {
			setQuoteCards(res.items);
		})
	}, [])
	return (
		<div className="w-full flex flex-col items-center" style={{ backgroundColor: "rgba(28, 202, 223, 0.08)" }}>
			<div className="w-full" style={{ maxWidth: "1374px" }}>
				<div className="w-full pl-[10%] pr-[10%] pt-[100px] pb-[100px]" >
					<p className="text-3xl font-bold text-[#142630]" style={{ fontFamily: "Lato" }}>{header}</p>
					<p className="text-lg mt-[5px] text-[#475060]" style={{ fontFamily: "Jost" }}>{description}</p>
					<div className="mt-[30px] flex">
						<Swiper
							slidesPerView={1.6}
							modules={[Navigation]}
							navigation={{
								nextEl: '.next-fact',
								prevEl: '.prev-fact',
							}}
						>
							{factCards.map((factCard, index) => (
								<SwiperSlide key={index}>
									<FactQuoteCard content={factCard.body} />
								</SwiperSlide>
							))}
							{quoteCards.map((quoteCard, index) => (
								<SwiperSlide key={index}>
									<FactQuoteCard creator={quoteCard.creator ? quoteCard.creator : ""} content={quoteCard.body} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<SlideBtn />
				</div>
			</div>
		</div>
	)
}

export default FactAndQuote;