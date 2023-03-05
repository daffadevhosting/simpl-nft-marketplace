import { useState } from 'react';
import css from "../styles/css.module.css";
import { Image, Icon, Link, } from '@chakra-ui/react';
import { swapUrl } from "../const/aLinks";

const Logo = '/icons/pancakeswap.png'
const SimPL = '/icons/SimPL.png'

export default function News() {
 const [isVisible, setIsVisible] = useState(true);

function handleCloseBar() {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 6 * 60 * 60 * 1000);
  }


  return (
<>
      {isVisible && (
<div id="newsBar" className={css.newsBar}>
<span><b>SimPL</b> tokens, are now available for swap on</span> <Link href={swapUrl()} className={css.linkNews} color="turquoise" target="_blank" rel="noopener noreferrer" title="Swap SimPL Token"> <Image src={Logo} width={18} height={18} alt="pancakeswap" /> <b>PancakeSwap</b></Link>
<span className={css.closeBtn} onClick={handleCloseBar}>&times;</span>
</div>
      )}
    </>
  );
}
