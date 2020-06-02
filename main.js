const tooltip = document.getElementById("tooltip");

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((res) => res.json())
  .then((res) => {
    createCanvas(res.map((r) => [r.Time, new Date(r.Year)]));
  });

function createCanvas(data) {
  const w = 700;
  const h = 500;
  const padding = 40;

  console.log(data);

  const yScale = d3
    .scaleTime()
    .domain([0, d3.max(data, (d) => d[0])])
    .range([h - padding, padding]);

  const xScale = d3
    .scaleTime()
    .domain([d3.min(data, (d) => d[1]), d3.max(data, (d) => d[1])])
    .range([padding, w - padding]);
}
