//import * as prob from '../outliersLibrary.js'; //import machine broke


//Finds all volatility spikes using z score and calculates the peak to trough ratio of each spike.

  function getMean(dist) {
    // returns mean of set
      let sum = 0;
      for (const v of dist) {
        sum += v;
      }
      return (sum / dist.length);
  }
    
  function getSD(dist, mean) {
    // returns standard devitation of set
      let sum = 0;
      for (const v of dist) {
        sum += Math.pow(v - mean, 2);
      }
      if (sum <= 0) {
        console.log('Error: SD <= 0');
        return 0;
      }
      return Math.sqrt(sum / (dist.length));
    }
  
  function findSpikes(dataset,IV){
    //finds each volatility spike as a z score outlier 
    var mean = getMean(IV);
    var std = getSD(IV,mean);

    console.log();
    console.log("Mean: " + mean);
    console.log("SD:   " + std);
    console.log("-----------------------------------------------------");
    console.log();

    var z = 0;
    var spikes = [];

    for(date in dataset){
      z = (dataset[date]['iv'] - mean) / std;
      if(z > 1.5){ //arbitrary value to find peaks
        spikes.push(dataset[date]);
      }
    }

    if(dataset.indexOf(spikes[spikes.length-1]) == dataset.length - 1 ){ //if the last datapoint registers as a spike, remove
      //spikes.pop();
    }
    return spikes;
  }


  function consolidateSpikes(spikes, dataset){
    //Fixes the issue of having consecutive spikes with no dates between
    var spike1;
    var spike2;
    var newSpikes = [];
    var i = 0;
    var j = i + 1;

    while(j < spikes.length){
      spike1 = spikes[i];
      spike2 = spikes[j];
      dates = dataset.slice(dataset.indexOf(spike1) + 1, dataset.indexOf(spike2));

      if(dates.length == 1 && spikes.includes(dates[0])){ //if only date between spikes is a spike
        if(spike1['iv'] > spike2['iv']){
          if(j == spikes.length-1){ //last spike
            newSpikes.push(spike1);
          }
          j++;
        }
        else if(spike1['iv'] < spike2['iv']){
          if(j == spikes.length-1){ //last spike
            newSpikes.push(spike2);
          }
          i = j;
          j++;
        }
      } 
      else if(dates.length == 0){ //no dates between spikes
        if(spike1['iv'] > spike2['iv']){
          if(j == spikes.length-1){ //last spike
            newSpikes.push(spike1);
          }
          j++;
        }
        else if(spike1['iv'] < spike2['iv']){
          if(j == spikes.length-1){ //last spike
            newSpikes.push(spike2);
          }
          i++;
          j++
        }
      }
      else{
        newSpikes.push(spike1);
        i=j;
        j++;
        if(j == spikes.length){
          newSpikes.push(spikes[i]);
        }
      }
    }

    return newSpikes;
  }

  function findTrough(dates){
    //Finds lowest point between IV spikes
    var min = dates[0];

    for (date of dates){
      if(date['iv'] < min['iv']){
        min = date;
      }
    }
    return min;

  }

  function findTrough2(dates, spikes){
    //finds first instance after spike where IV drops below threshold (specified %change in IV)
    for (date of dates){
      if(!(spikes.includes(date))){
        return date;
      }
    }

    return findTrough(dates);
  }


//Main
const fs = require('fs');
fs.readFile('/Users/Eamon/Desktop/OutsmartOptions/volatility/AAPL_HV_3-19.json', 'utf8', (err, jsonString) => {	//file path for data here
    if (err) {
        console.log("File read failed:", err)
        return
    }
    var dataset = JSON.parse(jsonString);
    var IV = [];

    //collect IVs
    for(var date = 0; date < dataset.length; date++){
    	IV.push(dataset[date]['iv']);
    }

    var spikes = findSpikes(dataset,IV);
    console.log("Spikes detected: ")
    console.log(spikes);
    console.log();

    var trough;
    var dates;
    var spike1;
    var spike2;
    var peakToTroughRatio;
    var spikesCopy = spikes;
    spikes = consolidateSpikes(spikes, dataset);

    console.log("Spikes after consolidation: ");
    console.log(spikes);
    console.log("-----------------------------------------------------");

    for(var i = 0; i < spikes.length-1; i++){
      spike1 = spikes[i];
      spike2 = spikes[i+1];
      console.log();
      console.log("Current spike: ", spike1);
      console.log("Next spike: ", spike2);
      dates = dataset.slice(dataset.indexOf(spike1) + 1, dataset.indexOf(spike2));
      trough = findTrough2(dates, spikesCopy);
      console.log("Trough: ", trough);
      peakToTroughRatio = trough['iv'] / spike1['iv'];
      console.log("Ratio: ", peakToTroughRatio);
    }

    
    
      spike1 = spike2;
      spike2 = dataset[dataset.length-1];
      console.log();
      console.log("Current spike: ", spike1);
      console.log("Next spike: ", spike2);
      dates = dataset.slice(dataset.indexOf(spike1) + 1, dataset.indexOf(spike2));
      trough = findTrough2(dates, spikesCopy);
      console.log("Trough: ", trough);
      peakToTroughRatio = trough['iv'] / spike1['iv'];
      console.log("Ratio: ", peakToTroughRatio);
    
    
}
)