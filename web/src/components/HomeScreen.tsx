import { Button, Link } from "@chakra-ui/react";


const BecomeATutorFrame = () => {
  return (
    <>
      {/* Main home session */}
      <div className="h-[680px] w-full flex flex-col">
        {/* heading text */}
        <div className="flex items-start justify-between mb-12 mt-10 space-x-2 mx-auto">
          {/* button and mascot */}

          <div className="max-w-xl flex flex-col ">
            <p className="text-31xl font-extrabold text-white leading-tight">
              Stream . Connect . Earn USDC{" "}
            </p>
            <p className="text-31xl font-extrabold text-white leading-tight">
              All on one platform
            </p>
            <p className="text-white my-4 max-w-xl text-3xl mb-6">
              Earn reward for streaming contents and connect with your favourite
              creators in realtime
            </p>
            <Link href="/matchtutors">
            <Button
              w={{ base: "150px", md: "150px", lg: "200px" }}
              className="rounded-lg bg-newred px-12 py-2 text-white h-12 text-lg font-body-2-body-2 font-thin hover:bg-red "
            >
             Get started
            </Button>
            </Link>
          </div>
          <div>
            <img src="/stream.svg" className=" h-148" />
          </div>
        </div>

        {/* Flags */}
        <div>
          <p className=" mt-16 text-center font-medium font-body-2-body-2 text-white text-3xl">
            Trusted by top creators like{" "}
          </p>
          <div className=" flex justify-evenly py-2 mt-3">
            <p className="text-9xl font-extrabold text-newash ">Mr Beast</p>
            <p className="text-9xl font-extrabold text-newash ">ESPN UK</p>
            <p className="text-9xl font-extrabold text-newash ">PewDiePie</p>
            <p className="text-9xl font-extrabold text-newash ">T Series</p>
            <p className="text-9xl font-extrabold text-newash ">ED Sheeran</p>
          </div>
        </div>
      </div>

      {/* All on one platform  */}

      {/* footer session */}
      <div className="w-[818px] flex flex-col items-center justify-center py-0 px-5 box-border gap-[32px] max-w-full text-sm text-white1 mq450:gap-[32px]">
        <div className="text-center text-white font-medium mb-6">
          <p className="m-0">© 2024 WeStream, All rights reserved.</p>
          <p className="m-0">{`Built with love at Avalanche Frontier`}</p>
        </div>
      </div>
    </>
  );
};

export default BecomeATutorFrame;
