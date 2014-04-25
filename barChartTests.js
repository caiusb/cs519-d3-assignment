QUnit.begin(function () {
	var testDiv = d3.select("#test-div");
	console.log(testDiv)
	barChart(testDiv);
});

test("Test SVG Element Creation", function testSVGElement() {
	var svg = document.getElementById("test-div").firstElementChild;
	notEqual(svg, null, "Failed to create SVG element");
	equal(svg.tagName, "svg", "Element type is not SVG");
});
