var testDivDOM;
var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var dataPointsNo = 10;

QUnit.begin(function () {
	var testDiv = d3.select("#test-div").datum(data);
	console.log(testDiv)
	barChart(testDiv);
	testDivDOM = document.getElementById("test-div");
});

test("Test SVG Element Creation", function testSVGElement() {
	var svg = testDivDOM.firstElementChild;
	notEqual(svg, null, "Failed to create SVG element");
	equal(svg.tagName, "svg", "Element type is not SVG");
});

test("Test Add Bars", function testAddBars() {
	var svg = testDivDOM.firstElementChild;
	equal(svg.children.length, dataPointsNo, "I should have " + dataPointsNo + " data points");
});