function barChart(selection) {
	var h = 100; // height
	var w = 500; // width

	var barWidth = 50;
	var scalingFactor = 1;

	selection.each(function(data) {
		var svg = selection.append("svg");

		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function(d, i) {
				return i*barWidth;
			})
			.attr("y", function(d) {
				return h - d;
			})
			.attr("height", function(d) {
				return d;
			})
			.attr("width",barWidth);
	});
}