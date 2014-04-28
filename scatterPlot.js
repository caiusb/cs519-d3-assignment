function scatterPlot() {

	var height = 500;
	var width = 900;

	var margin = {top: 20, left: 30, right: 30, bottom: 20};

	var circleRadius = 3.5;

	var getInnerWidth = function() {
		return width - margin.left - margin.right;
	}

	var getInnerHeight = function() {
		return height - margin.top - margin.bottom;
	}

	var xValue = function(d) { return +d.xValue; } // force to number
	var yValue = function(d) { return +d.yValue; } // force to number
	var label = function(d) { return d.label; } 
	var category = function(d) { return d.category; }

	var chart = function(selection) {
		selection.each(function(data) {
			var svg = d3.select(this).append("svg");

			svg.attr("height", height).
				attr("width", width);
	  
			var xScale = d3.scale.linear()
				.rangeRound([margin.left, getInnerWidth()])
				.domain([d3.min(data, xValue) - 1, d3.max(data,xValue) + 1]);
			var yScale = d3.scale.linear()
				.rangeRound([getInnerHeight(), margin.top])
				.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

			var color = d3.scale.category20();

			var tooltip = d3.select("body").append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

			svg.selectAll(".dot")
				.data(data)
				.enter()
				.append("circle")
				.style("fill", function(d) { return color(category(d)); })
				.attr("r", circleRadius)
				.attr("cx", function(d) {
					return xScale(xValue(d));
				})
				.attr("cy", function(d) {
					return yScale(yValue(d));
				})
				.on("mouseover", function(d) {
					tooltip.transition()
						.duration(200)
						.style("opacity",1);
					tooltip.html(label(d) + "<br />(" +
							xValue(d) + ", " + yValue(d) + ")")
						.style("left", (d3.event.pageX + 5) + "px")
						.style("top", (d3.event.pageY - 28) + "px");
				})
				.on("mouseout", function(d) {
					tooltip.transition()
						.duration(200)
						.style("opacity",0);
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
