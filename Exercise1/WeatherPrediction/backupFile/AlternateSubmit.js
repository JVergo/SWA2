/*
This file is a backup in case my export and imports do not work in my other submission.
*/

// Date Interval
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


// Event and DataType
class ImmutableEvent {
    constructor(_place, _time) {
        this.place = _place;
        if (_time == null) {
            this.time = new Date().toLocaleString();
        }
        else
            this.time = _time;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableEvent) {
            Object.freeze(this)
        }
    }

    getPlace() { return this.place }
    setPlace(_newPlace) { return new ImmutableEvent(_newPlace, this.time) }
    
    getTime() { return this.time }
    toString() { return `Place: ${this.getPlace()}, Time - ${this.getTime()}` }
}
console.log("Event Test")
var myEvent = new ImmutableEvent('Horsens');
console.log(myEvent.toString());
console.log()

class ImmutableDataType extends ImmutableEvent {
    constructor(_unit, _type, _place, _time) {
        super(_place, _time);

        this.unit = _unit;
        this.type = _type;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableDataType) {
            Object.freeze(this)
        }
    }

    getUnit() { return this.unit }
    setUnit(newUnit) { return new ImmutableDataType(newUnit, this.type, this.place, this.time) }

    getType() { return this.type }
    setType(newType) { return new ImmutableDataType(this.unit, newType, this.place, this.time) }

    toString() { return `Unit: ${this.getUnit()}, Type: ${this.getType()}, Place: ${this.getPlace()}, Time: ${this.getTime()}` }
}
console.log("DataType Test")
var myData = new ImmutableDataType('testsUnit1', 'testType1', 'testPlace1', null);
console.log(myData.toString());
console.log()


// Weather Prediction
class WeatherPrediction extends ImmutableDataType
{ 
    constructor(_unit, _type, _place, _time, _fromNum, _toNum)
    {
        super(_unit, _type, _place, _time);
        this.fromNum = _fromNum;
        this.toNum = _toNum;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === WeatherPrediction) {
            Object.freeze(this)
        }
    }

    getFrom() { return this.fromNum };
    setPlace(_fromNum) { return new WeatherPrediction(this.unit, this.type, 
        this.place, this.time, _fromNum, this.toNum) };

    getTo() { return this.toNum };
    setPlace(_toNum) { return new WeatherPrediction(this.unit, this.type, 
        this.place, this.time, this.fromNum, _toNum) };

    matches(weatherData)
    {
        if(weatherData.unit == this.unit && weatherData.type == this.type 
            && weatherData.place == this.place && weatherData.time == this.time)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    toString() { return `Unit: ${this.unit}, Type: ${this.type}, Place: ${this.place}, 
    Time: ${this.getTime()}, From: ${this.fromNum}, To: ${this.toNum}` }
}
console.log("Weather Prediction Test")
var testW = new WeatherPrediction("MPH", "NE", "Aarhus", null, 6, 12) 
console.log(testW.toString())
//console.log(testW.matches(new WeatherData))
console.log(testW.getFrom())
console.log()


// Weather Types
class TemperaturePrediction extends WeatherPrediction
{
    constructor(_unit, _type, _place, _time, _fromNum, _toNum)
    {
        super(_unit, _type, _place, _time, _fromNum, _toNum)

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === TemperaturePrediction) {
            Object.freeze(this)
        }
    }

    convertToF()
    {
        fromTemp = (this.from * 1.8) + 32
        toTemp = (this.to * 1.8) + 32
        return fromTemp, toTemp;
    }

    convertToC()
    {
        fromTemp = (this.from - 32) / 1.8
        toTemp = (this.to - 32) / 1.8
        return fromTemp, toTemp;
    }

    toString() { return `Unit: ${this.unit}, Type: ${this.type}, Place: ${this.place}, 
    Time: ${this.getTime()}, From: ${this.fromNum}, To: ${this.toNum}` }
}
console.log("Temperature Class Test")
var temp1 = new TemperaturePrediction("CELSIUS", "Temperature", "Copenhagen", null, 7, 15)
console.log(temp1.toString())
console.log()

class PrecipitationPrediction extends WeatherPrediction
{
    constructor(_unit, _type, _place, _time, _fromNum, _toNum, _precipTypes = [])
    {
        super(_unit, _type, _place, _time, _fromNum, _toNum);
        this.precipTypes = _precipTypes;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === PrecipitationPrediction) {
            Object.freeze(this)
        }
    }
    
    getTypes() { return this.precipTypes }

    matches(weatherData)
    {
        //used to check that the weather data precip is the same type of precip 
        //as in weather prediction
    }

    convertToInches()
    {
        fromPrecip = this.fromNum / 25.4
        toPrecip = this.to / 25.4
        return fromPrecip, toPrecip;
    }

    convertToMM()
    {
        fromPrecip = this.from * 25.4
        toPrecip = this.to * 25.4
        return fromPrecip, toPrecip;
    }

    toString() { return `Unit: ${this.unit}, Type: ${this.type}, Place: ${this.place}, 
    Time: ${this.getTime()}, From: ${this.fromNum}, To: ${this.toNum}, 
    PrecipTypes: ${this.precipTypes}` }
}
console.log("Precipitation Class Test")
var precip1 = new PrecipitationPrediction("MM", "Precipitation", "Aarhus", null, 6, 12, ["RAIN"])
var precip2 = new PrecipitationPrediction("INCH", "Precipitation", "Aarhus", null, 3, 4, ["RAIN", "SNOW"])
console.log(precip1.toString())
console.log(precip2.toString())
console.log()

class WindPrediction extends WeatherPrediction
{
    constructor(_unit, _type, _place, _time, _fromNum, _toNum, _windTypes = [])
    {
        super(_unit, _type, _place, _time, _fromNum, _toNum)
        this.windTypes = _windTypes;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === WindPrediction) {
            Object.freeze(this)
        }
    }

    getTypes() { return this.windTypes }

    matches(weatherData)
    {
        //used to check that the weather data wind is the same direction of wind 
        //as in weather prediction
    }

    convertToMPH()
    {
        fromWind = this.from * 2,237
        toWind = this.to * 2,237
        return fromWind, toWind;
    }
    convertToMS()
    {
        fromWind = this.from / 2,237
        toWind = this.to / 2,237
        return fromWind, toWind;
    }

    toString() { return `Unit: ${this.unit}, Type: ${this.type}, Place: ${this.place}, 
    Time: ${this.getTime()}, From: ${this.fromNum}, To: ${this.toNum}, 
    PrecipTypes: ${this.windTypes}` }
}
console.log("Wind Class Test")
var wind1 = new WindPrediction("MS", "Wind", "Horsens", null, 3, 8, ["NE"])
var wind2 = new WindPrediction("MPH", "Wind", "Horsens", null, 7, 11, ["E", "NE"])
console.log(wind1.toString())
console.log(wind2.toString())
console.log()

class CloudPrediction extends WeatherPrediction
{
    constructor(_unit, _type, _place, _time, _fromNum, _toNum, _cloudTypes = [])
    {
        super(_unit, _type, _place, _time, _fromNum, _toNum)
        this.cloudTypes = _cloudTypes;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === CloudPrediction) {
            Object.freeze(this)
        }
    }

    getTypes() { return this.cloudTypes }

    matches(weatherData)
    {
        //used to check that the weather data cloud is the same type of cloud
        //as in weather prediction
    }

    toString() { return `Unit: ${this.unit}, Type: ${this.type}, Place: ${this.place}, 
    Time: ${this.getTime()}, From: ${this.fromNum}, To: ${this.toNum}, 
    PrecipTypes: ${this.cloudTypes}` }
}
console.log("Cloud Class Test")
var cloud1 = new CloudPrediction("Percent", "Cloud", "Horsens", null, 70, 50, ["CLOUDY", "PARTLY CLOUDY"])
console.log(cloud1.toString())
console.log()


// Weather Forecast
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
                        obj.convertToInches
                        break;
                    case "MS":
                        obj.convertToMPH
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