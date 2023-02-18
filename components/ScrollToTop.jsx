import React, { useState, useEffect } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';
import css from "../styles/css.module.css";

const ScrollToTop = () => {
	const [showTopBtn, setShowTopBtn] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 150) {
				setShowTopBtn(true);
			} else {
				setShowTopBtn(false);
			}
		});
	}, []);

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className={css.top_to_btm}>
			{showTopBtn && (
				<RiArrowUpSLine className={`${css.icon_position} ${css.icon_style}`} onClick={goToTop} />
			)}
		</div>
	);
};

export default ScrollToTop;
