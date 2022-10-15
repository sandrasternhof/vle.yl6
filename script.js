(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            let AmOrPm = h >= 12 ? 'pm' : 'am';

            h = (h % 12) || 12;

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + AmOrPm;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", onSubmitClicked);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";


    function onSubmitClicked(event) {
        event.preventDefault();

        const eesnimi = document.getElementById("fname").value;
        const perenimi = document.getElementById("lname").value;

        if (eesnimi.length === 0) {
            alert("Palun sisestage eesnimi");
            eesnimi.focus();
            return;
        }

        if (perenimi.length === 0) {
            alert("Palun sisestage perenimi");
            perenimi.focus();
            return;
        }

        if (containsNumbers(eesnimi) || containsNumbers(perenimi)) {
            alert("Nimi ei tohi sisaldada numbreid");
            return;
        }

        estimateDelivery();
    }

    function containsNumbers(str) {
        return /\d/.test(str);
    }

    function estimateDelivery() {

        let linn = document.getElementById("linn");

        let hind = 0;

        switch (linn.value) {
            case "tln":
                break;
            case "trt":
                hind += 2.5;
                break;
            case "nrv":
                hind += 2.5;
                break;
            case "prn":
                hind += 3;
                break;
            default:
                alert("Palun valige linn nimekirjast")
                linn.focus();
                return;
        }

        if (document.querySelector('#v1').checked) {
            hind += 5;
        }

        if (document.querySelector('#v2').checked) {
            hind += 1;
        }

        e.innerHTML = `${hind} eurot`

        console.log("Tarne hind on arvutatud");
    }

})();



// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {

    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.88680274155801,
        25.556961662157697
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let utPoint = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let utPushpin = new Microsoft.Maps.Pushpin(utPoint, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });

    let taltechPoint = new Microsoft.Maps.Location(
        59.395040230485534,
        24.67175161377225
    );

    let taltechPushpin = new Microsoft.Maps.Pushpin(taltechPoint, {
        title: 'Taltech',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });

    map.entities.push(utPushpin);
    map.entities.push(taltechPushpin);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

