const ImmutableWeatherData = require("./WeatherHistory.js");  //will this work for what I need? objects?

////////////////////// HELPER METHODS START ////////////////////////
class MyDateInterval {
    constructor(_fromDate, _toDate) {
        this.fromDate = new Date(_fromDate);
        this.toDate = new Date(_toDate);

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableDataType) {
            Object.freeze(this)
        }
    }

    getFrom() { return this.fromDate }
    setPlace(newFromDate) { return new MyDateInterval(newFromDate, this.toDate) }

    getTo() { return this.to }
    setPlace(newToDate) { return new MyDateInterval(this.fromDate, newToDate) }

    contains(cDate) {
        const cDate2 = new Date(cDate);
        return (cDate2 >= this.fromDate && cDate2 <= this.toDate);
    }
}

const reduce = function (iterable, reduceFn, accumulator) {
    for (let i of iterable) {
        accumulator = reduceFn(accumulator, i)
    }
    return accumulator
}

const myMap = (a, f) => reduce(a, (arr, v) => [...arr, f(v)], [])
const myFilter = (a, p) => reduce(a, (arr, v) => p(v) ? [...arr, p(v)] : arr, [])
/////////////////////// HELPER METHODS END ////////////////////////

class ImmutableTemperature extends ImmutableWeatherData {
    constructor(_value, _unit, _type, _place, _time) {
        super(_value, _unit, _type, _place, _time);

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableTemperature) {
            Object.freeze(this)
        }
    }

    // (0°C × 9/5) + 32 = 32°F
    convertToF() {
        if (this.unit == 'celsius') {
            return new ImmutableTemperature(
                (this.value * (9 / 5) + 32),
                'fahrenheit',
                this.type,
                this.place,
                this.time
            );
        } else if (this.unit == 'fahrenheit') {
            return new ImmutableTemperature(
                this.value,
                this.unit,
                this.type,
                this.place,
                this.time
            );
        }
    }

    // (32°F − 32) × 5/9 = 0°C
    convertToC() {
        if (this.unit == 'fahrenheit') {
            return new ImmutableTemperature(
                (this.value - 32) * (5 / 9),
                'celsius',
                this.type,
                this.place,
                this.time
            );
        } else if (this.unit == 'celsius') {
            return new ImmutableTemperature(
                this.value,
                this.unit,
                this.type,
                this.place,
                this.time
            );
        }
    }
}
var myTemperature = new ImmutableTemperature(1, 'fahrenheit', null, 'Horsens', null);
console.log()
console.log('!!! TEST IMMUTABLE TEMPERATURE');
console.log('!!! Value Must Change');
console.log(myTemperature.toString());
var secondData = myTemperature.setValue(2222222);
console.log(secondData.toString());
console.log('!!! Value Must Remain The Same');
console.log(myTemperature.toString());
myTemperature.value = "MANUALLY FORCED VALUE";
console.log(myTemperature.toString());

class ImmutablePrecipitation extends ImmutableWeatherData {
    constructor(_value, _unit, _type, _place, _time) {
        super(_value, _unit, _type, _place, _time);

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutablePrecipitation) {
            Object.freeze(this)
        }
    }

    convertToInches() {
        if (this.unit == 'MM') {
            return new ImmutablePrecipitation(
                (this.value * 0.0393701),
                'IN',
                this.type,
                this.place,
                this.time
            );
        } else if (this.unit == 'IN') {
            return new ImmutablePrecipitation(
                this.value,
                this.unit,
                this.type,
                this.place,
                this.time
            );
        }
    }

    convertToMM() {
        if (this.unit == 'IN') {
            return new ImmutablePrecipitation(
                (this.value / 0.0393701),
                'MM',
                this.type,
                this.place,
                this.time
            );
        } else if (this.unit == 'MM') {
            return new ImmutablePrecipitation(
                this.value,
                this.unit,
                this.type,
                this.place,
                this.time
            );
        }
    }
}
var myPrecipitation = new ImmutablePrecipitation(1, 'IN', 'RAIN', 'Horsens', null);
console.log()
console.log('!!! TEST IMMUTABLE PRECIPITATION');
console.log('!!! Value Must Change');
console.log(myPrecipitation.toString());
secondData = myPrecipitation.setValue(22222);
console.log(secondData.toString());
console.log('!!! Value Must Remain The Same');
console.log(myPrecipitation.toString());
myPrecipitation.value = "MANUALLY FORCED TYPE";
console.log(myPrecipitation.toString());

class ImmutableWind extends ImmutableWeatherData {
    constructor(_value, _unit, _type, _place, _time) {
        super(_value, _unit, _type, _place, _time);

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableWind) {
            Object.freeze(this)
        }
    }

    convertToMPH() {
        if (this.unit == 'MS') {
            return new ImmutableWind(
                (this.value * 0.44704),
                'MPH',
                this.type,
                this.place,
                this.time
            );
        } else if (this.unit == 'MPH') {
            return new ImmutableWind(
                this.value,
                this.unit,
                this.type,
                this.place,
                this.time
            );
        }
    }

    convertToMS() {
        if (this.unit == 'MPH') {
            return new ImmutableWind(
                (this.value / 2.23694),
                'MS',
                this.type,
                this.place,
                this.time
            );
        } else if (this.unit == 'MS') {
            return new ImmutableWind(
                this.value,
                this.unit,
                this.type,
                this.place,
                this.time
            );
        }
    }
}
var myWind = new ImmutableWind(1, 'MPH', 'NW', 'Horsens', null);
console.log()
console.log('!!! TEST IMMUTABLE WIND');
console.log('!!! Value Must Change');
console.log(myWind.toString());
secondData = myWind.setValue(22222);
console.log(secondData.toString());
console.log('!!! Value Must Remain The Same');
console.log(myWind.toString());
myWind.value = "MANUALLY FORCED VALUE";
console.log(myWind.toString());

class ImmutableCloudCoverage extends ImmutableWeatherData {
    constructor(_value, _unit, _type, _place, _time) {
        super(_value, _unit, _type, _place, _time);

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableCloudCoverage) {
            Object.freeze(this)
        }
    }

    getCoverageType() { return this.type }
}
var myCloudCoverage = new ImmutableCloudCoverage(1, '%', 'CLEAR', 'Horsens', null);
console.log()
console.log('!!! TEST IMMUTABLE CLOUDCOVERAGE');
console.log('!!! Value Must Change');
console.log(myCloudCoverage.toString());
secondData = myCloudCoverage.setValue(2222);
console.log(secondData.toString());
console.log('!!! Value Must Remain The Same');
console.log(myCloudCoverage.toString());
myCloudCoverage.value = "MANUALLY FORCED VALUE";
console.log(myCloudCoverage.toString());

class ImmutableWeatherHistory {
    constructor(..._immutableWeatherDataArr) {
        this.immutableWeatherDataArr = _immutableWeatherDataArr;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableWeatherHistory) {
            Object.freeze(this)
        }
    }

    forPlace(place) {
        let tempArr = null;
        this.immutableWeatherDataArr.forEach(element => {
            if (element.getPlace() == place)
                tempArr += element;
        });

        return tempArr;
    }

    forUnit(unit) {
        let tempArr = null;
        this.immutableWeatherDataArr.forEach(element => {
            if (element.getUnit() == unit)
                tempArr += element;
        });

        return tempArr;
    }

    forPeriod(myDateInterval) {
        let tempArr = null;
        this.immutableWeatherDataArr.forEach(element => {
            if (element.getTime() >= myDateInterval.getFrom()
                && element.getTime() <= myDateInterval.getTo())
                tempArr += element;
        });

        return tempArr;
    }

    including(weatherDataArr) {
        let tempArr = null;

        this.immutableWeatherDataArr.forEach(element => {
            // adding all elements similar to the current element
            // to tempArr
            myFilter(weatherDataArr, (w) => (
                w.unit == element.unit &&
                w.type == element.type &&
                w.place == element.place &&
                w.time == element.time)
                ? w : null  // if element found, add to filtered or return null
            ).forEach(filteredElement => {
                tempArr.push(filteredElement)
            })

        })

        return tempArr;
    }

    convertToUSUnits() {
        return new ImmutableWeatherHistory(
            myMap(...this.immutableWeatherDataArr, (w) => {
                if (w.unit == 'MS' || w.unit == 'MPH')
                    return w.convertToMPH();
                // else if (w.type == '%')
                //     w
                else if (w.unit == 'MM' || w.unit == 'IN')
                    return w.convertToInches();
                else if (w.unit == 'celsius' || w.unit == 'fahrenheit')
                    return w.convertToF();
                else return w
            })
        );
    }

    convertToInternationalUnits() {
        return new ImmutableWeatherHistory(
            myMap(...this.immutableWeatherDataArr, (w) => {
                if (w.unit == 'MS' || w.unit == 'MPH')
                    return w.convertToMS();
                // else if (w.type == '%')
                //     w
                else if (w.unit == 'MM' || w.unit == 'IN')
                    return w.convertToMM();
                else if (w.unit == 'celsius' || w.unit == 'fahrenheit')
                    return w.convertToC();
                else return w
            })
        );
    }

    lowestWindValue() {
        let min;

        myFilter(...this.immutableWeatherDataArr, (w) => (
            w.unit == "MS" || w.unit == "MPH")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof min == 'undefined' || filteredElement.value <= min)
                min = filteredElement.value;
        })

        return min;
    }

    lowestPrecipitationValue() {
        let min;

        myFilter(...this.immutableWeatherDataArr, (w) => (
            w.unit == "MM" || w.unit == "IN")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof min == 'undefined' || filteredElement.value <= min)
                min = filteredElement.value;
        })

        return min;
    }

    lowestTemperatureValue() {
        let min;

        myFilter(...this.immutableWeatherDataArr, (w) => (
            w.unit == "fahrenheit" || w.unit == "celsius")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof min == 'undefined' || filteredElement.value <= min)
                min = filteredElement.value;
        })

        return min;
    }

    lowestCloudCoverageValue() {
        let min;

        myFilter(...this.immutableWeatherDataArr, (w) => (
            w.unit == "\%")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof min == 'undefined' || filteredElement.value <= min)
                min = filteredElement.value;
        })

        return min;
    }

    latestWindData() {
        let windData;

        myFilter(...this.immutableWeatherDataArr, (w) => (
            w.unit == "MS" || w.unit == "MPH")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof windData == 'undefined' || filteredElement.getTime() < windData.getTime())
                windData = filteredElement;
        })

        return windData;
    }

    latestPrecipitationData() {
        let precipitationData;

        myFilter(...this.immutableWeatherDataArr, (w) => (
            w.unit == "MM" || w.unit == "IN")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof precipitationData == 'undefined' || filteredElement.getTime() < precipitationData.getTime())
                precipitationData = filteredElement;
        })

        return precipitationData;
    }

    latestTemperatureData() {
        let temperatureData;

        myFilter(...this.immutableWeatherDataArr, (w) => (
            w.unit == "fahrenheit" || w.unit == "celsius")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof temperatureData == 'undefined' || filteredElement.getTime() < temperatureData.getTime())
                temperatureData = filteredElement;
        })

        return temperatureData;
    }

    latestCloudCoverageData() {
        let cloudCoverageData;

        // GENERATING FILTERED ARRAY
        myFilter(...this.immutableWeatherDataArr, (w) => (
            w.unit == "\%")
            ? w : null
        )
            // CALLING FOR EACH ON THE FILTERED ARRAY
            .forEach(filteredElement => {
                if (typeof cloudCoverageData == 'undefined' || filteredElement.getTime() < cloudCoverageData.getTime())
                    cloudCoverageData = filteredElement;
            })

        return cloudCoverageData;
    }
}
var myCloudCoverage1 = new ImmutableCloudCoverage(2, '%', 'CLEAR', 'Horsens', null);
var myWind1 = new ImmutableWind(2, 'MPH', 'NW', 'Horsens', null);
var myPrecipitation1 = new ImmutablePrecipitation(2, 'IN', 'RAIN', 'Horsens', null);
var myTemperature1 = new ImmutableTemperature(2, 'fahrenheit', null, 'Horsens', null);
var weatherDatabase = [myCloudCoverage, myWind, myPrecipitation, myTemperature, myCloudCoverage1, myWind1, myPrecipitation1, myTemperature1]
var myWeatherHistory = new ImmutableWeatherHistory(weatherDatabase);
console.log()
console.log('TEST IMMUTABLE WEATHER HISTORY');
console.log('Data USA units');
console.log(myWeatherHistory.latestTemperatureData());
console.log('Lowest precipitation value is: ' + myWeatherHistory.lowestPrecipitationValue());
secondData = myWeatherHistory.convertToInternationalUnits();
console.log('Data INTERNATIONAL units');
console.log(secondData.latestTemperatureData());
console.log('Lowest precipitation value is: ' + secondData.lowestPrecipitationValue());






//////// WIND
// Type: N/NW/NE/S/SW/SE
// Unit: MS MPH
// Value:
//////// Could Coverage
// Type: CLEAR / PARTLY CLOUD / CLOUDY
// Unit: %
// Value:
//      0%  - 33 % = CLEAR
//      34% - 66 % = PARTLY CLOUDY
//      67% - 100% = CLOUDY
//////// PRECIPITATION
// Type: RAIN SLEET HAIL SNOW
// Unit: MM IN
// Value: 
//////// TEMPERATURE
// Type: NOT APPLICABLE
// Unit: fahrenheit celsius
// Value:
