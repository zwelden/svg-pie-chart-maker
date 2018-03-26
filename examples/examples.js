(function (app) {
  // load graph
  var tempDataset = [
    {value: 60, name: 'point 1'},
    {value: 20, name: 'point 2'},
    {value: 15, name: 'point 3'},
    {value: 9, name: 'point 4'},
    {value: 23, name: 'point 5'},
    {value: 17, name: 'point 6'},
    {value: 40, name: 'point 7'},
    {value: 34, name: 'point 8'},
    {value: 17, name: 'point 9'},
    {value: 44, name: 'point 10'},
    {value: 12, name: 'point 11'}
  ];
  var pieGraphWrapperEL = document.querySelector('.pie-chart-wrapper');
  var pieGraphTest = new app.SvgPieChart(pieGraphWrapperEL, tempDataset);
  pieGraphTest.initGraph();
})(window.app = window.app || {});

(function (app) {
  // load graph
  var testDataset = [
    {value: 60, name: 'France'},
    {value: 25, name: 'Germany'},
    {value: 40, name: 'England'}
  ];
  var pieGraphWrapperEL = document.querySelector('.pie-chart-wrapper-2');
  var pieGraphTest = new app.SvgPieChart(pieGraphWrapperEL, testDataset);
  pieGraphTest.initGraph();
})(window.app = window.app || {});
