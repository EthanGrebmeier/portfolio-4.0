import {
  ArrowRight,
  BookCopy,
  Code2,
  DoorClosed,
  DoorOpen,
  ExternalLink,
  Gift,
  Hammer,
  Home,
  KeyRound,
  Scroll,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Badge from "~/components/blog/badge";
import Icon from "~/components/blog/fillaneed/icon";
import ImageText from "~/components/blog/image-text";

const BlogArticle = () => {
  return (
    <div className="bg-background px-4 py-16">
      <div className="mx-auto  max-w-screen-xl">
        <section className=" mb-24 grid gap-16 lg:grid-cols-[2fr_1fr]">
          <div className="relative mb-4 aspect-[6/4] w-full overflow-hidden rounded-xl border border-black">
            <Image
              className="object-cover"
              fill
              src="/images/fillaneed/apartment.png"
              alt="a fillaneed wishlist"
            />
            <p className="absolute bottom-2 right-2 mb-0 mt-4 rounded-[4px] border border-black bg-background px-2 py-[2px] text-end">
              A fillaneed wishlist
            </p>
          </div>
          <div className="prose mx-auto w-full leading-snug text-black prose-h1:mb-0 prose-p:mb-0 prose-p:mt-2">
            <div className="mb-4 grid grid-cols-1  font-sans ">
              <div className="not-prose mb-2 flex justify-between border-b border-black pb-4 font-serif ">
                <div>
                  <h1 className="font-serif text-4xl font-medium">fillaneed</h1>
                  <p className="text-sm"> Build your dream wishlist </p>
                  <p> 2024</p>
                  <Link
                    className="text-sm hover:underline"
                    href="https://fillaneed.xyz"
                    target="_blank"
                  >
                    <div className="flex items-center gap-2">
                      https://fillaneed.xyz <ExternalLink size={15} />{" "}
                    </div>
                  </Link>
                  <Link
                    className="text-sm hover:underline"
                    href="https://github.com/EthanGrebmeier/wishlist"
                    target="_blank"
                  >
                    <div className="flex items-center gap-2">
                      Repository <Code2 size={15} />{" "}
                    </div>
                  </Link>
                </div>
                <Badge color="yellow" icon={<Hammer size={20} />}>
                  Project
                </Badge>
              </div>
              <p>
                Whenever a birthday or holiday comes around, I scramble to
                figure out exactly what I want to ask for from friends and
                family. I have this problem where every time that I see
                something cool that I may want to get, the idea of it is
                immediately ejected from my brain.
              </p>
              <p className="inline">
                The solution to this problem must be easy, right? I just need to
                write the ideas down and boom, problem solved. But what fun is
                there in doing things the easy way?
              </p>
              <span className="mt-1 block">
                <p className="inline">
                  I immediately got to work ideating, designing and prototyping
                  a small wishlist builder that would eventually scope-creep
                  itself into a full fledged
                  wishlist/registry/whatever-kind-of-list-you-want builder
                  called fillaneed
                </p>
                <span className="mx-1 inline-block rounded-sm border border-black bg-green-400 p-[1px]">
                  {" "}
                  <Scroll size={14} />{" "}
                </span>
              </span>

              <p>
                This project was a ton of fun and I&apos;m proud to have built a
                tool that is both performant and a joy to interact with.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-6 w-fit">
          <div className="flex flex-col gap-12 border-b border-black pb-16">
            <Badge color="green" icon={<KeyRound size={20} />}>
              Key Features
            </Badge>
            <div className="flex flex-col gap-20 ">
              <div className="grid gap-4 md:grid-cols-[2fr_1fr] md:gap-14">
                <div className="relative aspect-[6/4] w-full overflow-hidden rounded-xl border border-black">
                  <Image
                    className="object-cover"
                    fill
                    src="/images/fillaneed/secret.png"
                    alt="fillaneed keep it a secret mode"
                  />
                </div>
                <div className="flex flex-col gap-2 text-end">
                  <h3 className="font-serif text-3xl">Keep it a secret mode</h3>
                  <p className="prose">fillaneed&apos;s secret sauce</p>
                  <p className="prose ">
                    Keep it a secret mode allows friends and family to select
                    products from your wishlist without you knowing what
                    you&apos;re getting.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-14">
                <div className="relative aspect-[6/4] w-full overflow-hidden rounded-xl border border-black md:order-2">
                  <Image
                    className="object-cover"
                    fill
                    src="/images/fillaneed/autofill.gif"
                    alt="fillaneed keep it a secret mode"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-3xl">Product Autofill</h3>
                  <p className="prose">
                    Making it easy to add products to your wishlist was a high
                    priority for fillaneed.
                  </p>
                  <p className="prose">
                    Product autofill allows you to quickly add products to your
                    wishlist by typing in the URL of the product. We scrape the
                    product data from the URL and add it to your wishlist.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[2fr_1fr] md:gap-14">
                <div className="relative aspect-[6/4] w-full overflow-hidden rounded-xl border border-black">
                  <Image
                    className="object-cover"
                    fill
                    src="/images/fillaneed/receipt.gif"
                    alt="fillaneed keep it a secret mode"
                  />
                </div>
                <div className="flex flex-col gap-2 text-end">
                  <h3 className="font-serif text-3xl">Gift Receipts</h3>
                  <p className="prose">The most exciting part!</p>
                  <p className="prose">
                    Easily clear out products from your wishlist as you receive
                    them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-14 flex w-fit flex-col gap-20">
          <Badge color="purple" icon={<WandSparkles size={20} />}>
            My Learnings
          </Badge>
          <ImageText
            image={
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src="/images/fillaneed/Scraper.svg"
                  width={656}
                  height={330}
                  alt="a sand scraper digging up data"
                />
              </div>
            }
            text={
              <div className="flex flex-col gap-2">
                <h3 className="text-balance font-serif text-3xl">
                  Web scraping
                </h3>
                <span className="prose">
                  <p>
                    Fillaneed's entire selling point is that it is an easy to
                    use application to add and share products from your wishlist
                    with friends and family. The easy to use part goes straight
                    out the window if a user is having to manually copy over all
                    of their product information. This makes Fillaneed's
                    autofill functionality absolutely essential.
                  </p>
                  <p>
                    My initial plan was to create an API that utilized puppeteer
                    under the hood to visit a site on behalf of the user,
                    scraping all relevant data and passing that back to the
                    client. Unfortunately, I quickly realized that between the
                    difficulty with standing puppeteer up on AWS and the
                    potential cost that I could incur made this a less than
                    ideal solution.
                  </p>
                  <p>
                    Instead, I decided to keep it real simple and write a simple
                    html scraper that was smart enough to look for commonly used
                    metadata and JSON+LD. This in conjunction with some
                    hard-coded scrapers for more popular sites like Amazon,
                    Target, and Walmart proved to be a powerful solution.
                  </p>
                  <p>
                    The scraper is still prone to some hangups, however. Any
                    site behind Cloudflare or any other sort of protection layer
                    will trivially block access to the website, leaving the user
                    to manually copy all the product data themselves. In the
                    future, I would like to revisit and try and find a way
                    around this by maybe taking another crack at utilizing
                    Puppeteer.
                  </p>
                  <p className="italic">
                    Sometimes the best solution is a simple one.
                  </p>
                </span>
              </div>
            }
          />
          <ImageText
            image={
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src="/images/fillaneed/Balance.svg"
                  width={440}
                  height={359}
                  alt="a balance scale"
                />
              </div>
            }
            isFlipped
            text={
              <div className="flex flex-col gap-2">
                <h3 className="text-balance font-serif text-3xl">
                  Balancing design with user input
                </h3>
                <span className="prose">
                  <p>
                    When you build a tool that functions as a springboard to any
                    other storefront on the internet, you need to be sure that
                    your UI allows for a wide variety of user input.
                  </p>
                  <p>
                    Additionally, a product that a user adds may not link out to
                    an external store at all.
                  </p>
                  <p>
                    Building a product page that allowed a user to supply any
                    shape of image, linked or uploaded, was key to creating a
                    delightful experience for the user.
                  </p>
                  <p className="italic">
                    Applications should feel like an extension of the user,
                    meeting them where they are.
                  </p>
                </span>
              </div>
            }
          />
          <ImageText
            image={
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src="/images/fillaneed/Chisel.svg"
                  width={485}
                  height={290}
                  alt="a chisel uncovering shapes"
                />
              </div>
            }
            text={
              <div className="flex flex-col gap-2">
                <h3 className="text-balance font-serif text-3xl">
                  Refining my style
                </h3>
                <span className="prose">
                  <p>
                    Having my designs feel playful is always a top priority for
                    my projects.
                  </p>
                  <p>
                    Each of my projects usually follow a similar visual theme:
                    Bright colors, black borders, and rounded borders.
                  </p>
                  <p>
                    For fillaneed, I wanted to simplify things a little bit,
                    sticking to a mostly light theme with splashes of color.
                    Instead of blocking out my sections with bright backgrounds,
                    I opted to save the color for icons, flourishes and badges.
                  </p>
                  <div className="flex flex-wrap gap-2 text-black">
                    <Icon className="bg-green-400">
                      <Scroll size={20} />
                    </Icon>
                    <Icon className="bg-purple-400">
                      <Sparkles size={20} />
                    </Icon>
                    <Icon className="bg-blue-400">
                      <Gift size={20} />
                    </Icon>
                  </div>
                  <p className="italic">
                    Readable applications do not need to be boring applications.
                    Color and playfulness can seep through the cracks to bring
                    joy to the user.
                  </p>
                </span>
              </div>
            }
          />
          <ImageText
            isFlipped
            image={
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src="/images/fillaneed/Brick.svg"
                  width={500}
                  height={191}
                  alt="brick wall"
                />
              </div>
            }
            text={
              <div className="flex flex-col gap-2">
                <h3 className="text-balance font-serif text-3xl">
                  Building a SQL backend (and weathering a free tier storm)
                </h3>
                <span className="prose">
                  <p>
                    In the past, I used MongoDB for each of my side projects.
                    Fillaneed was my first time planning out a Postgres
                    database. I wanted to take advantage of{" "}
                    <Link href="https://orm.drizzle.team/"> Drizzle ORM </Link>{" "}
                    for its one-stop-shop solution to building out your schema
                    and types in one go.
                  </p>
                  <p>
                    I went ahead and wrote out my schema with Drizzle's MySQL
                    integration and pushed it up to{" "}
                    <Link href="https://planetscale.com/">Planetscale</Link>.
                    Unfortunately, when I was about 80% through with the
                    project,{" "}
                    <Link href="https://planetscale.com/blog/planetscale-forever">
                      {" "}
                      Planetscale announced that they were going to be
                      shuttering their free tier.
                    </Link>
                  </p>
                  <p>
                    After not being able to find a comparable MySQL host, I
                    decided to bite down and rewrite my schema in Postgres in
                    preparation to switch over to{" "}
                    <Link href="https://neon.tech/"> Neon</Link> for hosting.
                    Luckily the combination of Planetscale's export
                    functionality, Drizzle's simple syntax, and neons import
                    functionality made the transfer trivial.
                  </p>
                  <p className="italic">
                    Choosing tools with escape hatches is a great way to save
                    yourself time.
                  </p>
                </span>
              </div>
            }
          />
        </section>
      </div>
    </div>
  );
};

export default BlogArticle;
