import Image from "next/image";
import tally1Color from "../../public/assets/tally1.svg"
import tally1Gray from "../../public/assets/tally1-gray.svg"
import tally2Color from "../../public/assets/tally2.svg"
import tally2Gray from "../../public/assets/tally2-gray.svg"
import tally3Color from "../../public/assets/tally3.svg"
import tally3Gray from "../../public/assets/tally3-gray.svg"
import tally4Color from "../../public/assets/tally4.svg"
import tally4Gray from "../../public/assets/tally4-gray.svg"
import tally5Color from "../../public/assets/tally5.svg"
import tally5Gray from "../../public/assets/tally5-gray.svg"
import fingerImageSource from "../../public/assets/pointing-hand.png"

const tallyImageSources = [
  {
    gray: tally1Gray,
    color: tally1Color
  },
    {
    gray: tally2Gray,
    color: tally2Color
  },
    {
    gray: tally3Gray,
    color: tally3Color
  },
    {
    gray: tally4Gray,
    color: tally4Color
  },
    {
    gray: tally5Gray,
    color: tally5Color
  },
]

export default function CountingFigure({ count, isTarget }) {
  return (
    <div className="counting-figure flex flex-col justify-between">
      <div className="counting-tally flex flex-column items-center justify-around">
        <Image
          height={100}
          width={44}
          src={
            isTarget ?
              tallyImageSources[count % tallyImageSources.length].color
              :
              tallyImageSources[count % tallyImageSources.length].gray
          }
          alt={`Counting Figure ${count}`}
        />
      </div>
      <div className="counting-hand flex items-center justify-around" style={{ width: "22px" }}>
        {
          isTarget ?
            <Image
              height={64}
              width={22}
              src={fingerImageSource}
              alt={`Pointing Finger for ${count}`}
            />
            :
            ""
        }
      </div>
    </div>
  );
}