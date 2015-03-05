window.onload = function () {
	var svg,
		width = window.innerWidth,
		height = window.innerHeight - document.querySelector("h2").offsetHeight,
		node;

	svg = d3.select('body')
		.attr('tabindex', 1)
		.each(function () {
			this.focus();
		})
		.append('svg')
		.attr('width', width)
		.attr('height', height);
};
