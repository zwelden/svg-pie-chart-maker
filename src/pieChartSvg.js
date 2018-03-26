(function (app) {

  var SvgPieChart = function (svgWrapperElement, dataset) {
    this.svgWrapperEl = svgWrapperElement;
    this.dataset = dataset;
    this.svgRadius = 48;
    this.cx = 50;
    this.cy = 50;
    this.totalRotation = 0;
    this.fillColorOptions = ['#A9CCE3', '#AED6F1', '#A3E4D7', '#A2D9CE', '#A9DFBF', '#ABEBC6', '#7FB3D5', '#85C1E9', '#76D7C4', '#73C6B6', '#7DCEA0', '#82E0AA'];
    this.colorIndex = 0;
    this.pieSvg = {
      svgOpen: '<svg width="100" height="100" viewbox="0 0 100 100"><g class="circle-background"><circle class="main-circle" cx="' + this.cx + '" cy="' + this.cy + '" r="' + this.svgRadius + '" fill="#404040"></circle></g><g class="pie-chart-sections">',
      piePathTagOpen: '<path class="pie-section" fill="',
      piePathTagMiddle: '" d="M' + this.cx + ',' + this.cy + ' L' + this.svgRadius + ',' + (this.cy - this.svgRadius) + ' A' + this.svgRadius + ',' + this.svgRadius + ' 0 ',
      piePathClose: 'stroke="#fff" stroke-width="1"></path>',
      svgClose: '</g><g class="pie-chart-key"></g></svg>'
    };
  };

  SvgPieChart.prototype.degreesToRadians = function (angleDegrees) {
    return angleDegrees * Math.PI / 180;
  };

  SvgPieChart.prototype.getPointToPointDist = function (radius, angleDegrees) {
    // formula: a^2 = b^2 + c^2 - 2bc cos A,  where b & c = radius, and A = angleRadians
    var angleRadians = this.degreesToRadians(angleDegrees);
    var aSquared = Math.pow(radius, 2) + Math.pow(radius, 2) - (2 * radius * radius * Math.cos(angleRadians));
    var a = Math.sqrt(aSquared);

    return a;
  };

  SvgPieChart.prototype.getHorizontalDelta = function (radius, angleDegrees) {
    // formula = horizontalDelta = radius * sin A, where A = angleRadians
    var angleRadians = this.degreesToRadians(angleDegrees);
    var horizontalDelta = radius * Math.sin(angleRadians);
    return horizontalDelta;
  };

  SvgPieChart.prototype.getVerticalDelta = function (hypotnuse, side1) {
    // computed after getPointToPointDist and getHorizontalDelta
    // formula = verticalDelta = (hypotnuse^2 - side2^2)^(1/2)
    var verticalDeltaSquared = Math.pow(hypotnuse, 2) - Math.pow(side1, 2);
    var verticalDelta = Math.sqrt(verticalDeltaSquared);
    return verticalDelta;
  };

  SvgPieChart.prototype.calculatePieSections = function (piePercent) {
    var sectionAngle = 360 * (piePercent / 100);
    var pointToPointDist = this.getPointToPointDist(this.svgRadius, sectionAngle);
    var horizontalDelta = this.getHorizontalDelta(this.svgRadius, sectionAngle);
    var verticalDelta = this.getVerticalDelta(pointToPointDist, horizontalDelta);

    return {
      pointToPointDist: pointToPointDist,
      horizontalDelta: horizontalDelta,
      verticalDelta: verticalDelta,
      sectionAngle: sectionAngle
    };
  };

  SvgPieChart.prototype.setDatasetPercentages = function () {
    var total = 0;
    for (var i = 0; i < this.dataset.length; i++) {
      total += parseFloat(this.dataset[i].value);
    }

    for (var j = 0; j < this.dataset.length; j++) {
      this.dataset[j].percent = (parseFloat(this.dataset[j].value) / total) * 100;
    }
  };

  SvgPieChart.prototype.constructSvg = function () {
    var svgCircleBaseHtml = this.pieSvg.svgOpen + this.pieSvg.svgClose;
    this.svgWrapperEl.innerHTML = svgCircleBaseHtml;
  };

  SvgPieChart.prototype.calculateLargeArcFlag = function (percent) {
    if (percent > 50) {
      return 1;
    }
    return 0;
  };

  SvgPieChart.prototype.constructPieSection = function (pieObj) {
    var piePercent = pieObj.percent;
    var sweepFlag = 1;
    var largeArcFlag = this.calculateLargeArcFlag(piePercent);

    var pieSectionPoints = this.calculatePieSections(piePercent);
    var y = (this.cy - this.svgRadius) + pieSectionPoints.verticalDelta;
    var x = this.cx + pieSectionPoints.horizontalDelta;
    var svgPieSectionHtml = this.pieSvg.piePathTagOpen + this.fillColorOptions[this.colorIndex] + this.pieSvg.piePathTagMiddle + largeArcFlag + ' ' + sweepFlag + ' ' + x + ', ' + y + ' z" ' + 'transform="rotate(' + this.totalRotation + ' 50 50)"' + this.pieSvg.piePathClose;

    var svgPieSectionsWrapper = this.svgWrapperEl.querySelector('.pie-chart-sections');
    svgPieSectionsWrapper.insertAdjacentHTML('beforeend', svgPieSectionHtml);

    this.totalRotation += pieSectionPoints.sectionAngle;
    this.colorIndex += 1;
  };

  SvgPieChart.prototype.constructPieGraphSections = function () {
    for (var i = 0; i < this.dataset.length; i++) {
      this.constructPieSection(this.dataset[i]);
    }
  };

  SvgPieChart.prototype.initGraph = function () {
    this.setDatasetPercentages();
    this.constructSvg();
    this.constructPieGraphSections();
  };

  app.SvgPieChart = SvgPieChart;
})(window.app = window.app || {});
