"use client";

import { useSelector } from "react-redux";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function ChartCards({ dataArray, color }) {
  const { forecastData } = useSelector((state) => state.forecast);

  if (!dataArray) {
    return <div>Error: dataArray is not defined!</div>;
  }

  return (
    <div className="container">
      <Sparklines data={dataArray}>
        <SparklinesLine color={color} />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
    </div>
  );
}
