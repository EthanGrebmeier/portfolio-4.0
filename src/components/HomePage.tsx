import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Block from "./Block";
import CodeBackground from "./CodeBackground";
import ContactModal from "./ContactModal";
import ContextWrapper from "./context/ContextWrapper";
import FlipText from "./FlipText";
import GetInTouch from "./GetInTouch";
import HandWave from "./HandWave";
import Rain from "./Rain";
import ResetTiles from "./ResetTiles";
import Spotify from "./Spotify";
import VisitorCounter from "./VisitorCounter";

export const metadata = {
  title: "Ethan Grebmeier",
};

const HomePage: NextPage = () => {
  return (
    <main className="relative flex h-fit flex-col items-center justify-center overflow-hidden md:min-h-screen">
      <ContextWrapper>
        <div className="container relative my-4 grid h-fit w-full grid-cols-8 grid-rows-[repeat(28,50px)] items-center justify-center gap-2 px-4 sm:gap-4 md:my-16 lg:grid-rows-[repeat(10,70px)]">
          <Block
            animationDelay={0.1}
            className="relative col-span-8 row-span-4 bg-purple-300  md:grid-cols-2 lg:col-span-3 lg:row-span-3"
          >
            <div className=" flex h-full max-w-lg flex-col justify-center gap-4">
              <h1 className="text-6xl font-bold">
                Ethan <br /> Grebmeier
              </h1>
              <FlipText
                className="w-full text-end"
                text="Developing rich ecommerce experiences"
              />{" "}
            </div>
            <div className="flex h-full w-full items-center justify-center"></div>
          </Block>
          <Block
            animationDelay={0.2}
            className="col-span-4 row-span-2 flex items-center gap-2 bg-pink-300 sm:gap-6 lg:col-span-2 lg:row-span-2"
          >
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
            <h2 className="w-min text-lg md:text-2xl xl:text-3xl">
              {" "}
              Seattle, Washington
            </h2>
            <Rain />
          </Block>
          <Block
            animationDelay={0.3}
            className="col-span-4 row-span-2 flex items-center justify-center overflow-hidden bg-blue-300 lg:col-span-1 lg:row-[span_6/span_6]"
          >
            <Image
              fill
              className="pointer-events-none select-none object-cover"
              alt="The space needle"
              src="https://images.unsplash.com/photo-1613525850352-52de526e2336?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80"
            />
          </Block>
          <Block
            animationDelay={0.4}
            linkHref="https://assembleinc.com"
            linkText="Assembleinc.com"
            className="relative col-span-8 row-span-3 flex h-full w-full flex-col gap-4 bg-[#290C54] text-white md:justify-center lg:col-span-2 lg:row-[span_6/span_6]"
          >
            <h2 className="mt-4 text-xl lg:-mt-24">
              {" "}
              Currently building cutting edge storefronts at{" "}
              <br className="hidden sm:block" />
              <span className="ml-1 text-3xl font-bold md:ml-0">
                {" "}
                Assemble Inc.{" "}
              </span>
            </h2>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 240 240"
              className="absolute bottom-0 right-0 h-12 w-12 sm:right-2 sm:bottom-2 lg:bottom-8 lg:h-44 lg:w-44"
              fill="white"
            >
              <defs></defs>
              <title>Assemble_Assets</title>
              <polygon
                className="cls-1"
                points="28.84 36.67 28.84 204.88 59.22 204.88 59.22 196.34 38.26 196.34 38.26 45.2 59.22 45.2 59.22 36.67 28.84 36.67"
              />
              <polygon
                className="cls-1"
                points="180.78 36.67 180.78 45.2 201.74 45.2 201.74 196.34 180.78 196.34 180.78 204.88 211.16 204.88 211.16 36.67 180.78 36.67"
              />
              <path
                className="cls-1"
                d="M112.19,64.91,77,166.7H87.85l8.93-26.6h46.43l8.93,26.6H163L127.81,64.91ZM99.65,131.56l18.45-55h3.79l18.44,55Z"
              />
            </svg>
          </Block>

          <Block
            animationDelay={0.5}
            className="relative col-span-8 row-span-3 flex items-center justify-center bg-yellow-300 lg:col-span-2 lg:row-span-4"
          >
            <h2>
              <FlipText
                text="Frontend Developer"
                className="mt-1 text-5xl font-bold md:text-end md:text-4xl xl:text-6xl"
              />{" "}
            </h2>
          </Block>

          <Block
            animationDelay={0.6}
            className="isolate col-span-8 row-span-6 bg-white lg:col-span-3 lg:row-span-3"
          >
            <div className="absolute bottom-0 right-8 z-[-1]">
              <HandWave />
            </div>
            <p className="z-[3] mb-4 text-3xl font-bold"> Hey there! </p>
            <p className="z-[3] text-xl">
              {" "}
              Thanks for checking out my site! <br className="flex md:hidden" />{" "}
              <br className="flex md:hidden" /> I&rsquo;m a frontend developer
              thats passionate about creating engaging, interactive experiences
              on the web.
            </p>
          </Block>
          <Block
            animationDelay={0.7}
            className="col-span-8 row-span-3 bg-black lg:col-span-2 lg:row-span-4"
            linkHref="https://github.com/EthanGrebmeier"
            linkText="View profile"
          >
            <CodeBackground />
            <h2 className="text-2xl text-white xl:text-3xl">
              {" "}
              @EthanGrebmeier on Github
            </h2>
            <div className=" absolute bottom-0 right-2">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-24 w-24 fill-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
                ></path>
              </svg>
            </div>
          </Block>
          <Block
            animationDelay={0.8}
            className="col-span-8 row-span-3 bg-indigo-300 lg:col-span-2 lg:row-span-4"
          >
            <div className="flex h-full flex-col justify-between">
              <h2 className="text-3xl"> You are visitor number: </h2>
              <VisitorCounter />
            </div>
          </Block>
          <Block
            animationDelay={0.9}
            className="col-span-8 row-span-5 items-center bg-green-300 lg:col-span-2 lg:row-span-4"
          >
            {/* @ts-expect-error Upstream issue fixed later on */}
            <Spotify />
          </Block>
          {/* <Block
            animationDelay={1}
            className="col-span-8 row-span-1 bg-orange-300 lg:col-span-2 lg:row-span-4"
          >
            <Rainbow />
            <ModelView>
              <ShoppingCart />
            </ModelView>
          </Block> */}

          <Block
            animationDelay={1.2}
            className="group col-span-8 row-span-1 flex items-center bg-amber-200 lg:col-span-2 lg:row-span-1"
          >
            <Link className="w-full text-3xl" href="/resume">
              <span className="flex w-full items-center justify-between group-hover:underline">
                {" "}
                Resume{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-10 w-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                  />
                </svg>
              </span>
            </Link>
          </Block>

          <Block
            animationDelay={1.2}
            className="group col-span-8 row-span-1 flex items-center bg-blue-300 lg:col-span-2 lg:row-span-1"
          >
            <Link
              className="w-full text-3xl"
              href="https://www.linkedin.com/in/ethan-g-b23439116/"
              target="_blank"
            >
              <span className="flex w-full items-center justify-between group-hover:underline">
                {" "}
                LinkedIn{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-10 w-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
              </span>
            </Link>
          </Block>
          <Block
            animationDelay={1.1}
            className={`col-span-8 row-span-2 flex items-center justify-center bg-white lg:col-span-2 lg:row-span-2`}
          >
            {" "}
            <GetInTouch />
          </Block>
        </div>
        <ResetTiles />
        <ContactModal />
      </ContextWrapper>
    </main>
  );
};

export default HomePage;
