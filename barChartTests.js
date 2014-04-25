var testDivDOM;

QUnit.begin(function () {
	var testDiv = d3.select("#test-div");
	console.log(testDiv)
	barChart(testDiv);
	testDivDOM = document.getElementById("test-div");
});

test("Test SVG Element Creation", function testSVGElement() {
	var svg = testDivDOM.firstElementChild;
	notEqual(svg, null, "Failed to create SVG element");
	equal(svg.tagName, "svg", "Element type is not SVG");
});