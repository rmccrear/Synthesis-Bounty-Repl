import {CSSProperties} from "react";
import { motion } from "framer-motion"
import Image from 'next/image';
import mammoth_img_src from "../../public/assets/mammoth.svg";
import config from "./mammoth.config";
const { crossingTime, mammothImgSize, displayWidth} = config;

const imgWidth = mammothImgSize; // px
const imgHeight = mammothImgSize;

const style : Record<string, CSSProperties> = {
  numberOverlay: {
    "fontFamily": "\"Comic Sans MS\", \"Comic Sans\", cursive",
  }
}

const tailwindClasses = {
  numberOverlay: "absolute text-4xl font-bold text-slate-50 inset-[50px] ",
  movingContainer: "absolute ",
}

export default function Mammoth({ crossing, count, totalCount } : { crossing: boolean, count: number, totalCount: number}) {
  const animate = { x: `calc(${displayWidth} * ${totalCount} + ${imgWidth}px)` }
  const transition = { ease: "linear", duration: totalCount * crossingTime }
  const leftPos = `calc(-1 * ${displayWidth} * ${count} - ${imgWidth}px)`;
  return (
    <div className={crossing ? "visible" : "invisible" }>
      <motion.div
        className={tailwindClasses.movingContainer}
        style={{ left: leftPos }}
        animate={crossing ? animate : {}}
        transition={crossing ? transition : {}}
      >
        <Image src={mammoth_img_src} width={imgWidth} height={imgHeight} alt="A woolly mammoth walking across the screen."/>
        <div className={tailwindClasses.numberOverlay} style={style.numberOverlay}>
          {count+1}
        </div>
      </motion.div>
    </div>
  );
}