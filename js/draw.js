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

  var feels = {
    'an affectionate': 'hsla(243, 93%, 64%, 1)',
    'an ambivalent': 'hsla(243, 10%, 64%, 1)',
    'an oppressed by the Western cannon': 'hsla(243, 10%, 27%, 1)',
    'a cozy': 'hsla(243, 43%, 33%, 1)',
    'a cringe-stalgic': 'hsla(109, 81%, 56%, 1)',   
    'a curious': 'hsla(222, 90%, 33%, 1)',
    'an empowered': 'hsla(6, 90%, 43%, 1)',
    'an excited': 'hsla(6, 100%, 53%, 1)',
    'a guilty': 'hsla(164, 100%, 22%, 1)',
    'an introspective': 'hsla(164, 100%, 49%, 1)',
    'a minimalist': 'hsla(0, 24%, 90%, 1)',
    'a nostalgic': 'hsla(350, 100%, 88%, 1)',
    'a proud': 'hsla(6, 90%, 43%, 1)',
    'a wistful': 'hsla(239, 36%, 18%, 1)',
    'an unrepentant': 'hsla(320, 100%, 49%, 1)',
    'an indefinable': 'hsla(243, 10%, 52%, 1)'
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

    var n = Math.floor(Math.random() * (data.length + 1));
    var dataView = [data[n]];

    console.log(dataView);

    svg.append("rect")
      .data(dataView)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", function(d){ return feels[d.feeling]; });

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

      // Update background

       svg.insert("rect", "circle")
         .data(dataView)
         .attr("width", "100%")
         .attr("height", "100%")
         .attr("fill", function(d){ return feels[d.feeling]; });

      // Update circle

      var bookCircles = svg.selectAll('circle')
        .data(dataView);

      bookCircles.transition()
        .duration(1000)
        .ease('elastic')
        .attr('r', function(d, i){

          var temp = Math.sqrt(rScale(d.pages)/Math.PI);
          if (!(0 < temp && temp < 10000)) {
            console.log(dataView);
          }

          return Math.sqrt(rScale(d.pages)/Math.PI);
        }) /*square root of pages normalized over pi*/
        .attr('fill', function(d){ return colors[d.genre]; });
    }

    setInterval(changeBooks, 1000);
  })
}

$(document).ready(function(){
  draw();
})