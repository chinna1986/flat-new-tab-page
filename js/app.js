/**
 * flat-new-tab-page
 * @author Florian Weber <florian.weber.dd@icloud.com>
 */

var username = null;

function getGreetingTime(m) {
    var g = null; //return g

    if (!m || !m.isValid()) {
        return;
    } //if we can't find a valid or filled moment, we return.

    var split_afternoon = 12 //24hr time to split the afternoon
    var split_evening = 17 //24hr time to split the evening
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
        g = "afternoon";
    } else if (currentHour >= split_evening) {
        g = "evening";
    } else {
        g = "morning";
    }

    return g;
}

function refresh() {
    if (username == null) {
        $('#greeting').html('Good ' + getGreetingTime(moment()) + '!');
    } else {
        $('#greeting').html('Good ' + getGreetingTime(moment()) + ', ' + username + '!');
        $('#input-username').val(username);
    }
}

$(document).ready(function () {

    var timeFormat = 'hh:mm';
    $('#time').html(moment().format(timeFormat));

    setInterval(function () {
        $('#time').html(moment().format(timeFormat));
    }, 1000);

    if (localStorage["username"] != undefined) {
        username = localStorage["username"];
    }

    /* if (username == null) {
     $('#greeting').html('Good ' + getGreetingTime(moment()) + '!');
     } else {
     $('#greeting').html('Good ' + getGreetingTime(moment()) + ', ' + username + '!');
     }*/

    refresh();

    $('#settings-form').submit(function (e) {
        var uname = $('#input-username').val();

        if (uname == "") {
            e.preventDefault();
        } else {
            localStorage['username'] = uname;
        }

        refresh();
    });

});