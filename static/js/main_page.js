document.addEventListener("DOMContentLoaded", function() {
    var spinner = document.getElementById("spinner");
    spinner.style.display = "block";
    document.querySelector(".permission-page").style.display = "none"
    document.getElementById("exam_portal_page").style.display = "none" 
 
    setTimeout(function() {
        spinner.style.display = "none";
        document.querySelector(".permission-page").style.display = "block"
    }, 2000);
    });

var INTERNET_SPEED = false;
var MICROPHONE = false;
var CAMERA = false;


document.getElementById("exam_portal_page").style.display = "none"

var elem = document.documentElement;

function openFullscreen() {
    elem.requestFullscreen();
    document.getElementById("fullscreen").style.color = "blue";
    document.getElementById('checkbox1').style.color = 'blue';
}
function runSpeedTest(callback) {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = 500000 * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        var checkbox1 = document.getElementById("checkbox2");
        var internet = document.getElementById("internet");
        if (speedMbps >= 2) {
            internet.innerHTML = "Speed " + speedMbps + " Mbps";
            internet.style.color = "blue";
            checkbox1.style.color = "blue";
            INTERNET_SPEED = true;
        } else {
            internet.innerHTML = "Speed " + speedMbps + " Mbps";
            internet.style.color = "red";
            checkbox1.style.color = "red";
            INTERNET_SPEED = false;
        }
        callback();
    };
  
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = "https://images.pexels.com/photos/719396/pexels-photo-719396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" + cacheBuster;
}

function requestMicrophonePermission(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        document.getElementById("Microphone").style.color = "blue";
        document.getElementById('checkbox3').style.color = 'blue';
        MICROPHONE = true;
        callback();
      })
      .catch(function(err) {
        document.getElementById("Microphone").style.color = "red";
        document.getElementById('checkbox3').style.color = 'red';
        MICROPHONE = false;
        callback();
      });
}

var VideoPlay = document.getElementById("videoElement");

function requestCameraPermission(callback) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(userMediaStream) {
            document.getElementById("Camera").style.color = "blue";
            document.getElementById('checkbox4').style.color = 'blue';
            CAMERA = true;
            VideoPlay.srcObject = userMediaStream;
            console.log("Camera access granted");
            callback();
        })
        .catch(function(err) {
            document.getElementById("Camera").style.color = "red";
            document.getElementById('checkbox4').style.color = 'red';
            CAMERA = false;
            console.error("Camera access denied:", err);
            callback(); 
        });
}



var customAlert = document.getElementById("custom-alert");
var alertMessage = document.getElementById("alert-message");
function Givepermissions() {
    openFullscreen();
    setInterval(runSpeedTest, 1000);
    setTimeout(() => {
        requestMicrophonePermission(function() {
            requestCameraPermission(function() {

                if (INTERNET_SPEED && MICROPHONE && CAMERA ) {
                    document.querySelector(".permission-con").style.display = "none"
                    document.getElementById("exam-instruction").style.display = "block";
                    customAlert.style.display = "none";
                } else {
                    customAlert.style.display = "block";
                    alertMessage.textContent = "Permissions not granted, Refresh the page to continue exam";
                }
            });
        });
    }, 3000);
}

function starttest() {
    customAlert.style.display = "block";
    alertMessage.textContent = "Moving to Exam Portal";
    setTimeout(() => {
        customAlert.style.display = "none";
        document.querySelector(".permission-page").style.display = "none"
        document.getElementById("exam_portal_page").style.display = "block" 
    }, 2000);
    
}