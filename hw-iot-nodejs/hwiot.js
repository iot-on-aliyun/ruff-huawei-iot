const path = require('path');
const huaweiIoT = require('huaweicloud-iot-device-sdk');
const options = {
   deviceId: "你的deviceId",
   deviceSecret: "你的deviceSecret",
   caFilePath: path.join(__dirname, 'hw_iot_root.pem'),
   host: '你的host'
}
//建立连接
var client = huaweiIoT.getHuaweiIoTClient(options);
client.on('connect', function(connack) {
        console.log('connect。。。'+ JSON.stringify(connack));

});

var topic = `/huawei/v1/devices/${options.deviceId}/data/json`
function getData(){
var postJson = {
   msgType: "deviceReq",
   data: [{
           serviceId: "postData",
           serviceData: {
               temperature: Math.floor(((Math.random() * 2) + 22)* 10) / 10,//.toFixed(1)
               humidity: Math.floor(((Math.random() * 5) + 55)* 10) / 10,
               co2: Math.floor((Math.random() * 80) + 470),
               hcho: 0.03,
               pm25: Math.floor((Math.random() * 10) + 30),
               pm10: Math.floor((Math.random() * 20) + 70)
           }
       }
   ]
}
console.log('payload => ' + JSON.stringify(postJson))
return JSON.stringify(postJson)
}

setInterval(function() {
   //事件上报
client.publish(topic, getData())
}, 5 * 1000);