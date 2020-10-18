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
        //where should the weatherPrediction array be declared in a class context?
    }

    getWeatherForecast() { return this.weatherPrediction}  // works
    addWeatherPrediction(data) { this.weatherPrediction.push(data) } // works
    getObject() { return this }

    includesData(data) // doesn't work the way i thought it would
    {
        //const includes = this.weatherPrediction.filter(prediction => prediction.data == data);
        const includes = this.weatherPrediction.filter((prediction) => prediction.data == data)
        return includes;
        //use filter to find a single weatherPrediction within the weatherForecast array
    }

    //are these 3 methods for getting or setting a place, type and period respectively?
    //return the forecast per these defined places, types and/or periods?
    forPlace(place)
    {
        const places = this.weatherPrediction.filter(prediction => prediction.place);
        //i don't think this is quite correct
    }
    forType(type)
    {

    }
    forPeriod(period)
    {
        // map function?
    }

    convertToUsUnits()
    {
        //use filter to convert every unit of from and to into international units
    }
    convertToMetricUnits()
    {
        //use filter to convert every unit of from and to into metric units
    }

    averageFromValue()
    {
        //use reduce to gather all from values in the weatherForecast array and return the result
        //const fromNums = this.weatherPrediction.filter(prediction => prediction.fromNum);
        //const reducer = (average, prediction, _, { length }) => average + prediction.fromNum / length;
        //return this.weatherPrediction.reduce(reducer);

        const average = this.weatherPrediction.reduce((avg, prediction) => 
            avg + prediction.getFrom(), 0) / this.weatherPrediction.length;
        return average;
        //return fromNums  //why am i getting the whole object?
        //why are the return values not being stored and returned?  array?
    }
    averageToValue()
    {
        //use reduce to gather all to values in the weatherForecast array and return the result
        //correction, i need to use filter then 
        const reducer = (average, to, _, { length }) => average + to / length;
        return toNums.reduce(reducer);
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
//console.log(forecast.getWeatherForecast())
//console.log(forecast.getObject())
//console.log(forecast.includesData(unit))  // how to pass in user-defined value?
console.log(forecast.averageFromValue())  // returning false?