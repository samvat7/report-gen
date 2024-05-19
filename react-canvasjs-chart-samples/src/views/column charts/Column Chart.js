import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var parsedDataPoints = [
	{ label: "Age Related Risk",  y: 10  },
	{ label: "T:21 Risk", y: 15  },
	{ label: "T:18/13 Risk", y: 25  },
];


parsedDataPoints.map((dataPoint) => {
	dataPoint.y = (1/dataPoint.y) * 100000;
	return dataPoint;
});

 
class ColumnChart extends Component {
		render() {
			const options = {
				title: {
					text: "Basic Column Chart"
				},
				animationEnabled: true,
				axisY: {
					logarithmic: true, // This makes the y-axis logarithmic
					title: "Logarithmic Scale", // Optional: Title for the y-axis
				},
				data: [
					{
						type: "column",
						dataPoints: parsedDataPoints
					}
				]
			}
		
		return (
		<div>
			<h1>React Column Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ColumnChart;