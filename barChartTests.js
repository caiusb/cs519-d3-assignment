var testDivDOM;
var data = [{label: "A", value: "20"}, {label: "B", value: "18"}, {label: "C", value: "17"}];
var dataPointsNo = data.length;
var svg;

var chartWidth = 600;
var chartHeight = 200;
var barPadding = .1;
var scaling = 2;

var margin = {top: 20, right: 30, bottom: 30, left: 40};

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

var getRectChildren = function(htmlCollection) {
	var array = Array.prototype.slice.call(htmlCollection);
	return array.filter(function(e) {
		return e.tagName === "rect";
	});
}

test("Test Add Bars", function testAddBars() {
	var children = getRectChildren(svg.children);
	equal(children.length, dataPointsNo, "I should have " + dataPointsNo + " data points");
});

test("Test Bar Height", function testBarHeight() {
	var children = getRectChildren(svg.children);
	var expectedHeights = [75, 67.5, 63.75];
	for (var i=0; i < data.length; i++) {
		equal(children[i].getAttribute("height"), expectedHeights[i], "The bar should be the height of the data");
	}
});

test("Test Bar X Postion", function testBarXPosition() {
	var children = svg.children;
	var expectedPosition = [19, 189, 359];
	for (var i=0; i< data.length; i++) {
		equal(children[i].getAttribute("x"), expectedPosition[i], "The bars should be progressively to the right");
	}
});

test("Test Bar Y Position", function testBarYPosition() {
	var children = svg.children;
	var expectedPosition = [75, 82.5, 86.25];
	for (var i=0; i < data.length; i++) {
		equal(children[i].getAttribute("y"), expectedPosition[i], "The bars should be alligned on the lower edges");
	}
})

test("Give Bars some width", function testBarWidth() {
	var children = svg.children;
	var expectedWidth = 153;
	for (var i=0; i < data.length; i++) {
		equal(children[i].getAttribute("width"), expectedWidth, "The bars should be of width " + expectedWidth);
	}
});

var getTextChildren = function(htmlCollection) {
	var array = Array.prototype.slice.call(htmlCollection);
	return array.filter(function(e) {
		return e.tagName === "text";
	});
}

test("Add text on the bars", function testText() {
	var textChildren = getTextChildren(svg.children);
	for (var i=0; i< data.length; i++) {
		equal(d3.select(textChildren[i]).text(), data[i].value, "The text should be equal to the value");
	}
});

test("Text X location", function textTextXLocation() {
	var textChildren = getTextChildren(svg.children);
	var expectedLocation = [95.5, 265.5, 435.5];
	for (var i=0; i < data.length; i++) {
		equal(textChildren[i].getAttribute("x"), expectedLocation[i], "The position should increse incrementally");
	}
});

test("Text Y location", function testTextYLocation() {
	var textChildren = getTextChildren(svg.children);
	var expectedLocation = [89, 96.5, 100.25];
	for (var i=0; i < data.length; i++) {
		equal(textChildren[i].getAttribute("y"), expectedLocation[i]);
	}
});
