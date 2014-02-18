function draw(){
  var width = window.innerWidth,
    height = window.innerHeight;

  var colors = {
    "comic": "#11b4c3",
    "art and design": "#fa660f",
    "fiction": "#f86984",
    "mystery": "#1ee638",
    "nonfiction": "#d00",
    "literary theory": "#8c23d5",
    "book on books": "#7a7594",
    "sports": "#261bd8",
    "grab bag": "#fbac1c"
  };

  var svg = d3.select('.chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var smallest = d3.min([width, height]);

  var rScale = d3.scale.linear()
    .range([0, Math.pow(smallest, 1.9)]);

  d3.json('js/books.json', function(error, data){

    data.forEach(function(d) {
      d.pages = +d.pages;
    });

    rScale.domain([0, d3.max(data, function(d){return d.pages;})]);
    
    var chart = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', width/2)
      .attr('cy', height/2)
      .attr('r', function(d){return Math.sqrt(rScale(d.pages)/Math.PI);}) /*square root of pages normalized over pi*/
      .attr('fill', function(d){ return colors[d.genre]; });

  })
}

$(document).ready(function(){
  draw();
})