// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then((importedData) => {
    // console.log(importedData);
    let data = importedData;
})