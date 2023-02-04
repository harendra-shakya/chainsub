import Link from "next/link";

function Home() {
  return (
    <div className="pt-36 -mt-8 font-CircularMedium lg:max-w-5xl lg:mx-auto">
      <section className="px-3 md:px-20">
        <div>
          <h1 className="text-3xl font-bold text-center px-2 py-2 mt-8 leading-10 md:text-4xl md:max-w-lg mx-auto lg:max-w-4xl lg:text-6xl lg:pt-14 tracking-wide">
            A supporter is worth a thousand followers.{" "}
          </h1>
          <p className="pt-8 px-2 py-8 max-w-sm mx-auto text-center text-gray-800 font-Montserrat font-bold leading-9 text-lg md:text-xl md:max-w-md lg:max-w-4xl lg:text-2xl lg:px-40 dark:text-slate-100 tracking-wide">
            Accept donations. Start a membership. Sell anything you like. It’s easier than you think.
          </p>
          <div className="mx-2 shadow text-center py-4 rounded-full bg-white dark:bg-zinc-800  mb-4 text-lg lg:max-w-lg lg:mx-auto">
            <span className="">coffeetown.com/</span>
            <input
              type={"text"}
              className="pl-0 border-none focus:ring-0 dark:text-slate-100 dark:bg-zinc-800"
              placeholder={"yourname"}
            ></input>
            <span className="hidden  lg:inline">
              <Link
                href="/dashboard"
                className="px-6 bg-yellow-600 dark:bg-yellow-600 cursor-pointer rounded-full text-lg  py-3 text-center   hover:text-xl  transition-all dark:text-black"
              >
                Start my page
              </Link>
            </span>
          </div>

          <Link href="/dashboard">
            <p className="mx-2 bg-yellow-600 rounded-full text-lg  py-3 text-center lg:hidden dark:text-black">
              Start my page
            </p>
          </Link>
          <p className=" px-2 py-4 text-center text-gray-800 font-Montserrat font-bold leading-7 text-sm dark:text-slate-100 tracking-wide">
            *It&apos;s free and takes only a minute.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
