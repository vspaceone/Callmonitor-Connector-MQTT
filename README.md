# Callmonitor-Connector for MQTT servers
This is intended to be used as a connector between the [MQTT-callblink](https://github.com/vspaceone/MQTT-callblink) and a MQTT broker to forward information from the fritzbox-APIs (received using the [fritz-callmonitor](https://www.npmjs.com/package/fritz-callmonitor) NPM package)

__Also available as docker image:__ [vspaceone/callmonitor-connector-mqtt](https://cloud.docker.com/u/vspaceone/repository/docker/vspaceone/callmonitor-connector-mqtt)

## Other Software for this project

- [Project site in vspace.one wiki (German)](https://wiki.vspace.one/doku.php?id=projekte:klingelsignal)
- [MQTT-callblink, an example for a receiving application on the ESP8266](https://github.com/vspaceone/MQTT-callblink)

## Configuration
Configuration can be accomplished either by environment variables (recommended when using Docker-image) or a configuration file.

__Keep in mind__ that environment variables overwrite settings made in the configuration file.

### Environment variables

|Variable| Description|
|-------------|-------------|
|MQTT_Server  | IP of the MQTT Broker|
|MQTT_ID      | ID of this MQTT Client|
|MQTT_User    | Username to log in at the MQTT Broker|
|MQTT_Password| Password for that user on the MQTT Broker|
|MQTT_Topic   | Topic under which to publish the messages|
|Fritz_IP     | IP Adress of the Fritzbox with enabled callmonitor API|

### Configuration file
To run this connector a configuration file needs to be created like in this example:

config/default.json
```
{
    "mqtt":{
        "id": "MQTT client name",
        "server": "MQTT server address",
        "user": "MQTT username",
        "password": "MQTT password"
        "publish_topic": "MQTT Topic"
    },
    "fritzbox_ip":"Fritzbox IP e.g. 192.168.178.1"
}
```

## Messages
This connector solely forwards event objects in JSON format to the specified MQTT-Channel.
The scheme of the event objects will correspond to the definitions made by the used version of the [fritz-callmonitor](https://www.npmjs.com/package/fritz-callmonitor) dependency.
