window.onload = function () {
	var svg,
		width = document.querySelector('.network').offsetWidth,
		height = document.querySelector('.network').offsetHeight - document.querySelector('h2').offsetHeight,
		node,
		jsonData;

	svg = d3.select('body').select('.network')
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
			});
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
};
