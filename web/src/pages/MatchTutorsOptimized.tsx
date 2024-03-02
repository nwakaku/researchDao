import { FunctionComponent } from "react";

import { Header } from "../components/Header";
import { TutorList } from "../components/Publications";

const MatchTutorsOptimized: FunctionComponent = () => {
  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden flex flex-col items-center justify-start pt-0 px-0 pb-[271px] box-border tracking-[normal] text-left text-xs text-chrome-light-disabled font-roboto">
      <section className="mb-10 self-stretch flex flex-col items-start justify-start top-[0] z-[99] sticky max-w-full text-left text-8xl-9 text-gray-1 font-body-2-body-2">
        <Header />
      </section>

      {/* Tutor List */}
      <TutorList />
    </div>
  );
};

export default MatchTutorsOptimized;
