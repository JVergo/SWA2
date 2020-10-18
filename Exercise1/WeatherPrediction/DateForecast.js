//import ImmutableDataType from "./BaseClasses.js";
//console.log(ImmutableDataType);

const WeatherPrediction = require("./EventDataType.js");  //will this work for what I need? objects?

class MyDateInterval
{
    constructor(_fromDate, _toDate)
    {
        this.fromDate = new Date(_fromDate);
        this.toDate = new Date(_toDate); 
    }

    getFrom() { return this.fromDate };
    setPlace(newFromDate) { return new MyDateInterval(newFromDate, this.toDate) };

    getTo() { return this.toDate };
    setPlace(newToDate) { return new MyDateInterval(this.fromDate, newToDate) };
    
    contains(cDate) //could be written as a filter
    {
        const cDate2 = new Date(cDate);
        if(cDate2 >= this.fromDate && cDate2 <= this.toDate)
        {
            return true;
        }
        else
        {
            return false;
        }  
    };
    toString() { return `From: ${this.getFrom()}, To - ${this.getTo()}` }
}

console.log("Date Interval Test")
var date1 = new MyDateInterval("2020/3/14", "2020/3/21");
console.log(date1.getFrom())
console.log(date1.getTo())
console.log(date1.contains("2020/1/17"))
console.log(date1.contains("2020/3/18"))
console.log()


class WeatherForecast
{
    constructor(_weatherPrediction = [])
    {
        this.weatherPrediction = _weatherPrediction
        //array of weatherPredictions
    }

    getWeatherForecast() { return this.weatherPrediction}  
    addWeatherPrediction(data) { this.weatherPrediction.push(data) } 

    includesData(data) 
    {
        //const filterData = this.weatherPrediction.filter(prediction => )
        //use filter to find a single weatherPrediction within the weatherForecast array
    }

    //return the forecast per these defined places, types and/or periods
    forPlace(place) // works
    {
        const filteredPlaces = this.weatherPrediction.filter(prediction => prediction.place == place)
        return filteredPlaces
    }
    forType(type)
    {
        const filteredTypes = this.weatherPrediction.filter(prediction => prediction.type == type)
        return filteredTypes
    }
    forPeriod(periodStart, periodEnd)
    {
        // try using date interval contains 
        const filteredPeriod = this.weatherPrediction.filter(prediction => 
            prediction.time >= periodStart && prediction.time <= periodEnd)
        return filteredPeriod
    }

    convertToUsUnits()
    {
        //use map to convert every unit of from and to into international units
        const convertedArray = this.weatherPrediction.map((obj, p) =>
            {
                switch (p)
                {
                    case "CELSIUS":
                        obj.convertToFahrenheit  // how to access this method?
                        break;
                    case "MM":
                        break;
                    case "MS":
                        break;
                    default:
                        break;
                }
                return convertedArray
            })
    }
    convertToMetricUnits()
    {
        //use map to convert every unit of from and to into metric units
    }

    averageFromValue() // can't get the from value?
    {
        //use reduce to gather all from values in the weatherForecast array and return the result
        const reduceFrom = (sum, fromValue) => (sum + fromValue.fromNum) / this.weatherPrediction.length
        const average = this.weatherPrediction.reduce(reduceFrom)
        return average
    }
    averageToValue()
    {
        //use reduce to gather all to values in the weatherForecast array and return the result
        const reduceTo = (average, to, _, { length }) => average + to.toNum / length;
        return this.weatherPrediction.reduce(reduceTo);
    }

    //Testing Purposes
    toString() { return `Forecast: ${this.getWeatherForecast()}` }
}
console.log("Weather Forecast Test")
var prediction1 = new WeatherPrediction("MPH", "Wind", "Aarhus", null, 6, 12) 
var prediction2 = new WeatherPrediction("MPH", "Wind", "Aalborg", null, 8, 10)
var prediction3 = new WeatherPrediction("MS", "Wind", "Copenhagen", null, 3, 6)
var forecast = new WeatherForecast([prediction1, prediction2])
//console.log(forecast.toString())
forecast.addWeatherPrediction(prediction3)
console.log(forecast.getWeatherForecast())
console.log(forecast.forPlace("Copenhagen"))
//console.log(forecast.averageFromValue()) returns NaN