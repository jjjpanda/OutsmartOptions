const { mathematique } = require('que-series')
const math = mathematique.volatility
const stats = mathematique.stats

var dataset1 = [{
    "date": "2019-03-27",
    "iv": 0.03831965186723473
  },
  {
    "date": "2019-04-03",
    "iv": 0.058260714165182935
  },
  {
    "date": "2019-04-10",
    "iv": 0.3927147415327733
  },
  {
    "date": "2019-04-17",
    "iv": 0.7324092816532125
  },
  {
    "date": "2019-04-24",
    "iv": 1.4280485561461271
  },
  {
    "date": "2019-05-01",
    "iv": 1.2538958149246202
  },
  {
    "date": "2019-05-08",
    "iv": 0.6541888056369215
  },
  {
    "date": "2019-05-15",
    "iv": 0.2140119149241568
  },
  {
    "date": "2019-05-22",
    "iv": 0.06307727777731162
  },
  {
    "date": "2019-05-29",
    "iv": 0.04784187602224878
  },
  {
    "date": "2019-06-05",
    "iv": 0.033582805616206614
  },
  {
    "date": "2019-06-12",
    "iv": 0.11853276020288159
  },
  {
    "date": "2019-06-19",
    "iv": 0.15659015243624205
  },
  {
    "date": "2019-06-26",
    "iv": 0.12235132596112372
  },
  {
    "date": "2019-07-03",
    "iv": 0.2791776351975302
  },
  {
    "date": "2019-07-10",
    "iv": 0.3243288551995027
  },
  {
    "date": "2019-07-17",
    "iv": 0.25716273184379923
  },
  {
    "date": "2019-07-24",
    "iv": 0.39841367540337835
  },
  {
    "date": "2019-07-31",
    "iv": 0.32852362085820114
  },
  {
    "date": "2019-08-07",
    "iv": 0.07952588466876367
  },
  {
    "date": "2019-08-14",
    "iv": 0.07531745239624751
  },
  {
    "date": "2019-08-21",
    "iv": 0.15827717221918966
  },
  {
    "date": "2019-08-28",
    "iv": 0.08563207322292452
  },
  {
    "date": "2019-09-04",
    "iv": 0.03832050908248032
  },
  {
    "date": "2019-09-11",
    "iv": 0.06460088166579483
  },
  {
    "date": "2019-09-18",
    "iv": 0.032049207785719395
  },
  {
    "date": "2019-09-25",
    "iv": 0.019996007943227603
  },
  {
    "date": "2019-10-02",
    "iv": 0.02497880862464527
  },
  {
    "date": "2019-10-09",
    "iv": 0.04705014172714481
  },
  {
    "date": "2019-10-16",
    "iv": 0.04222494080706119
  },
  {
    "date": "2019-10-23",
    "iv": 0.04296688144469961
  },
  {
    "date": "2019-10-30",
    "iv": 0.03894109674671989
  },
  {
    "date": "2019-11-06",
    "iv": 0.04678807908919647
  },
  {
    "date": "2019-11-13",
    "iv": 0.07813154064982708
  },
  {
    "date": "2019-11-20",
    "iv": 0.044148845217687464
  },
  {
    "date": "2019-11-27",
    "iv": 0.016107297173503936
  },
  {
    "date": "2019-12-04",
    "iv": 0.0059694047440244135
  },
  {
    "date": "2019-12-11",
    "iv": 0.02158627858711534
  },
  {
    "date": "2019-12-18",
    "iv": 0.015649125187230547
  },
  {
    "date": "2019-12-25",
    "iv": 0.03128232165596282
  },
  {
    "date": "2020-01-01",
    "iv": 0.1931559413002667
  },
  {
    "date": "2020-01-08",
    "iv": 0.13298642228948496
  },
  {
    "date": "2020-01-15",
    "iv": 0.16749527594281352
  },
  {
    "date": "2020-01-22",
    "iv": 0.35099681559164403
  },
  {
    "date": "2020-01-29",
    "iv": 1.7117732499072413
  },
  {
    "date": "2020-02-05",
    "iv": 1.0312242004318788
  },
  {
    "date": "2020-02-12",
    "iv": 1.499079579607534
  }
];

//collect IVs
var IV = [];
for(var day = 0; day < dataset1.length; day++){
    IV.push(dataset1[day]['iv']);
}
var mean1 = stats.getMean(IV);
var sd1 = stats.getSD(IV, mean1);

var allSpikes1 = [{ date: '2019-04-24', iv: 1.4280485561461271 },
{ date: '2019-05-01', iv: 1.2538958149246202 },
{ date: '2020-01-29', iv: 1.7117732499072413 },
{ date: '2020-02-05', iv: 1.0312242004318788 },
{ date: '2020-02-12', iv: 1.499079579607534 } ];

var spikes1 = [{ date: '2019-04-24', iv: 1.4280485561461271 },{ date: '2020-01-29', iv: 1.7117732499072413 }];

var dates1 = [{
    "date": "2019-05-01",
    "iv": 1.2538958149246202
  },
  {
    "date": "2019-05-08",
    "iv": 0.6541888056369215
  },
  {
    "date": "2019-05-15",
    "iv": 0.2140119149241568
  },
  {
    "date": "2019-05-22",
    "iv": 0.06307727777731162
  },
  {
    "date": "2019-05-29",
    "iv": 0.04784187602224878
  },
  {
    "date": "2019-06-05",
    "iv": 0.033582805616206614
  },
  {
    "date": "2019-06-12",
    "iv": 0.11853276020288159
  },
  {
    "date": "2019-06-19",
    "iv": 0.15659015243624205
  },
  {
    "date": "2019-06-26",
    "iv": 0.12235132596112372
  },
  {
    "date": "2019-07-03",
    "iv": 0.2791776351975302
  },
  {
    "date": "2019-07-10",
    "iv": 0.3243288551995027
  },
  {
    "date": "2019-07-17",
    "iv": 0.25716273184379923
  },
  {
    "date": "2019-07-24",
    "iv": 0.39841367540337835
  },
  {
    "date": "2019-07-31",
    "iv": 0.32852362085820114
  },
  {
    "date": "2019-08-07",
    "iv": 0.07952588466876367
  },
  {
    "date": "2019-08-14",
    "iv": 0.07531745239624751
  },
  {
    "date": "2019-08-21",
    "iv": 0.15827717221918966
  },
  {
    "date": "2019-08-28",
    "iv": 0.08563207322292452
  },
  {
    "date": "2019-09-04",
    "iv": 0.03832050908248032
  },
  {
    "date": "2019-09-11",
    "iv": 0.06460088166579483
  },
  {
    "date": "2019-09-18",
    "iv": 0.032049207785719395
  },
  {
    "date": "2019-09-25",
    "iv": 0.019996007943227603
  },
  {
    "date": "2019-10-02",
    "iv": 0.02497880862464527
  },
  {
    "date": "2019-10-09",
    "iv": 0.04705014172714481
  },
  {
    "date": "2019-10-16",
    "iv": 0.04222494080706119
  },
  {
    "date": "2019-10-23",
    "iv": 0.04296688144469961
  },
  {
    "date": "2019-10-30",
    "iv": 0.03894109674671989
  },
  {
    "date": "2019-11-06",
    "iv": 0.04678807908919647
  },
  {
    "date": "2019-11-13",
    "iv": 0.07813154064982708
  },
  {
    "date": "2019-11-20",
    "iv": 0.044148845217687464
  },
  {
    "date": "2019-11-27",
    "iv": 0.016107297173503936
  },
  {
    "date": "2019-12-04",
    "iv": 0.0059694047440244135
  },
  {
    "date": "2019-12-11",
    "iv": 0.02158627858711534
  },
  {
    "date": "2019-12-18",
    "iv": 0.015649125187230547
  },
  {
    "date": "2019-12-25",
    "iv": 0.03128232165596282
  },
  {
    "date": "2020-01-01",
    "iv": 0.1931559413002667
  },
  {
    "date": "2020-01-08",
    "iv": 0.13298642228948496
  },
  {
    "date": "2020-01-15",
    "iv": 0.16749527594281352
  },
  {
    "date": "2020-01-22",
    "iv": 0.35099681559164403
  }];

  console.log(math.filterSpikes(dataset1,allSpikes1));


describe('Volatility Math Test', () => {
    it('Find all volatility spikes', () =>{
        expect(math.findSpikes(dataset1, mean1, sd1)).toEqual(allSpikes1);
    });
    
    it('Filter volatility spikes', () => {
        expect(math.filterSpikes(dataset1,allSpikes1)).toEqual(spikes1);
    });

    it('Find trough', () => {
        //expect(math.findTrough(dates1,allSpikes1)).toEqual({date: '2019-05-08', iv: 0.6541888056369215})
    });
    
});

