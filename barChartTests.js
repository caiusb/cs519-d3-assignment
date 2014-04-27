var testDivDOM;
var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var dataPointsNo = data.length;
var svg;

var chartWidth = 600;
var chartHeight = 200;
var barPadding = 2;
var scaling = 2;

QUnit.begin(function () {
	var testChart = barChart()
		.width(chartWidth)
		.height(chartHeight)
		.padding(barPadding)
		.scaling(scaling);
	var testDiv = d3.select("#test-div")
		.datum(data)
		.call(testChart);
	testDivDOM = document.getElementById("test-div");
	svg = testDivDOM.firstElementChild;
});

test("Test SVG Element Creation", function testSVGElement() {
	notEqual(svg, null, "Failed to create SVG element");
	equal(svg.tagName, "svg", "Element type is not SVG");
});

test("Test SVG Height", function testSVGHeight() {
	equal(svg.getAttribute("height"), chartHeight, "The heigth of the SVG should be 100");
});

test("Test SVN Width", function testSVNWidth() {
	equal(svg.getAttribute("width"), chartWidth, "The width of the SVG should be 500");
});

test("Test Add Bars", function testAddBars() {
	equal(svg.children.length, dataPointsNo, "I should have " + dataPointsNo + " data points");
});

test("Test Bar Height", function testBarHeight() {
	var children = svg.children;
	for (var i=0; i < data.length; i++) {
		equal(children[i].getAttribute("height"), data[i]*scaling, "The bar should be the height of the data");
	}
});

test("Test Bar X Postion", function testBarXPosition() {
	var children = svg.children;
	for (var i=0; i< data.length; i++) {
		equal(children[i].getAttribute("x"), i*(chartWidth/dataPointsNo), "The bars should be progressively to the right");
	}
});

test("Test Bar Y Position", function testBarYPosition() {
	var children = svg.children;
	for (var i=0; i < data.length; i++) {
		equal(children[i].getAttribute("y"), chartHeight-data[i], "The bars should be alligned on the lower edges");
	}
})

test("Give Bars some width", function testBarWidth() {
	var children = svg.children;
	for (var i=0; i < data.length; i++) {
		equal(children[i].getAttribute("width"), chartWidth/dataPointsNo - barPadding, "The bars should be of width 50");
	}
});