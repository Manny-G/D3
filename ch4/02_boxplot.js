function beginFunc() {
  d3.csv('boxplot.csv').then(data => dataViz(data));
}

function dataViz(data) {
  console.log(data);

  var margins = {top: 20, bottom: 20, left: 30, right: 30};
  width = 500 - margins.left - margins.right;
  height = 500 - margins.top - margins.bottom;

  d3.select('svg')
  .attr('height', height + margins.top + margins.bottom)
  .attr('width', width + margins.left + margins.right)
  .append('g')
  .attr('id', 'aaa')
  .attr('transform', `translate(${margins.left}, ${margins.top})`);

  var xRange = d3.max(data, d => parseInt(d.day));
  var yRange = d3.max(data, d => parseInt(d.max));
  var xScale = d3.scaleLinear().domain([0, xRange+1]).range([0, width]);
  var yScale = d3.scaleLinear().domain([0, yRange]).range([height, 0]);

  var svg = d3.select('#aaa')
  svg.append('g')
  .attr('id', 'yScaleId')
  .call(d3.axisLeft(yScale).ticks(10).tickSize(-width));
  svg.append('g')
  .attr('id', 'xScaleId')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale).ticks(10).tickSize(-height));

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('cx', d => xScale(d.day))
    .attr('cy', d => yScale(d.median))
    .style('fill', 'darkgray');

  svg.selectAll('g.box')
  .data(data)
  .enter()
  .append('g')
  .attr('class', 'box')
  .attr('transform', d => `translate(${xScale(d.day)}, ${yScale(d.median)})`)
  .each(function(d, i) {
    d3.select(this)
    .append('rect')
    .attr('height', yScale(d.q1) - yScale(d.q3))
    .attr('width', 20)
    .attr('x', -10)
    .attr('y', yScale(d.q3) - yScale(d.median))
    .style('fill', 'lightgray')
    .style('stroke', 'black')
  })
  .each(function(d, i) {
    d3.select(this)
    .append('line')
    .attr('class', 'range')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', yScale(d.max) - yScale(d.median))
    .attr('y2', yScale(d.min) - yScale(d.median))
    .style('stroke', 'black')
    .style('stroke-width', '4px')

    d3.select(this)
    .append('line')
    .attr('class', 'max')
    .attr('x1', -10)
    .attr('x2', 10)
    .attr('y1', yScale(d.max) - yScale(d.median))
    .attr('y2', yScale(d.max) - yScale(d.median))
    .style('stroke', 'black')
    .style('stroke-width', '4px')

    d3.select(this)
    .append('line')
    .attr('class', 'min')
    .attr('x1', -10)
    .attr('x2', 10)
    .attr('y1', yScale(d.min) - yScale(d.median))
    .attr('y2', yScale(d.min) - yScale(d.median))
    .style('stroke', 'black')
    .style('stroke-width', '4px')

    d3.select(this)
    .append('rect')
    .attr('class', 'range')
    .attr('height', yScale(d.q1) - yScale(d.q3))
    .attr('width', 20)
    .attr('x', -10)
    .attr('y', yScale(d.q3) - yScale(d.median))
    .style('fill', 'white')
    .style('stroke', 'black')
    .style('stroke-width', '4px')

    d3.select(this)
    .append('line')
    .attr('class', 'min')
    .attr('x1', -10)
    .attr('x2', 10)
    .attr('y1', 0)
    .attr('y2', 0)
    .style('stroke', 'darkgray')
    .style('stroke-width', '4px')
  })
}
