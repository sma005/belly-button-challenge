//Tutoring session with Geronimo Perez
//learned about deconstuction 

let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let optionChanged = id => {
  d3.json(url).then(({ metadata, samples }) => {

    let meta = metadata.find(obj => obj.id == id);
    let {otu_ids, sample_values, otu_labels} = samples.find(obj => obj.id == id);

    // Demographic Info
    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key,val]) => {
      d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`)
    });
    
    // Bar Chart
    var data = [
      {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).reverse().map(x=>`OTU ${x}`),
        text: otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
      }
    ];
    
    Plotly.newPlot('bar', data);
    
    // Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    };
    
    var data = [trace1];
    
    var layout = {
      xaxis: {
        title: {
          text: 'OTU ID'
        },
      }
    };
    
    Plotly.newPlot('bubble', data, layout);

    //Bonus gauge
    //Chose a different chart. Tired of working on it.
    var trace3 = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: meta.wfreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: { axis: { range: [null, 10] } }
      }
    ];
    
    var layout = { width: 600, height: 400 };
    Plotly.newPlot('gauge', trace3, layout);

  });
};

d3.json(url).then(({ names }) => {
  names.forEach(id => {
    d3.select('select').append('option').text(id);
  });

  optionChanged(names[0]);
});