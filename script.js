class Flight {
    constructor(tailNr, fltNr, date, std, aod, aoa, sta, purpose = 'F') {
        this.tailNr = tailNr;
        this.fltNr = fltNr;
        this.date = parseDate(date);
        this.std = std;
        this.aod = aod;
        this.aoa = aoa;
        this.sta = sta;
        this.week = calculateWeek(this.date)
        this.purpose = purpose;
        this.seats = calculateSeats(this.tailNr);
        this.type = calculateType(this.tail.Nr);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setDatesPlaceholders();

    var dispoPasted = document.getElementById('DispoPaste');
    dispoPasted.addEventListener('change', function () {
        var rawData = dispoPasted.value;
        parseDispo(rawData);
    });

    var newBtn = document.getElementById('NewSlotMsg');
    newBtn.addEventListener('click', createNewSlotMessage)
    var delBtn = document.getElementById('DelSlotMsg');
    delBtn.addEventListener('click', createDelSlotMessage);
}, false);

function createNewSlotMessage() {
    var tailNr = document.getElementById("AcSel").value;

    var flights = [];

    for (var index = 0; index < 4; index++) {

        var input = document.getElementById(index);

        if (!input.children[1]) {
            break;
        }

        let currentFlight = new Flight(tailNr, input.children[1], input.children[2], input.children[3], input.children[4], input.children[5], input.children[6]);
    }

}

function createDelSlotMessage() {
    //TODO

}

function parseDispo(rawData) {
    let rows = rawData.split('\n')
    rows = cleanArray(rows);

    for (i = 0; i < rows.length; i += 1) {
        let row = rows[i];
        row = row.replace('/', ' ');

        let flt = row.split(' ')
        flt = cleanArray(flt)

        let fltNr = flt[0];
        let date = flt[1];
        date = addMonthToDate(date);

        let std = flt[2];
        let aod = flt[3];
        let aoa = flt[4];
        let sta = flt[5];

        if (sta.length > 4) {
            sta = sta.substring(0, 4);
        }

        let col = document.getElementById(i);
        col.getElementsByClassName('FltNr')[0].value = fltNr;
        col.getElementsByClassName('Date')[0].value = date;
        col.getElementsByClassName('Std')[0].value = std;
        col.getElementsByClassName('Aod')[0].value = aod;
        col.getElementsByClassName('Aoa')[0].value = aoa;
        col.getElementsByClassName('Sta')[0].value = sta;
    }
}


function parseDate(dateAsString) {
    var day = dateAsString.substring(0, 2);
    var month = dateAsString.substring(2, 5);
    var year = dateAsString.substring(5, 7)
    var date = new Date(year, month, date);

    return date;
}

function cleanArray(arr) {
    var temp = [];

    for (let i of arr)
        i && temp.push(i);

    arr = temp;
    delete temp;

    return arr;
}

function setDatesPlaceholders() {

    //TODO get monthNames as global const
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    var today = new Date();
    var day = today.getDate().toString().slice(-2);
    var month = monthNames[today.getMonth()].toUpperCase();
    var year = today.getFullYear().toString().slice(-2);

    var placeholder = day + month + year;


    var elements = document.getElementsByClassName("Date");

    for (let element of elements) {
        element.placeholder = placeholder;
    }
}

function addMonthToDate(date) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let today = new Date();

    let month = today.getMonth();
    let year = today.getFullYear().toString().slice(-2);

    if (date < today.getDate()) {
        if (month == 11) {
            month = 0;
            year += 1;
        } else {
            month += 1;
        }
    }

    month = monthNames[month].toUpperCase();

    let fullDate = date + month + year;
    return fullDate;
}

function calculateSeats(tailNr) {
    var numberOfSeats;

    for (var index = 0; index < data.aircraft.length; index++) {
        if (data.aircraft[index] == tailNr) {
            numberOfSeats = data.aircraft[index].seats;
            return numberOfSeats
        }
    }
}

function calculateType(tailNr) {
    var acType;

    for (var index = 0; index < data.aircraft.length; index++) {
        if (data.aircraft[index] == tailNr) {
            acType = data.aircraft[index].type;
            return numberOfSeats
        }
    }
}