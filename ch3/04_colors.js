function createSoccerViz() {
  d3.csv('worldcup.csv').then(d => overallTeamViz(d));
}

function overallTeamViz(data) {
  // console.log(data);

  const _keys = Object.keys(data[0])
    .filter(d => d !== 'team' && d !== 'region');

  // console.log(_keys);

  d3.select('#controls')
    .selectAll('button.teams')
    .data(_keys)
    .enter()
      .append('button')
      .on('click', buttonClick) // shorthand for .on('click', d => buttonClick(d))
      .html(d => d);

  function buttonClick(datapoint) {
    var _max = d3.max(data, d => parseFloat(d[datapoint]));
    // console.log(_max);
    
    //var _ybRamp = d3.scaleLinear().domain([0, _max]).range(['blue', 'yellow']); // original, linear color map, bad design, pick something from below

    //var _ybRamp = d3.scaleLinear().interpolate(d3.interpolateHsl).domain([0, _max]).range(['blue', 'yellow']);
    //var _ybRamp = d3.scaleLinear().interpolate(d3.interpolateHcl).domain([0, _max]).range(['blue', 'yellow']);
    // var _ybRamp = d3.scaleLinear().interpolate(d3.interpolateLab).domain([0, _max]).range(['blue', 'yellow']);

    //var leagues = ["UEFA", "CONMEBOL", "CAF", "AFC"];
    //var leagues = ["UEFA", "CONMEBOL"];
    //var tenColorScale = d3.scaleOrdinal().domain(leagues).range(d3.schemeCategory10).unknown('#c4b9ac'); // more standardized catagorical colors
    var colorQuantize = d3.scaleQuantize().domain([0, _max]).range(colorbrewer.Reds[5]); // more standardized catagorical colors

    var _radScale = d3.scaleLinear().domain([0, _max]).range([2, 20]);

    d3.selectAll('g.overallG')
      .select('circle')
      .transition()
      .duration(1000)
      .attr('r', d => _radScale(d[datapoint]))
      //.style('fill', d => _ybRamp(d[datapoint]));
      //.style('fill', d => tenColorScale(d.region));
      .style('fill', d => colorQuantize(d[datapoint]));
  }

  d3.select('svg')
    .append('g')
      .attr('id', 'teamsG')
      .attr('transform', 'translate(50, 300)')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
        .attr('class', 'overallG')
        .attr('transform', (d, i) => `translate(${i*50}, 0)`);

  var teamG = d3.selectAll('g.overallG');

  teamG.append('circle')
    .attr('r', 0)
    .transition()
    .delay((d, i) => i*100)
    .duration(500)
    .attr('r', 40)
    .transition()
    .duration(500)
    .attr('r', 20);

  teamG.append('text')
    .attr('y', 30)
    .text(d => d.team);

  teamG.select('text').style('pointer-events', 'none'); // disable mouseover/mouseout for text

  teamG.on('mouseover', highlightRegion); // using a named function

  // Original way to do it (honestly fine)
  // function highlightRegion(d) {
  //   d3.selectAll('g.overallG')
  //   .select('circle')
  //   .attr('class', p => p.region === d.region ? 'active' : 'inactive');
  // }
  //
  // teamG.on('mouseout', function() { // using an annonymous function
  //   d3.selectAll('g.overallG')
  //   .select('circle')
  //   .classed('inactive', false)
  //   .classed('active', false);
  // })

  function highlightRegion(d, i) {
    var _color = d3.rgb('#75739F');

    d3.select(this)
    .select('text')
    .classed('active', true)
    .attr('y', 10)

    d3.selectAll('g.overallG')
    .select('circle')
    // .each(function(p) {
    //   p.region === d.region ? d3.select(this).classed('active', true) : d3.select(this).classed('inactive', true);
    // });
    .style('fill', p => p.region === d.region ? _color.darker(.75) : _color.brighter(.5));

    this.parentElement.appendChild(this); // re-appending itself? Hack around layover
  }

  teamG.on('mouseout', function() {
    d3.selectAll('g.overallG')
    .select('circle')
    .attr('class', '')
    .style('fill', '#75739F');

    d3.selectAll('g.overallG')
    .select('text')
    .attr('y', 30)
    .classed('inactive', false)
    .classed('active', false);
  })

}


