function scatterPlot() {

	var height = 500;
	var width = 900;

	var margin = {top: 20, left: 30, right: 30, bottom: 20};

	var getInnerWidth = function() {
		return width - margin.left - margin.right;
	}

	var getInnerHeight = function() {
		return height - margin.top - margin.bottom;
	}

	var xValue = function(d) { return +d.xValue; } // force to number
	var yValue = function(d) { return +d.yValue; } // force to number

	var chart = function(selection) {
		selection.each(function(data) {
			var svg = d3.select(this).append("svg");

			svg.attr("height", height).
				attr("width", width);
	  
			var xScale = d3.scale.linear()
				.rangeRound([margin.left, getInnerWidth()])
				.domain([d3.min(data, xValue), d3.max(data,xValue)]);
			var yScale = d3.scale.linear()
				.rangeRound([getInnerHeight(), margin.top])
				.domain([d3.min(data, yValue), d3.max(data, yValue)]);

			svg.selectAll(".dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("r", 3.5)
				.attr("cx", function(d) {
					return xScale(xValue(d));
				})
				.attr("cy", function(d) {
					return yScale(yValue(d));
				});

			var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom");
			svg.append("g")
				.attr("class","axis")
				.attr("transform","translate(0," + getInnerHeight() + ")")
				.call(xAxis);

			var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient("left");
			svg.append("g")
				.attr("class","axis")
				.attr("transform","translate(" + margin.left + ",0)")
				.call(yAxis);
	});
  }

  return chart;
}
