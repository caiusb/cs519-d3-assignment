function barChart(selection) {
	selection.each(function(data) {
		var svg = selection.append("svg");

		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function(d, i) {
				return i*50;
			})
			.attr("height", function(d) {
				return d;
			})
			.attr("width",50);
	});
}