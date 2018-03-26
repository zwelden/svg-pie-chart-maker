# SVG Pie Chart Maker
Create an interact-able svg pie chart with a given dataset and wrapper element.
Most SVG pie charts make use the stroke-dasharray property on a circle element to construct the pie chart, however this prohibits using the svg to interact with the data. So hover effect, click actions, etc. SVG Pie Chart Maker takes a dataset obj, and does all the math behind the scenes to generate a fully interact-able pie chart.

## Demo
[View Demo](https://zwelden.github.io/svg-pie-chart-maker/)

## TODO
- [ ] Add in Chart Title header/element
- [ ] Add in Chart Key
- [ ] add data attributes to each pie wedge for targeting in external js

## How to use
1. add the svgChartSvg.js file to you html page
2. create a wrapper element in your html file, for example `<div class="pie-chart-holder"></div>`
3. create a dataset formatted like:
  ```
    var someDataset =  [
      {value: 123},
      {value: 234},
      {value: 7890123}
    ]
  ```
  The only required object key is 'value' however, each data object can have extra attributes can have extra attributes if you wish, for example:
  ```
    var anotherDataset = [
      {value: 222, name: 'Spot 1', city: 'Singapore'},
      {value: 456, name: 'Spot 18', city: 'London'},
      {value: 9876, name: 'Spot 12', city: 'New York'}
    ]
  ```
  4. Target the container element, new up a pie chart class, pass in the container element and dataset, and initalize the graph:
  ```
    var testDataset = [
      {value: 60, name: 'France'},
      {value: 25, name: 'Germany'},
      {value: 40, name: 'England'}
    ];
    var pieGraphWrapperEL = document.querySelector('.pie-chart-wrapper-2');
    var pieGraphTest = new app.SvgPieChart(pieGraphWrapperEL, testDataset);
    pieGraphTest.initGraph();
  ```
