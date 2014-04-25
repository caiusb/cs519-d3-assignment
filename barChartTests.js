test("Test SVG Element Creation", function () {
	var div = document.getElementById("test-div");
	notEqual(div, null, "The initial div must exist");

	barChart(div);

	var svg = div.firstElementChild;
	notEqual(svg, null, "Failed to create SVG element");
	equal(svg.tagName, "svg", "Element type is not SVG");
});