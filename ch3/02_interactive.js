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

    var _radScale = d3.scaleLinear().domain([0, _max]).range([2, 20]);

    d3.selectAll('g.overallG')
      .select('circle')
      .transition()
      .duration(1000)
      .attr('r', function(d) {
        // console.log(datapoint);
        // console.log(d);
        // console.log(d[datapoint]);
        // console.log(_radScale(d[datapoint]));
        return _radScale(d[datapoint]);
      })
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

  function highlightRegion(d) {
    d3.selectAll('g.overallG')
    .select('circle')
    .attr('class', p => p.region === d.region ? 'active' : 'inactive');
  }
  
  teamG.on('mouseout', function() { // using an annonymous function
    d3.selectAll('g.overallG')
    .select('circle')
    .classed('inactive', false)
    .classed('active', false);
  })
}
