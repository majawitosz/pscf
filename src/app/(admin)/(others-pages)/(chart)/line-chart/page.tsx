import LineChartOne from "@/components/charts/line/LineChartOne";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Temperature Chart | Dashboard",
 
};
export default function LineChart() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Temperature Chart" />
      <div className="space-y-6">
        <StatisticsChart />
      </div>
    </div>
  );
}
