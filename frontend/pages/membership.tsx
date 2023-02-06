import React from "react";
import MembershipCard from "~~/components/Card/MembershipCard";
import Sidebar from "~~/components/Sidebar/Sidebar";

export default function Membership() {
  // redirect to user page
  return (
    <div className="text-center pt-36 mx-auto">
      <Sidebar />
      <MembershipCard />
    </div>
  );
}
