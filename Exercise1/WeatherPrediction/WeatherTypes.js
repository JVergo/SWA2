//import "MidClasses.js";
const WeatherPrediction = require("./EventDataType.js");

// just a thought, all the converts might be able to work with a map function

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

    matches()
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

    matches()
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

    matches()
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