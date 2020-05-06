function beginFunc() {
  d3.json('00_coin_toss.json').then(csv => dataViz(csv));
}

function dataViz(data) {
  console.log(data['roll']);

  var svgHeight = 600;
  var svgWidth = 600;
  var margin = {top: 40, bottom: 40, left: 40, right: 40}
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  d3.selectAll('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)
    .style('border', '1px lightgray solid')
    .append('g')
      .attr('id', 'svgId')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

  var svg = d3.selectAll('#svgId')

  var tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tootipId')
    .style('position', 'absolute')			
    .style('text-align', 'center')			
    .style('width', '120')					
    .style('height', '14')					
    .style('padding', '5px')				
    .style('font', '12px sans-serif')		
    .style('background', 'lightsteelblue')	
    .style('border', '1px black solid')		
    .style('border-radius', '20px')			
    .style('pointer-events', 'none')	
    .style('visibility', 'hidden')

  var sizes = d3.extent(data['roll'], d => d.length)
  var normalizer = data['roll'].length
  var allSampleCounts = Array(sizes[1] - sizes[0] + 1).fill(0)
  data['roll'].forEach(elem => allSampleCounts[elem.length - sizes[0]]++)
  console.log(allSampleCounts)

  var numSamples = [0, d3.max(allSampleCounts)/normalizer+0.03]
  var xScale = d3.scaleLinear().domain([sizes[0]-1, sizes[1]+1]).range([0, width])
  var yScale = d3.scaleLinear().domain(numSamples).range([height, 0])


  svg.append('g')
    .attr('id', 'xAxisId')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickSize(-height))
    .append('text')
      .attr('x', width/2)
      .attr('y', 25)
      .attr('fill', 'black')
      .style('font-style', 'italic')
      .style('font-weight', 'bold')
      .text('Number of Coin Flips')
    
  svg.append('g')
    .attr('id', 'yAxisId')
    .call(d3.axisLeft(yScale).tickSize(-width))
    .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('transform', `translate(-25, ${height/2}) rotate(-90)`)
      .attr('fill', 'black')
      .style('font-style', 'italic')
      .style('font-weight', 'bold')
      .text('Percentage')

  svg.append('g')
    .attr('id', 'catagoryRectId')
    .selectAll('rect')
    .data(allSampleCounts)
    .enter()
      .append('rect')
      .attr('height', (d, i) => height-yScale(d/normalizer))
      .attr('width', 10)
      .attr('x', (d, i) => xScale(i+sizes[0])-5)
      .attr('y', (d, i) => yScale(d/normalizer))
      .style('fill', 'lightblue')
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .on('mouseover', d => {
        tooltip.text(`percentage = ${(d/normalizer).toFixed(3)}`)
          .style('visibility', 'visible')
      })
      .on('mousemove', d => {
        tooltip.style('top', `${d3.event.pageY-10}px`)
          .style('left', `${d3.event.pageX+10}px`)
      })
      .on('mouseout', d => {
        tooltip.text('hello')
          .style('visibility', 'hidden')
      })

}
