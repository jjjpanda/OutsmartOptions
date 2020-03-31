
  export function findSpikes(dataset, mean, std){
    //Find volatility spikes in dataset as z-score outliers
    //dataset: historic volatility data from json
    var z = 0;
    var spikes = [];

    for(date in dataset){
      z = (dataset[date]['iv'] - mean) / std;
      if(z > 1.5){ //value adjustable for detection sensitivity
        spikes.push(dataset[date]);
      }
    }
    return spikes;
  }

  export function filterSpikes(dataset, spikes){
    //Consolidate spikes of consecutive dates 
    //dataset: historic volatility data from json
    //spikes: array of all spikes detected in findSpikes()
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

  export function findTrough(dates, allSpikes){
    //finds first instance after spike where IV drops below threshold
    //Currently finds first non-spike, but can be updated to find first volatility below specified threshold
    //dates: array of all datapoints from current spike to next spike
    //allSpikes: array of all detected spikes (not filtered spikes)
    for (date of dates){
      if(!(allSpikes.includes(date))){
        return date;
      }
    }
    
    //If no date found, finds lowest point between IV spikes
    var min = dates[0];
    for (date of dates){
      if(date['iv'] < min['iv']){
        min = date;
      }
    }
    return min;
  }

//Function most likely not necessary,  better off making the calculation in whatever file imports this library. 
//Kept it just to show the process of calculating ratio for each spike.
  export function calculateRatios(dataset, spikes, allSpikes){
    //Calculates the peak to trough ratio for each volatility spike
    //dataset: json for historic volatility
    //spikes: peak IV instances in which peak to trough ratio will be calculated (filtered spikes)
    //allSpikes: all instances where spike detected, needed for finding troughs

    var spike1;
    var spike2;
    var ratios = [];

    for(var i = 0; i < spikes.length-1; i++){
        spike1 = spikes[i];
        spike2 = spikes[i+1];
        dates = dataset.slice(dataset.indexOf(spike1) + 1, dataset.indexOf(spike2));
        trough = findTrough(dates, allSpikes);
        ratios.push(trough['iv'] / spike1['iv']);
    }
  
    if(dataset.indexOf(spike2) != dataset.length - 1 ){ //If the last spike is not the last datapoint
        spike1 = spike2;
        dates = dataset.slice(dataset.indexOf(spike1) + 1, dataset.length-1);
        trough = findTrough(dates, allSpikes);
        ratios.push(trough['iv'] / spike1['iv']);
    }
  }
  
  