QUnit.begin(function () {
	testDiv = document.getElementById("test-div");
	barChart(testDiv);
});

test("Test SVG Element Creation", function () {
	var svg = testDiv.firstElementChild;
	notEqual(svg, null, "Failed to create SVG element");
	equal(svg.tagName, "svg", "Element type is not SVG");
});