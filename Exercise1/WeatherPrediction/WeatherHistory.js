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
// Unit: FAHRENHEIT CELSIUS
// Value:

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
var myEvent = new ImmutableEvent('Horsens', null);
console.log('TEST IMMUTABLE EVENT');
console.log('Data Must Change');
console.log(myEvent.toString());
var secondEvent = myEvent.setPlace('USA');
console.log(secondEvent.toString());
console.log('Data Must Remain The Same');
console.log(myEvent.toString());
myEvent.time = new Date(11111).toLocaleString();
console.log(myEvent.toString());

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
    toString() { return `Unit: ${this.getUnit()}, Type - ${this.getType()}, Place: ${this.getPlace()}, Time - ${this.getTime()}` }
}
var myDataType = new ImmutableDataType('testUnit', 'testType', 'testPlace', null);
console.log()
console.log('TEST IMMUTABLE DATA TYPE');
console.log('Data Must Change');
console.log(myDataType.toString());
var secondData = myDataType.setUnit('UNIT_CHANGED');
var thirdData = secondData.setType('TYPE_CHANGED');
console.log(thirdData.toString());
console.log('Data Must Remain The Same');
console.log(myDataType.toString());
myDataType.type = "MANUALLY FORCED TYPE";
console.log(myDataType.toString());

class ImmutableWeatherData extends ImmutableDataType {
    constructor(_value, _unit, _type, _place, _time) {
        super(_unit, _type, _place, _time);

        this.value = _value;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableWeatherData) {
            Object.freeze(this)
        }
    }

    getValue() { return this.value }
    setValue(newValue) { return new ImmutableWeatherData(newValue, this.unit, this.type, this.place, this.time) }
    toString() { return `Value: ${this.getValue()}, Unit: ${this.getUnit()}, Type - ${this.getType()}, Place: ${this.getPlace()}, Time - ${this.getTime()}` }
}
var myWeatherData = new ImmutableWeatherData(1, 'testUnit', 'testType', 'testPlace', null);
console.log()
console.log('TEST IMMUTABLE WEATHER DATA');
console.log('Data Must Change');
console.log(myWeatherData.toString());
var secondData = myWeatherData.setUnit('UNIT_CHANGED');
var thirdData = secondData.setType('TYPE_CHANGED');
console.log(thirdData.toString());
console.log('Data Must Remain The Same');
console.log(myWeatherData.toString());
myWeatherData.type = "MANUALLY FORCED TYPE";
console.log(myWeatherData.toString());

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
    };

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
    };
}
var myTemperature = new ImmutableTemperature(1, 'testUnit', 'testType', 'testPlace', null);
console.log()
console.log('TEST IMMUTABLE TEMPERATURE');
console.log('Data Must Change');
console.log(myTemperature.toString());
var secondData = myTemperature.setUnit('UNIT_CHANGED');
var thirdData = secondData.setType('TYPE_CHANGED');
console.log(thirdData.toString());
console.log('Data Must Remain The Same');
console.log(myTemperature.toString());
myTemperature.type = "MANUALLY FORCED TYPE";
console.log(myTemperature.toString());

class ImmutablePrecipitation extends ImmutableDataType {
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
                (this.value / 25.4),
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
    };

    convertToMM() {
        if (this.unit == 'IN') {
            return new ImmutablePrecipitation(
                (this.value * 0.0393701),
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
    };
}
var myPrecipitation = new ImmutablePrecipitation(1, 'testUnit', 'testType', 'testPlace', null);
console.log()
console.log('TEST IMMUTABLE PRECIPITATION');
console.log('Data Must Change');
console.log(myPrecipitation.toString());
var secondData = myPrecipitation.setUnit('UNIT_CHANGED');
var thirdData = secondData.setType('TYPE_CHANGED');
console.log(thirdData.toString());
console.log('Data Must Remain The Same');
console.log(myPrecipitation.toString());
myPrecipitation.type = "MANUALLY FORCED TYPE";
console.log(myPrecipitation.toString());

class ImmutableWind extends ImmutableDataType {
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
    };

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
    };
}
var myWind = new ImmutableWind(1, 'testUnit', 'testType', 'testPlace', null);
console.log()
console.log('TEST IMMUTABLE WIND');
console.log('Data Must Change');
console.log(myWind.toString());
var secondData = myWind.setUnit('UNIT_CHANGED');
var thirdData = secondData.setType('TYPE_CHANGED');
console.log(thirdData.toString());
console.log('Data Must Remain The Same');
console.log(myWind.toString());
myWind.type = "MANUALLY FORCED TYPE";
console.log(myWind.toString());

class ImmutableCloudCoverage extends ImmutableDataType {
    constructor(_value, _unit, _type, _place, _time) {
        super(_value, _unit, _type, _place, _time);

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableCloudCoverage) {
            Object.freeze(this)
        }
    }

    getCoverageType() { return this.type }
}
var myCloudCoverage = new ImmutableCloudCoverage(1, 'testUnit', 'testType', 'testPlace', null);
console.log()
console.log('TEST IMMUTABLE CLOUDCOVERAGE');
console.log('Data Must Change');
console.log(myCloudCoverage.toString());
var secondData = myCloudCoverage.setUnit('UNIT_CHANGED');
var thirdData = secondData.setType('TYPE_CHANGED');
console.log(thirdData.toString());
console.log('Data Must Remain The Same');
console.log(myCloudCoverage.toString());
myCloudCoverage.type = "MANUALLY FORCED TYPE";
console.log(myCloudCoverage.toString());

class ImmutableWeatherHistory extends ImmutableDataType {
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
            myMap(this.immutableWeatherDataArr, (w) => {
                if (w.type == 'MS' || w.type == 'MPH')
                    w.convertToMPH();
                else if (w.type == '%')
                    w
                else if (w.type == 'MM' || w.type == 'IN')
                    w.convertToInches();
                else if (w.type == 'CELSIUS' || w.type == 'FAHRENHEIT')
                    w.convertToF();
            })
        );
    }

    convertToInternationalUnits() {
        return new ImmutableWeatherHistory(
            myMap(this.immutableWeatherDataArr, (w) => {
                if (w.type == 'MS' || w.type == 'MPH')
                    w.convertToMS();
                else if (w.type == '%')
                    w
                else if (w.type == 'MM' || w.type == 'IN')
                    w.convertToMM();
                else if (w.type == 'CELSIUS' || w.type == 'FAHRENHEIT')
                    w.convertToC();
            })
        );
    }

    lowestWindValue() {
        let min;

        myFilter(this.immutableWeatherDataArr, (w) => (
            w.unit == "MS" || w.unit == "MPH")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof min == 'undefined')
                min = filteredElement.value;
            else if (filteredElement.value <= min)
                min = filteredElement.value;
        })

        return min;
    }

    lowestPrecipitationValue() {
        let min;

        myFilter(this.immutableWeatherDataArr, (w) => (
            w.unit == "MM" || w.unit == "IN")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof min == 'undefined')
                min = filteredElement.value;
            else if (filteredElement.value <= min)
                min = filteredElement.value;
        })

        return min;
    }

    lowestTemperatureValue() {
        let min;

        myFilter(this.immutableWeatherDataArr, (w) => (
            w.unit == "FAHRENHEIT" || w.unit == "CELSIUS")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof min == 'undefined')
                min = filteredElement.value;
            else if (filteredElement.value <= min)
                min = filteredElement.value;
        })

        return min;
    }

    lowestCloudCoverageValue() {
        let min;

        myFilter(this.immutableWeatherDataArr, (w) => (
            w.unit == "\%")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof min == 'undefined')
                min = filteredElement.value;
            else if (filteredElement.value <= min)
                min = filteredElement.value;
        })

        return min;
    }

    latestWindData() {
        let windData;

        myFilter(this.immutableWeatherDataArr, (w) => (
            w.unit == "MS" || w.unit == "MPH")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof windData == 'undefined')
                windData = filteredElement;
            else if (filteredElement.getTime() < windData.getTime())
                windData = filteredElement;
        })

        return windData;
    }

    latestPrecipitationData() {
        let precipitationData;

        myFilter(this.immutableWeatherDataArr, (w) => (
            w.unit == "MM" || w.unit == "IN")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof precipitationData == 'undefined')
                precipitationData = filteredElement;
            else if (filteredElement.getTime() < precipitationData.getTime())
                precipitationData = filteredElement;
        })

        return precipitationData;
    }

    latestTemperatureData() {
        let temperatureData;

        myFilter(this.immutableWeatherDataArr, (w) => (
            w.unit == "FAHRENHEIT" || w.unit == "CELSIUS")
            ? w : null
        ).forEach(filteredElement => {
            if (typeof temperatureData == 'undefined')
                temperatureData = filteredElement;
            else if (filteredElement.getTime() < temperatureData.getTime())
                temperatureData = filteredElement;
        })

        return temperatureData;
    }

    latestCloudCoverageData() {
        let cloudCoverageData;

        // GENERATING FILTERED ARRAY
        myFilter(this.immutableWeatherDataArr, (w) => (
            w.unit == "\%")
            ? w : null
        )
        // CALLING FOR EACH ON THE FILTERED ARRAY
        .forEach(filteredElement => {
            if (typeof cloudCoverageData == 'undefined')
                cloudCoverageData = filteredElement;
            else if (filteredElement.getTime() < cloudCoverageData.getTime())
                cloudCoverageData = filteredElement;
        })

        return cloudCoverageData;
    }
}

var myCloudCoverage1 = new ImmutableCloudCoverage(2, 'testUnit', 'testType', 'testPlace', null);
var myWind1 = new ImmutableWind(2, 'testUnit', 'testType', 'testPlace', null);
var myPrecipitation1 = new ImmutablePrecipitation(2, 'testUnit', 'testType', 'testPlace', null);
var myTemperature1 = new ImmutableTemperature(2, 'testUnit', 'testType', 'testPlace', null);
var weatherDatabase = [myCloudCoverage, myWind, myPrecipitation, myTemperature, myCloudCoverage1, myWind1, myPrecipitation1, myTemperature1]
var myWeatherHistory = new ImmutableWeatherHistory();
console.log()
console.log('TEST IMMUTABLE CLOUDCOVERAGE');
console.log('Data Must Change');
console.log(myCloudCoverage.toString());
var secondData = myWeatherHistory.convertToInternationalUnits();
// TO DO CONTINUE
console.log(thirdData.toString());
console.log('Data Must Remain The Same');
console.log(myCloudCoverage.toString());
myCloudCoverage.type = "MANUALLY FORCED TYPE";
console.log(myCloudCoverage.toString());

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

    getFrom() { return this.fromDate };
    setPlace(newFromDate) { return new MyDateInterval(newFromDate, this.toDate) };

    getTo() { return this.to };
    setPlace(newToDate) { return new MyDateInterval(this.fromDate, newToDate) };

    contains(cDate) {
        const cDate2 = new Date(cDate);
        if (cDate2 >= this.fromDate && cDate2 <= this.toDate) {
            return true;
        }
        else {
            return false;
        }

    };
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