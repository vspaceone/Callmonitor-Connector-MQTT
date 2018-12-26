// ##############################
// Requires
// ##############################
var mqtt = require('mqtt')
var config = require('config');

const callmonitor = require("fritz-callmonitor");
const CallMonitor = callmonitor.CallMonitor;
const EventKind = callmonitor.EventKind;

// ##############################
// Configuration variables
// ##############################

var mqttServer = 'mqtt://' + defaultIfUndefined(process.env.MQTT_Server, config.get('mqtt.server'));
var mqttId = defaultIfUndefined(process.env.MQTT_ID, config.get('mqtt.id'));
var mqttUser = defaultIfUndefined(process.env.MQTT_User, config.get('mqtt.user'));
var mqttPassword = defaultIfUndefined(process.env.MQTT_Password, config.get('mqtt.password'));
var mqttTopic = defaultIfUndefined(process.env.MQTT_Topic, config.get('mqtt.publish_topic'));
var fritzboxIp = defaultIfUndefined(process.env.Fritz_IP, config.get('fritzbox_ip'));

function defaultIfUndefined(vvalue, def){
    return vvalue != undefined ? vvalue : def
}

// ##############################
// MQTT Init
// ##############################

var client = mqtt.connect(mqttServer, {
    clientId: mqttId,
    username: mqttUser,
    password: mqttPassword
})

client.on('connect', function(){})

// ##############################
// CallMonitor Init
// ##############################

const cm = new CallMonitor(fritzboxIp, 1012);
 
cm.on("ring", rr => {
    console.dir(rr);
    console.log(`${rr.caller} calling...`);
});
 
cm.on("call", rr => console.dir(rr));
cm.on("pickup", rr => console.dir(rr));
cm.on("hangup", rr => console.dir(rr));
 
cm.on("phone", evt => {
    var json = JSON.stringify(evt);
    console.log(json);
    client.publish(mqttTopic, json);
});

// from fritz-callmonitor
// export enum EventKind {
// 	Call = 0,
// 	Ring = 1,
// 	PickUp = 2,
// 	HangUp = 4
// }
 
cm.on("close", () => console.log("Connection closed."));
cm.on("connect", () => console.log("Connected to device."));
cm.on("error", err => console.dir(err));
 
cm.connect();