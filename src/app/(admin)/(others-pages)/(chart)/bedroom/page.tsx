
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import LineChart  from "@/components/charts/line/LineChart";

export const metadata: Metadata = {
  title: "Next.js Bar Chart | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Bar Chart page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function page() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Bedroom Charts" />
      <div className="space-y-6">
        <LineChart sensorType={"temperature"} room={"room2"} limit={15} />
      </div>
       
      <div className=" space-y-6">
        <LineChart sensorType={"pressure"} room={"room2"} limit={15} />
      </div>
    </div>
  );
}
