import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function CodeBlock({
  position,
  heading,
  subheading,
  codePart,
  codeColor,
  backgroundGradient,
}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* Part-1 */}
      <div className="w-full md:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>
      </div>

      {/* Part-2 */}
      <div className=" h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] -z-100">
        {backgroundGradient}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codePart, 6000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
}
