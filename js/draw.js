function draw(){
  var width = window.innerWidth,
    height = window.innerHeight;

  var colors = {
    "comic": "hsla(185, 84%, 42%, 1)",
    "art and design": "hsla(22, 96%, 52%, 1)",
    "fiction": "hsla(349, 91%, 69%, 1)",
    "mystery": "hsla(128, 80%, 51%, 1)",
    "nonfiction": "hsla(0, 100%, 43%, 1)",
    "literary theory": "hsla(275, 72%, 49%, 1)",
    "book on books": "hsla(250, 13%, 52%, 1)",
    "sports": "hsla(243, 78%, 48%, 1)",
    "grab bag": "hsla(39, 97%, 55%, 1)"
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

    var n = 0;
    var dataView = [data[n]];

    console.log(dataView);
    
    var chart = svg.selectAll('circle')
      .data(dataView)
      .enter()
      .append('circle')
      .attr('cx', width/2)
      .attr('cy', height/2)
      .attr('r', function(d){return Math.sqrt(rScale(d.pages)/Math.PI);}) /*square root of pages normalized over pi*/
      .attr('fill', function(d){ return colors[d.genre]; });

    function changeBooks() {

      // Update data view
      
      n++;
      n %= data.length;

      dataView = [data[n]];

      // console.log('data-n', data[n]);

      // dataView.push(data[n]);

      console.log('dataview', dataView);

      // dataView.shift();

      
      // console.log(dataView);

      // Select + bind

      var bookCircles = svg.selectAll('circle')
        .data(dataView);

      bookCircles.transition()
        .duration(1000)
        .attr('r', function(d){return Math.sqrt(rScale(d.pages)/Math.PI);}) /*square root of pages normalized over pi*/
        .attr('fill', function(d){ return colors[d.genre]; });

      // // -- testing enter + exit ... --

      // // Enter

      // bookCircles.enter()
      //   .append('circle')
      //   .transition()
      //   .duration(1000)
      //   .attr('cx', width/2)
      //   .attr('cy', height/2)
      //   .attr('r', function(d){return Math.sqrt(rScale(d.pages)/Math.PI);}) /*square root of pages normalized over pi*/
      //   .attr('fill', function(d){ return colors[d.genre]; });

      // // No update, but ... EXIT

      // bookCircles.exit()
      //   .transition()
      //   .duration(500)
      //   .attr('r', 0)
      //   .remove();

      // -- OR can alternately transition single circle into new single data again ... --



    }

    setInterval(changeBooks, 1000);

  })
}

$(document).ready(function(){
  draw();
})