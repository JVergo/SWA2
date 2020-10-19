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

module.exports = ImmutableWeatherData;