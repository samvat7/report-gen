import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { useEffect } from "react";
import { useState } from "react";
import { formatDate } from "@canvasjs/charts";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ChartWithSecondaryAxis(props) {

  let ageRelatedRisk = props.ageRelatedRisk;
  let t21Risk = props.t21Risk;
  let t1813Risk = props.t1813Risk;

  const defaultRiskData = [
    { label: "Age Related Risk", y: (ageRelatedRisk === 0 || ageRelatedRisk === undefined || ageRelatedRisk === null)? 573: ageRelatedRisk},
    { label: "T:21 Risk", y: (t21Risk === 0 || t21Risk === undefined || t21Risk === null)? 10000: t21Risk},
    { label: "T:18/13 Risk", y: (t1813Risk === 0 || t1813Risk === undefined || t1813Risk === null)? 100000: t1813Risk},
  ];

  const formattedData = defaultRiskData.map((d) => ({
    label: d.label,
    y: (1 / d.y) * 1000000,
  }));

  const chartOptions = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Risk Analysis",
    },
    subtitles: [],
    axisX: {
      title: "Factors",
    },
    axisY: {
      logarithmic: true,
      title: "Chance",
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
      includeZero: false,
      labelFormatter: function (e) {
        // Convert the y-value back to the format "1 in X"
        var value = 1 / (e.value / 1000000);
        if (value >= 1) {
          // For values like "1 in 1", "1 in 10"
          return "1:" + Math.round(value);
        } else {
          // For any value less than "1 in 1", though not expected based on current setup
          return "< 1:1";
        }
      },
    },
    toolTip: {
      shared: false,
    },
    legend: {
      cursor: "pointer",
    },
    data: [
      {
        type: "column",
        name: "1",
        showInLegend: false,
        dataPoints: formattedData,
      },
    ],
  };



  return(
    <div className="chart-div">
      {chartOptions && <CanvasJSChart options={chartOptions} />}
      </div>
  );
}
