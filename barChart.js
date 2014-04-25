function barChart(selection) {
	selection.each(function(data) {
		var svg = selection.append("svg");
		
		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect");
	});
}