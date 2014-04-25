var testDivDOM;
var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var dataPointsNo = 10;
var svg;

QUnit.begin(function () {
	var testDiv = d3.select("#test-div").datum(data);
	console.log(testDiv)
	barChart(testDiv);
	testDivDOM = document.getElementById("test-div");
	svg = testDivDOM.firstElementChild;
});

test("Test SVG Element Creation", function testSVGElement() {
	notEqual(svg, null, "Failed to create SVG element");
	equal(svg.tagName, "svg", "Element type is not SVG");
});

test("Test Add Bars", function testAddBars() {
	equal(svg.children.length, dataPointsNo, "I should have " + dataPointsNo + " data points");
});

test("Test Bar Height", function testBarHeight() {
	var children = svg.children;
	for (var i=0; i < data.length; i++) {
		equal(children[i].getAttribute("y"), data[i], "The bar should be the height of the data");
	}
});