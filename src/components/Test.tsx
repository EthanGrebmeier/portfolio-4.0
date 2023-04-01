"use client";

import { type NextPage } from "next";
import Block from "./Block";
import ContextWrapper from "./context/ContextWrapper";
import Rain from "./Rain";
import ResetTiles from "./ResetTiles";

export const metadata = {
  title: "Ethan Grebmeier",
};

// const generateBlocks = () => {
//   return Array.from(Array(5)).map(() => ({
//     width: `${Math.floor(Math.random() * 600)}px `,
//     height: `${Math.floor(Math.random() * 300) + 50}px `,
//   }));
// };

const Test: NextPage = () => {
  // const [blocks, setBlocks] = useState<
  //   {
  //     width: string;
  //     height: string;
  //   }[]
  // >(generateBlocks());

  // useEffect(() => {
  //   setBlocks(generateBlocks());
  // }, []);

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-blue-100 md:min-h-screen">
      <ContextWrapper>
        <Block className="col-span-4 row-span-1 flex h-44 w-80 items-center gap-2 bg-pink-300 sm:gap-6 lg:col-span-2 lg:row-span-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-16 w-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <h2 className="w-min text-2xl xl:text-3xl"> Seattle, Washington</h2>
          <Rain />
        </Block>
        {/* <div className="container flex h-fit w-full grid-cols-8 grid-rows-[repeat(14,160px)] flex-wrap items-center justify-center gap-4 px-4 py-16 lg:grid-rows-[repeat(14,70px)]">
          <Block style={blocks[0]} className="bg-red-300">
            <div className="aspect-square min-w-[2rem] border-2 border-solid border-black bg-red-300 @md:bg-yellow-300 @lg:rounded-full @[200px]:rounded-full @[200px]:bg-blue-300"></div>
          </Block>
          <Block style={blocks[1]} className="bg-blue-300">
            <div className="aspect-square min-w-[2rem] border-2 border-solid border-black bg-red-300 @md:rounded-full @md:bg-yellow-300 @[200px]:rounded-full @[200px]:bg-blue-300"></div>
          </Block>
          <Block style={blocks[2]} className="bg-green-300">
            <div className="aspect-square min-w-[2rem] border-2 border-solid border-black bg-red-300 @md:bg-yellow-300 @[200px]:rounded-full @[200px]:bg-blue-300 "></div>
          </Block>

          <Block style={blocks[3]} className="bg-yellow-300">
            <div className="aspect-square min-w-[2rem] border-2 border-solid border-black bg-red-300 @md:bg-yellow-300 @[200px]:rounded-full @[200px]:bg-blue-300 "></div>
          </Block>
          <Block style={blocks[4]} className="bg-purple-300">
            <div className="aspect-square min-w-[2rem] border-2 border-solid border-black bg-red-300 @md:bg-yellow-300 @[200px]:rounded-full @[200px]:bg-blue-300 "></div>
          </Block>

          <Block style={blocks[0]} className="bg-orange-300">
            <div className="aspect-square min-w-[2rem] border-2 border-solid border-black bg-red-300 @md:bg-yellow-300 @[200px]:rounded-full @[200px]:bg-blue-300 "></div>
          </Block>
        </div> */}
        <ResetTiles />
      </ContextWrapper>
      {/* <button
        onClick={() => setBlocks(generateBlocks())}
        className="fixed bottom-12 right-8 z-[100] flex w-fit rounded-xl bg-white px-8 py-4 shadow-md"
      >
        Reroll widths
      </button> */}
    </main>
  );
};

export default Test;
