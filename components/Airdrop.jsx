import React from "react";
import Script from "next/script";
import css from "../styles/css.module.css";




export default function Airdrop() {


return (
    <div className={css.boxAirdrop} data-tilt data-tilt-max="15" data-tilt-speed="100" data-tilt-glare="true" data-tilt-gyroscope="true">
    <div className={`${css.little_box} ${css.bg}`}></div>
    <div className={`${css.little_box} ${css.imgBox}`}>
        <img src="simpl.png"/>
    </div>
    <div className={`${css.little_box} ${css.desc}`}>
        <h2>SimPL member only</h2>
    </div>
    <div className={css.card}>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js" integrity="sha512-RX/OFugt/bkgwRQg4B22KYE79dQhwaPp2IZaA/YyU3GMo/qY7GrXkiG6Dvvwnds6/DefCfwPTgCXnaC6nAgVYw==" crossorigin="anonymous" referrerpolicy="no-referrer"></Script>
    </div>
    </div>
  );
}
