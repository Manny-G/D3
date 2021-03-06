function createSoccerViz() {
  d3.csv('worldcup.csv').then(d => overallTeamViz(d));
}

function overallTeamViz(data) {
  console.log(data);

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
    .attr('r', 20);

  teamG.append('text')
    .attr('y', 30)
    .text(d => d.team);

}
