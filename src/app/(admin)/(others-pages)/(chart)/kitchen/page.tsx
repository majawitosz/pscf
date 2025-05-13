

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LineChart  from "@/components/charts/line/LineChart";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Temperature Chart | Dashboard",
 
};
export default function Page() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Kitchen Charts" />
      <div className="space-y-6">
        <LineChart sensorType={"temperature"} room={"room3"} limit={7} />
      </div>
       
      <div className=" space-y-6">
        <LineChart sensorType={"pressure"} room={"room3"} limit={7} />
      </div>
    </div>
  );
}
