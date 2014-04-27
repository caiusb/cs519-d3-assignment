function barChart() {

	var height = 100; // height
	var width = 500; // width

	var barPadding = 1;
	var scalingFactor = 1;

	var chart = function(selection) {
		selection.each(function(data) {
			var svg = d3.select(this).append("svg");
			
			svg.attr("height", height)
				.attr("width", width);

			var barWidth = width/data.length - barPadding;

			svg.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("x", function(d, i) {
					return i*(barWidth + barPadding);
				})
				.attr("y", function(d) {
					return height - d*scalingFactor;
				})
				.attr("height", function(d) {
					return d*scalingFactor;
				})
				.attr("width",barWidth);
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

	return chart;
}