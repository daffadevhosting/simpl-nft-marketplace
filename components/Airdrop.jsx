import React from "react";
import Script from "next/script";
import css from "../styles/css.module.css";




export default function Airdrop() {

return (
    <div className={css.boxAirdrop} data-tilt data-tilt-max="50" data-tilt-speed="400" data-tilt-glare="true" data-tilt-gyroscope="true">
    <div className={`${css.little_box} ${css.bg}`}></div>
    <div className={`${css.little_box} ${css.imgBox}`}>
        <img src="simpl.png"/>
    </div>
    <div className={`${css.little_box} ${css.desc}`}>
        <h2>SimPL member only</h2>
    </div>
    <div className={css.card}>
    </div>
    </div>
  );
}
