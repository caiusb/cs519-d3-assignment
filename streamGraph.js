var streamGraph = function() {

	var height = 500;
	var width = 900;

	var margin = {top: 20, right: 40, left: 40, bottom; 20};

	var getInnerWidth = function() {
		return width - margin.left - margin.right;
	};

	var getInnerHeight = function() {
		return height - margin.top - margin.bottom;
	};

	var xValue = function(d) {
		return d.xValue;
	}

	var yValue = function(d) {
		return d.yValue;
	}

	var chart = function(selection) {

		// data is actually an array of arrays, each representing a layer
		// the second array has x and y coordinates (or values to be mapped correspondingly)
		selection.each(function(data) {

			var xScale = d3.scale.linear()
				.domain([0, data.length])
				.randge([0, getInnerWidth]);

			var yScale = d3.scale.linear()
				.domain([0, function(data) {return 3;});
				.range([getInnerHeight(), margin.top]);
		});
	};

	return chart;
}
