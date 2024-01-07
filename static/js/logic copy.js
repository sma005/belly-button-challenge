// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
// Worked with rperron from BCS
//Honestly, do the dropdown menu last. That is your best bet. Make sure that you can do the bar chart, the bubble chart, 
//and get the metadata for the very first sample. Once we get to the dropdown menu we have to adjust your code a bit so that we can have 
//the values update dynamically and trying to focus on making it dynamic right from the start will make it so much harder for you to troubleshoot initially.
// Once you have everything else working, we can help you with the dropdown menu in a different ask (edited) 

let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initializes the page with a default plot
function init() {

let names = "";
let metadata = "";
let samples = "";

    d3.json(url).then((importedData) => {
        console.log(importedData);
        let data = importedData;
 
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;

        let otuWithValues = [];

        //although probably not necessary, the data should be sorted, just to make sure we get the top 10
        //https://stackoverflow.com/questions/7196212/how-to-create-a-dictionary-and-add-key-value-pairs-dynamically-in-javascript#:~:text=You%20can%20just%20do%20this,afterward%20var%20dict%20%3D%20%7B%7D%3B%20dict.
        for (let i=0; i < samples[0].sample_values.length; i++) {
            otuWithValues.push({key: samples[0].otu_ids[i], value: samples[0].sample_values[i]});
        }

        //Find top 10 
        let orderedOTU = otuWithValues.sort((a, b) => b.value - a.value);
        let topTenOTUwithValues = orderedOTU.slice(0, 10);

        //turn back into lists for plot
        let otuNames = [];
        let otuValues = [];
        let topTenList = [];
        
        for (let i=0; i < topTenOTUwithValues.length; i++) {
            otuNames.push(topTenOTUwithValues[i].key);
            otuValues.push(topTenOTUwithValues[i].value);

            let topTen = new Object();
            topTen.name = topTenOTUwithValues[i].key;
            topTen.otuReading = topTenOTUwithValues[i].value;

            topTenList.push(topTen);
        }

        console.log(topTenList);
        console.log(otuNames);
        // console.log(otuValues);
        console.log(topTenOTUwithValues);
        // Reverse the array to accommodate Plotly's defaults
        otuValues.reverse();

        let trace1 = {
            x: otuValues,
            y: otuNames.map(otuID => `OTU ${otuID}`),
            //text: "OTU"+ otuNames.toString(),
            //name: "OTUs",
            type: "bar",
            orientation: "h"
        }

        console.log(otuValues);
        console.log(otuNames.toString());

        // Data array
        let patientData = [trace1];
        Plotly.newPlot("bar", patientData);


        //bubble chart
        
    })

  }
  
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("selDataset").on("change", updatePlotly);
  
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    let x = [];
    let y = [];
  
    if (dataset === 'dataset1') {
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 4, 8, 16];
    }
  
    else if (dataset === 'dataset2') {
      x = [10, 20, 30, 40, 50];
      y = [1, 10, 100, 1000, 10000];
    }
  
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
  }
  
  init();