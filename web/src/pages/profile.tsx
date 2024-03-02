import { FunctionComponent } from "react";
import { Header } from "../components/Header";
import { ProfileCard } from "../components/ProfileCard";
import { UserInfoCard } from "../components/UserInfoCard";
import { MyPublication } from "../components/MyPublications";

const Profile: FunctionComponent = () => {
  return (
    <div className="h-screen bg-white font-body-2-body-2">
      <Header />
      <section className="py-6 px-4 md:px-16 lg:px-24">
        <div className="w-full flex flex-col md:space-y-8">
          <ProfileCard />
          <UserInfoCard />
          <MyPublication/>
        </div>
      </section>
    </div>
  );
};

export default Profile;
