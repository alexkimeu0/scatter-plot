const tooltip = document.getElementById("tooltip");

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((res) => res.json())
  .then((res) => {
    createCanvas(
      res.map((r) => [convertTime(r.Time), r.Year, r.Name, r.Doping])
    );
  });

function convertTime(str) {
  return new Date(`2010 01 01 00:${str}`);
}

function createToolTipHTML(d) {
  return `
    ${d[2]}(${d[1]})<br> 
Time: ${d[0].getMinutes()}:${d[0].getSeconds()}
<br>
   
<small>
  ${d[3] ? d[3] : ""}
</small>`;
}

function createCanvas(data) {
  const w = 800;
  const h = 400;
  const padding = 40;

  const circleRadius = 5;

  const yScale = d3
    .scaleTime()
    .domain([d3.min(data, (d) => d[0]), d3.max(data, (d) => d[0])])
    .range([padding, h - padding]);

  const xScale = d3
    .scaleTime()
    .domain([
      d3.min(data, (d) => new Date(d[1] - 1)),
      d3.max(data, (d) => new Date(d[1] + 1)),
    ])
    .range([padding, w - padding]);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d[1])
    .attr("data-yvalue", (d) => d[0])
    .attr("cx", (d) => xScale(d[1]))
    .attr("cy", (d) => yScale(d[0]))
    .attr("r", circleRadius)
    .on("mouseover", (d, i) => {
      tooltip.classList.add("show");

      tooltip.style.left = xScale(d[1]) - 350 + "px";
      tooltip.style.top = yScale(d[0]) + "px";
      tooltip.setAttribute("data-year", d[1]);

      tooltip.innerHTML = createToolTipHTML(d);
    })
    .on("mouseout", () => {
      tooltip.classList.remove("show");
    });

  const timeFormat = d3.timeFormat("%M:%S");
  const yearFormat = d3.format("d");

  // Create Axis
  const xAxis = d3.axisBottom(xScale).tickFormat(yearFormat);
  const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${h - padding})`)
    .attr("id", "x-axis")
    .call(xAxis);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .attr("id", "y-axis")
    .call(yAxis);
}
