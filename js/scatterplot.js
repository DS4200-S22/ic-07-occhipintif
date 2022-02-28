/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 

const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/scatter.csv").then((data3) => {
  
  let x1, y1, x2, y2, x3, y3;  

  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  {
    let xKey1 = "day";
    let yKey1 = "score";

    // Find max x
    let maxX1 = d3.max(data3, (d) => { return d[xKey1]; });

    maxY1 = d3.max(data3, function(d) { return d.score; });

    // Create X scale
    let x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 

    let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

    let xScale1 = d3.scaleBand()
            .domain(d3.range(data3.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

    svg3.append("g")
            .attr("transform", `translate(${margin.left}, 0)`) 
            .call(d3.axisLeft(yScale1)) 
            .attr("font-size", '20px'); 

    svg3.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`) 
            .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data3[i].day))  
            .attr("font-size", '20px');

    const tooltip3 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip3") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

const mouseover3 = function(event, d) {
  tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

const mouseleave3 = function(event, d) { 
  tooltip3.style("opacity", 0); 
}

svg3.selectAll(".bar") 
   .data(data3) 
   .enter()  
   .append("circle") 
     .attr("class", "scatter") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover3) 
     .on("mousemove", mousemove3)
     .on("mouseleave", mouseleave3);
      }
    });