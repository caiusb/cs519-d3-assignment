var streamGraph = function() {

	var height = 500;
	var width = 900;

	var margin = {top: 20, right: 40, left: 40, bottom: 20};

	var getInnerWidth = function() {
		return width - margin.left - margin.right;
	};

	var getInnerHeight = function() {
		return height - margin.top - margin.bottom;
	};

	var xValue = function(d) {
		return d.x;
	}

	var yValue = function(d) {
		return d.y;
	}

	var name = function(d) {
		return d.name;
	}

	var values = function(d) {
		return d.values;
	}

	var chart = function(selection) {

		// data is actually an array of arrays, each representing a layer
		// the second array has x and y coordinates (or values to be mapped correspondingly)
		selection.each(function(data) {

			var xScale = d3.scale.linear()
				.domain([values(data[0]).reduce(function(p,c) { // get the minimum x value
						if (c.x < p)
							return c.x;
						return p;
					}, Infinity),
					values(data[0]).reduce(function(p,c) { // get the maximum x value
						if (c.x > p)
							return c.x
						return p;
					}, -Infinity)
				])
				.range([margin.left, margin.left + getInnerWidth()]);

			var yScale = d3.scale.linear()
				.domain([0, 30])
				.range([getInnerHeight(), margin.top]);

			var stack = d3.layout.stack()
				.offset("wiggle")
				.values(function(d) { return d.values; });

			var color = d3.scale.linear()
				.range(["#aad", "#556"]);

			var area = d3.svg.area()
				.x(function(d) { return xScale(d.x); })
				.y0(function(d) { return yScale(d.y0); })
				.y1(function(d) { return yScale(d.y0 + d.y) });

			var tooltip = d3.select("body").append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

			var svg = d3.select(this).append("svg")
				.attr("height",height)
				.attr("width",width);

			svg.selectAll("path").data(stack(data))
				.enter()
				.append("path")
				.attr("d", function(d) { return area(d.values) })
				.style("fill", function() { return color(Math.random()); })
				.append("title")

			svg.selectAll("path").text(function(d) { return d.name; })
				.on("mouseover", function(d) {
					tooltip.transition()
						.duration(200)
						.style("opacity",1);
					tooltip.html(name(d))
						.style("left", (d3.event.pageX + 5) + "px")
						.style("top", (d3.event.pageY - 28) + "px");
				})
				.on("mouseout", function(d) {
					tooltip.transition()
						.duration(200)
						.style("opacity",0);
				});
;
		});
	};

	return chart;
}
