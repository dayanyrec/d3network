window.onload = function () {
	var svg,
		width = document.querySelector('.network').offsetWidth,
		height = document.querySelector('.network').offsetHeight,
		node,
		jsonData;

	svg = d3.select('body').select('.network')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	node = svg.append('g')
		.attr('class', 'node')
		.selectAll('circle');

	d3.json('data.json', function (error, data) {
		jsonData = data;
		insertNode(node, jsonData);
	});

	insertNode = function (node, data, isNew) {
		var newData;
		if (isNew) {
			newData = getData();
			newData.nodes.push(data);
			data = newData;
		}

		node = node.data(data.nodes).enter().append('circle')
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
					d.x = d3.event.x, d.y = d3.event.y;
					d3.select(this).attr('cx', d.x).attr('cy', d.y);
				}));
	};

	getData = function () {
		return jsonData;
	};

	/* controls */
	document.querySelector('#addNode').addEventListener('click', function () {
		var a = {
				x: document.querySelector('#x').value,
				y: document.querySelector('#y').value
			},
			node = d3.select('body').select('.node').selectAll('circle');

		insertNode(node, a, 1);

		document.querySelector('#x').value = '';
		document.querySelector('#y').value = '';
	});

	document.querySelector('#removeAllNodes').addEventListener('click', function () {
		d3.select('body').select('.node').selectAll('circle').remove();
	});
};
