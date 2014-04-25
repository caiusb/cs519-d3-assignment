QUnit.begin(function () {
	test-div = document.getElementById("test-test-div");
	notEqual(test-div, null, "The initial test-div must exist");
});

test("Test SVG Element Creation", function () {

	barChart(test-div);

	var svg = test-div.firstElementChild;
	notEqual(svg, null, "Failed to create SVG element");
	equal(svg.tagName, "svg", "Element type is not SVG");
});