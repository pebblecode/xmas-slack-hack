##CRUK API
replace `CRUK API` with your project name

<!-- [![npm version](https://badge.fury.io/js/node-starter-kit.svg)](http://badge.fury.io/js/node-starter-kit) -->

[![Build Status](https://magnum.travis-ci.com/pebblecode/cruk-api.svg?token=F5kJ2zgCzNfgE9rzZNys&branch=master)](https://magnum.travis-ci.com/pebblecode/cruk-api)

|-----|--------|----------------|----------------|
|PATH | METHOD | Response       | Description    | 
|/api/ccg| GET | ```[{  
      "ccg":"02N",
      "name":"NHS Airedale, Wharfedale and Craven",
      "oneYearSurvivalRate":69.77,
      "firstTreatment":87.42138365,
      "pct":"Bradford and Airedale Teaching",
      "region":"Yorkshire and The Humber",
      "incidences":2222.7,
      "deaths":1115,
      "specialist":96.61,
      "emergencyRoutes":21.54566745,
      "patients":{  
         "ccg":"02N",
         "total_all":158110,
         "total_male":78029,
         "total_female":80081,
         "male_0-4":4385,
         "male_5-9":4918,
         "male_10-14":4818,
         "male_15-19":4658,
         "male_20-24":4152,
         "male_25-29":4467,
         "male_30-34":4484,
         "male_35-39":4486,
         "male_40-44":5138,
         "male_45-49":5789,
         "male_50-54":5860,
         "male_55-59":5312,
         "male_60-64":4830,
         "male_65-69":4971,
         "male_70-74":3597,
         "male_75-79":2653,
         "male_80-84":1948,
         "male_85-89":1033,
         "male_90-94":434,
         "male_95+":96,
         "female_0-4":4254,
         "female_5-9":4620,
         "female_10-14":4392,
         "female_15-19":4342,
         "female_20-24":4161,
         "female_25-29":4501,
         "female_30-34":4457,
         "female_35-39":4418,
         "female_40-44":5213,
         "female_45-49":5672,
         "female_50-54":5847,
         "female_55-59":5343,
         "female_60-64":4782,
         "female_65-69":5235,
         "female_70-74":3776,
         "female_75-79":3256,
         "female_80-84":2654,
         "female_85-89":1862,
         "female_90-94":1001,
         "female_95+":295
      },
      "stages":{  
         "ccg":"02N",
         "ciLower":29.3,
         "ciUpper":36,
         "reportingPeriod":2012,
         "breakdown":"CCG",
         "levelDescription":"NHS Airedale, Wharfedale and Craven CCG",
         "percentage":32.6,
         "denominator":"755",
         "numerator":"246"
      }
   },...]```    | Get All CCGS|
   

## NPM Commands
Test `npm run test` or `npm run test:watch`
Lint `npm run lint`
Coverage `npm run coverage`
Babel Transpile `npm run compile`

### Project Description
An API for the Cancer Research UK Data Hack

### MongoDB Install
DB Name: cruk
Collections: hospitals

data import notes:
```
mongoimport -d cruk -c meta --type csv --headerline ~/Downloads/Data\ download\ Nov\ 2015.xlsx\ -\ Metadata.csv 
mongoimport -d cruk -c data --type csv --headerline ~/Downloads/Data\ download\ Nov\ 2015.xlsx\ -\ Data.csv 

db.fullccgs.insert(db.ccgs.find().map(function(c) {
		c.data = db.data.find({
			"GeographyID": c.ccg
		}).toArray().map(function(indicator){
			indicator.meta = db.meta.findOne({
				"ElementID": indicator.IndicatorID
			})
			return indicator
		})
	    return c
	})
)
```
comparing IMD and mortality rates:
```
db.comparison.insert(
   db.fullccgs.find().map(function(fullccg){
      var imd = fullccg.data.filter(function(i){
         // print(JSON.stringify(i.IndicatorID))
         return i.IndicatorID === 103
      });

      return {
         IMD: imd[0] ? imd[0].Value : 'Unknown',
         mortalityRate: fullccg.deaths / fullccg.incidences,
         name: fullccg.name,
         ccg: fullccg.ccg
      }
   })
)

db.comparison.find({},{name: 1, IMD: 1, mortalityRate: 1, _id: 0}).sort({mortalityRate: -1}).pretty()

```

If you have issues running Mongo in OS X (it sometimes complains about opening /data/db/mongod.lock), you may need to chown the dir. This is as simple as:
`sudo chown -R `id -u` /data/db`