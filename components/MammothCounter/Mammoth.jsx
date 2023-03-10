import { motion } from "framer-motion"
import Image from 'next/image';
import mammoth_img_src from "../../public/assets/mammoth.svg";
import config from "./mammoth.config";
const { crossingTime, mammothImgSize} = config;

const imgWidth = mammothImgSize; // px

export default function Mammoth({ crossing, count, totalCount }) {
  const animate = { x: `calc(100vw * ${totalCount} + ${imgWidth}px)` }
  const transition = { ease: "linear", duration: totalCount * crossingTime }
  const leftPos = `calc(-1 * 100vw * ${count} - ${imgWidth}px)`;
  return (
    <div style={{ visibility: crossing ? "visible" : "hidden" }}>
      <motion.div
        style={{ position: "absolute", left: leftPos }}
        animate={crossing ? animate : {}}
        transition={crossing ? transition : {}}
      >
        <Image src={mammoth_img_src} width="150" height="150" alt="Mammoth Walking"/>
        <div className="number-overlay">
          {count+1}
        </div>
      </motion.div>
    </div>
  );
}