function barChart() {

	var height = 100; // height
	var width = 500; // width

	var margin = {top: 20, right: 30, bottom: 30, left: 40};

	var barPadding = .1;
	var scalingFactor = 1;

	var yLabel = "Some label here";

	var getInnerWidth = function() {
		return width - margin.left  - margin.right;
	}

	var getInnerHeight = function() {
		return height - margin.top - margin.bottom;
	}

	var chart = function(selection) {
		selection.each(function(data) {
			var svg = d3.select(this).append("svg");

			var xScale = d3.scale.ordinal();

			var yScale = d3.scale.linear()
				.range([getInnerHeight(), 0]);

			xScale.domain(data.map(function(d){return d.label;}))
				.rangeRoundBands([0,getInnerWidth()], barPadding);
			yScale.domain([0, d3.max(data, function(d) { 
					return d.value*scalingFactor; 
				})
			]);
			
			svg.attr("height", height)
				.attr("width", width);

			var barWidth = width/data.length - barPadding;

			svg.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("x", function(d) {
					return xScale(d.label);
				})
				.attr("y", function(d) {
					return yScale(d.value);
				})
				.attr("height", function(d) {
					return getInnerHeight() - yScale(d.value);
				})
				.attr("width",xScale.rangeBand());

			svg.selectAll("text")
				.data(data)
				.enter()
				.append("text")
				.text(function(d) {
					return d.value;
				})
				.attr("x", function(d, i) {
					return xScale(d.label) + xScale.rangeBand() / 2;
				})
				.attr("y", function(d) {
					return yScale(d.value) + 14; 
				})
				.style("fill","white")
				.style("text-anchor","middle");

			var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom");
			svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + getInnerHeight() + ")")
				.call(xAxis);

			var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient("left")
				.ticks(4);
			svg.append("g")
				.attr("class","axis")
				.call(yAxis)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy",".71em")
				.style("text-anchor","end")
				.text(yLabel);
		});
	}

	chart.width = function(newWidth) {
		if (arguments.length == 0)
			return width;
		width = newWidth;
		return chart;
	}

	chart.height = function(newHeight) {
		if (arguments.length == 0)
			return height;
		height = newHeight;
		return chart;
	}

	chart.padding = function(newPadding) {
		if (arguments.length == 0)
			return barPadding;
		barPadding = newPadding;
		return chart;
	}

	chart.scaling = function(newScaling) {
		if (arguments.length == 0)
			return scalingFactor;
		scalingFactor = newScaling;
		return chart;
	}

	chart.yLabel = function(newLabel) {
		if (arguments.length == 0)
			return yLabel;
		yLabel = newLabel;
		return chart;
	}

	return chart;
}
