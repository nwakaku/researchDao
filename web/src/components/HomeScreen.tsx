import { Button, Link } from "@chakra-ui/react";
import { useWriteContract } from "wagmi";
import { abi } from "../abi";
import { Contract_Address_Bnb } from '../constant'


const BecomeATutorFrame = () => {
  const { data: hash, isPending, writeContract } = useWriteContract(); 

   const joinUs = () => {
     // Assuming writeContract does not need any arguments
     writeContract({
       address: Contract_Address_Bnb,
       abi: abi,
       functionName: "registerScientist",
     });
   }

  return (
    <>
      {/* Main home session */}
      <div className="h-[680px] w-full flex flex-col">
        {/* heading text */}
        <div className="flex items-start justify-between mb-12 mt-10 space-x-2 mx-auto">
          {/* button and mascot */}

          <div className="max-w-xl flex flex-col ">
            <p className="text-31xl font-extrabold text-white leading-tight">
              Publish Research . Find Collaborators . Get Funding .{" "}
            </p>
            <p className="text-31xl font-extrabold text-white leading-tight">
              All on one platform
            </p>
            <p className="text-white my-4 max-w-xl text-3xl mb-6">
              Publish original scientific contents, get quality feedback from
              peers, collaborate with other researchers and get funded with BNB
              tokens
            </p>
            <Link href="/publication">
              <Button
                disabled={isPending}
                onClick={joinUs}
                w={{ base: "150px", md: "150px", lg: "200px" }}
                className="rounded-lg bg-newred px-12 py-2 text-white h-12 text-lg font-body-2-body-2 font-thin hover:bg-red ">
                Get started
              </Button>
            </Link>
          </div>
          <div>
            <img src="/science.png" className=" h-96 rounded-md" />
          </div>
        </div>

        {/* Flags */}
        <div>
          <p className=" mt-16 text-center font-medium font-body-2-body-2 text-white text-3xl">
            Trusted by top researchers like{" "}
          </p>
          <div className=" flex justify-evenly py-2 mt-3">
            <p className="text-9xl font-extrabold text-newash ">
              Dr. Carl June
            </p>
            <p className="text-9xl font-extrabold text-newash ">
              Dr. Yoshinori Ohsumi
            </p>

            <p className="text-9xl font-extrabold text-newash ">
              Dr. Svante Pääbo
            </p>
            <p className="text-9xl font-extrabold text-newash ">
              Dr. Jane Goodall
            </p>
          </div>
        </div>
      </div>

      {/* All on one platform  */}

      {/* footer session */}
      <div className="w-[818px] flex flex-col items-center justify-center py-0 px-5 box-border gap-[32px] max-w-full text-sm text-white1 mq450:gap-[32px] mt-6">
        <div className="text-center text-white font-medium mb-6">
          <p className="m-0">© 2024 ResearchDAO, All rights reserved.</p>
          <p className="m-0">{`Built with love at BNBChain Hackathon `}</p>
        </div>
      </div>
    </>
  );
};

export default BecomeATutorFrame;
