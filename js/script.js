window.onload = function () {
	'use strict';
	var svg,
		width = document.querySelector('.network').offsetWidth,
		height = document.querySelector('.network').offsetHeight,
		gnode,
		link,
		jsonData,
		insertNode,
		insertLink,
		getData;

	insertNode = function (gnode, data, isNew) {
		var newData,
			link,
			node,
			label;

		if (isNew) {
			newData = getData();
			newData.nodes.push(data);
			data = newData;
		}

		link = d3.select('body').select('.link').selectAll('line');

		gnode = gnode.data(data.nodes).enter()
			.append('g')
			.attr('class', 'gnode');

		label = gnode.append('text')
			.attr('class', 'label')
			.attr('x', function (d) {
				return d.x;
			})
			.attr('y', function (d) {
				return d.y - 5;
			})
			.text(function (d) {
				return d.label;
			});

		node = gnode.append('circle')
			.attr('class', 'node')
			.attr('r', 4)
			.attr('cx', function (d) {
				return d.x;
			})
			.attr('cy', function (d) {
				return d.y;
			})
			.call(d3.behavior.drag()
				.origin(function (d) {
					return d;
				})
				.on('drag', function (d) {
					d.x = d3.event.x;
					d.y = d3.event.y;
					d3.select(this).attr('cx', d.x).attr('cy', d.y);
					label.filter(function (l) {
						return l === d;
					}).attr('x', d.x).attr('y', d.y - 5);
					link.filter(function (l) {
						return l.source === d;
					}).attr("x1", d.x).attr("y1", d.y);
					link.filter(function (l) {
						return l.target === d;
					}).attr("x2", d.x).attr("y2", d.y);
				}));
	};

	insertLink = function (link, data) {
		data.links.forEach(function (d) {
			d.source = data.nodes[d.source];
			d.target = data.nodes[d.target];
		});
		link = link.data(data.links).enter().append('line')
			.attr('x1', function (d) {
				return d.source.x;
			})
			.attr('y1', function (d) {
				return d.source.y;
			})
			.attr('x2', function (d) {
				return d.target.x;
			})
			.attr('y2', function (d) {
				return d.target.y;
			});
	};

	getData = function () {
		return jsonData;
	};

	svg = d3.select('body').select('.network')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	gnode = svg.selectAll('g');

	link = svg.append('g')
		.attr('class', 'link')
		.selectAll('line');

	d3.json('data.json', function (error, data) {
		jsonData = data;

		insertLink(link, jsonData);

		insertNode(gnode, jsonData);
	});

	/* controls */
	document.querySelector('#addNode').addEventListener('click', function () {
		var a = {
				x: parseInt(document.querySelector('#x').value),
				y: parseInt(document.querySelector('#y').value),
				label: document.querySelector('#label').value
			},
			gnode = d3.select('body').select('svg').selectAll('.gnode'),
			link = d3.select('body').select('.link').selectAll('line');

		insertNode(gnode, a, 1);

		document.querySelector('#x').value = '';
		document.querySelector('#y').value = '';
		document.querySelector('#label').value = '';
	});

	document.querySelector('#removeAllNodes').addEventListener('click', function () {
		d3.select('body').selectAll('.gnode').selectAll('circle').remove();
		d3.select('body').selectAll('.gnode').selectAll('text').remove();
		d3.select('body').select('.link').selectAll('line').remove();
	});
};