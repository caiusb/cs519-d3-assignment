function barChart(selection) {
	var height = 100; // height
	var width = 500; // width

	var barWidth = 50;
	var scalingFactor = 1;

	selection.each(function(data) {
		var svg = selection.append("svg");
		svg.attr("height", height)
			.attr("width", width);

		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function(d, i) {
				return i*barWidth;
			})
			.attr("y", function(d) {
				return height - d;
			})
			.attr("height", function(d) {
				return d;
			})
			.attr("width",barWidth);
	});
}