//settings BEGIN
var MQTTbroker = 'mqtt.mymaker.io';

// Local UDOO servers
//	var MQTTbroker = '192.168.0.36';

//	var MQTTport = 8000;
// Local websockets ports
var MQTTport = 9001;

var MQTTsubTopic = 'Random/randomNumber/#';
//settings END

var chart; // global variuable for chart
var dataTopics = new Array();

//mqtt broker 
var client = new Paho.MQTT.Client(MQTTbroker, MQTTport,
    "myclientid_" + parseInt(Math.random() * 100, 10));
client.onMessageArrived = onMessageArrived;
client.onConnectionLost = onConnectionLost;
//connect to broker is at the bottom of the init() function !!!!

//mqtt connecton options including the mqtt broker subscriptions
var options = {
    useSSL: true,
    timeout: 3,
    onSuccess: function () {
        console.log("mqtt connected");
        // Connection succeeded; subscribe to our topics
        client.subscribe(MQTTsubTopic, {
            qos: 1
        });
    },
    onFailure: function (message) {
        console.log("Connection failed, ERROR: " + message.errorMessage);
        //window.setTimeout(location.reload(),20000); //wait 20seconds before trying to connect again.
    }
};

//can be used to reconnect on connection lost
function onConnectionLost(responseObject) {
    console.log("connection lost: " + responseObject.errorMessage);
    window.setTimeout(location.reload(), 30000); //wait 20seconds before trying to connect again.
};

//what is done when a message arrives from the broker
function onMessageArrived(message) {
    console.log(message.destinationName, '', message.payloadString);

    var x = message.payloadString;

    var y = JSON.parse(x);
    var temp = parseFloat(y.t);
    var rh = parseFloat(y.rh);


    console.log("t=" + parseFloat(temp));
    console.log("rh=" + parseFloat(rh));


    if (dataTopics.indexOf(message.destinationName) < 0) {

        console.log("topic=" + message.destinationName);

        dataTopics.push(message.destinationName); //add new topic to array

        var i = i + 1;

        var newseries = {
            id: i,
            name: "Temperature", // hard-coded, need to be fixed
            data: []
        };

        chart.addSeries(newseries); //add the series

        i = i + 1;
        var newseries = {
            id: i,
            name: "Humidity", // hard-coded, need to be fixed
            data: []
        };

        chart.addSeries(newseries); //add the series
    };


    var myEpoch = new Date().getTime(); //get current epoch time


    var thenum = parseFloat(temp); //remove any text spaces from the message
    if (isNumber(thenum)) { //check if it is a real number and not text
        var plotMqtt = [myEpoch, Number(thenum)]; //create the array	
        plot(plotMqtt, 0); //send it to the plot function
    };

    var thenum2 = parseFloat(rh); //remove any text spaces from the message		
    if (isNumber(thenum2)) { //check if it is a real number and not text
        var plotMqtt2 = [myEpoch, Number(thenum2)]; //create the array
        plot(plotMqtt2, 1); //send it to the plot function
    };

};

/////////////////////////////////////////////////////////////////////////////////////////////////////////	

//check if a real number	
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

//function that is called once the document has loaded
function init() {

    //i find i have to set this to false if i have trouble with timezones.
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    // Connect to MQTT broker
    client.connect(options);

};


//this adds the plots to the chart	
function plot(point, chartno) {
    console.log("point=" + point);
    console.log("chartno=" + chartno);

    var series = chart.series[chartno],
        shift = series.data.length > 40; // shift if the series is longer than 20 

    console.log("series.data.length=" + series.data.length);
    // add the point
    chart.series[chartno].addPoint(point, true, shift);

};

//settings for the chart
$(document).ready(function () {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'spline'
        },
        title: {
            text: 'Plotting live data of temperatures'
        },
        subtitle: {
            text: 'broker: ' + MQTTbroker + ' | port: ' + MQTTport + ' | topic : ' + MQTTsubTopic
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        },
        series: []
    });
});
