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
import { Suspense } from "react";
import HomepageLink from "./blog/homepage-link";
import { BriefcaseBusiness, Locate, LocateFixed, MapPin } from "lucide-react";

export const metadata = {
  title: "Ethan Grebmeier",
};

const HomePage: NextPage = () => {
  return (
    <main className="relative flex h-fit flex-col items-center justify-center overflow-hidden md:min-h-screen">
      <ContextWrapper>
        <div className="container relative my-4 grid h-fit w-full grid-cols-8 grid-rows-[repeat(31,60px)] items-center justify-center gap-2 px-4 sm:gap-4 md:my-16 lg:grid-rows-[repeat(10,70px)]">
          <Block
            animationDelay={0.1}
            className="relative col-span-8 row-span-3 bg-purple-300  md:grid-cols-2 lg:col-span-3 lg:row-span-3"
          >
            <div className=" flex h-full max-w-lg items-center justify-center gap-4 md:gap-8">
              <div className="relative aspect-square w-16 md:w-24">
                <Image fill alt="My doodled face" src="/images/Smile2.svg" />
              </div>
              <h1 className="font-serif text-4xl font-medium md:text-6xl">
                Ethan <br /> Grebmeier
              </h1>
            </div>
          </Block>
          <Block
            animationDelay={0.2}
            className="col-span-4 row-span-2 flex items-center justify-center gap-2 bg-blue-200 sm:gap-4 lg:col-span-2 lg:row-span-3 "
          >
            <MapPin size={50} />
            <h2 className="xs:text-2xl w-min font-serif text-xl leading-tight lg:text-3xl">
              {" "}
              Seattle, Washington
            </h2>
          </Block>
          <Block
            animationDelay={0.3}
            className="col-span-4 row-span-2 flex items-center justify-center overflow-hidden bg-red-300 p-0 pt-2 sm:p-0 sm:pt-2 md:p-0 lg:col-span-1 lg:row-[span_6/span_6]"
          >
            <Rain />
            <div className="relative h-full w-[60%] md:w-full">
              <Image
                fill
                className="pointer-events-none select-none object-cover object-top md:object-none lg:object-bottom"
                alt="The space needle"
                src="/images/needle.svg"
              />
            </div>
          </Block>
          <Block
            animationDelay={0.4}
            linkHref="https://assembleinc.com"
            linkText="Assembleinc.com"
            className="relative col-span-8 row-span-2 flex h-full w-full flex-col gap-4 bg-pink-200 text-black md:justify-center lg:col-span-2 lg:row-[span_6/span_6]"
          >
            <h2 className="mt-4 md:text-xl lg:-mt-24">
              {" "}
              Currently building cutting edge storefronts at{" "}
              <br className="hidden sm:block" />
              <span className="ml-1 text-3xl font-bold uppercase md:ml-0">
                {" "}
                Asmbl
              </span>
            </h2>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 240 240"
              className="absolute bottom-2 right-2 h-12 w-12 sm:bottom-2 sm:right-2 lg:bottom-8 lg:h-44 lg:w-44"
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
            className="relative col-span-8 row-span-3 flex items-center justify-center bg-yellow-200 lg:col-span-2 lg:row-span-3"
          >
            <h2>
              <FlipText
                text="Design Engineer"
                className="mt-1 font-serif text-5xl font-bold md:text-end md:text-4xl"
              />{" "}
            </h2>
          </Block>

          <Block
            animationDelay={0.6}
            className="isolate col-span-8 row-span-5 bg-white lg:col-span-3 lg:row-span-3"
          >
            <div className="absolute bottom-0 right-8 z-[-1]">
              <HandWave />
            </div>
            <p className="z-[3] mb-4 font-serif text-3xl"> Hey there! </p>
            <p className="z-[3] text-lg">
              {" "}
              Thanks for checking out my site! <br className="flex md:hidden" />{" "}
              <br className="flex md:hidden" /> I&rsquo;m a Design Engineer
              creating engaging, interactive experiences on the web.
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
              <span className="font-serif">@EthanGrebmeier</span>
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
            animationDelay={0.9}
            className="col-span-8 row-span-5 items-center bg-green-300 lg:col-span-2 lg:row-span-4"
          >
            <Suspense fallback={<div className="text-3xl"> Loading... </div>}>
              <Spotify />
            </Suspense>
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
            animationDelay={0.8}
            className="col-span-8 row-span-4 bg-indigo-300 lg:col-span-2 lg:row-span-4"
          >
            <HomepageLink />
          </Block>

          <Block
            animationDelay={1.1}
            className={`col-span-8 row-span-3 flex items-center justify-center bg-white lg:col-span-2 lg:row-span-3`}
          >
            {" "}
            <GetInTouch />
          </Block>
          <Block
            animationDelay={1.2}
            className="group col-span-8 row-span-1 flex items-center bg-orange-300 lg:col-span-2 lg:row-span-1"
          >
            <Link
              className="w-full font-serif text-2xl font-medium"
              href="https://www.linkedin.com/in/ethan-g-b23439116/"
              target="_blank"
            >
              <span className="flex w-full items-center justify-between group-hover:underline">
                {" "}
                LinkedIn{" "}
                <div className="rounded-lg border-2 border-black bg-yellow-300 p-2">
                  <BriefcaseBusiness size={20} />
                </div>
              </span>
            </Link>
          </Block>
        </div>
        <ResetTiles />
        <ContactModal />
      </ContextWrapper>
    </main>
  );
};

export default HomePage;
