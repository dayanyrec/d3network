window.onload = function () {
	var svg,
		width = window.innerWidth,
		height = window.innerHeight - document.querySelector('h2').offsetHeight,
		node;

	svg = d3.select('body')
		.attr('tabindex', 1)
		.each(function () {
			this.focus();
		})
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	node = svg.append('g')
		.attr('class', 'node')
		.selectAll('circle');

	d3.json('data.json', function (error, data) {
		node = node.data(data.nodes).enter().append('circle')
			.attr('r', 4)
			.attr('cx', function (d) {
				return d.x;
			})
			.attr('cy', function (d) {
				return d.y;
			});
	});
};
