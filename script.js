const tAlarm = document.getElementById("tAlarm");
const dAlarm = document.getElementById("dAlarm");
const hAlarm = document.getElementById("alarms");
const tDisplay = document.getElementById("time-display");
const snd =  new Audio("alarm.wav");

class alarm {
    constructor(time, description) {
        this.time = time;
        this.description = description;
        this.timeSort = parseInt(`${time.replace(":","")}`);      
    }
}
// function alarm(time, description) {
//     this.time = time;
//     this.description = description
// }

const alarms = [];

function setAlarm() {
    time = tAlarm.value;
    
    descr = dAlarm.value;

    const nAlarm = new alarm(time, descr) //adiciona novo alarme   
    alarms.push(nAlarm);

    listAlarm();
}

function hour(){
    let now = new Date;
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    hour < 10 ? hour = `0${hour}` : false;
    minute < 10 ? minute = `0${minute}` : false;
    second < 10 ? second = `0${second}` : false;
    tDisplay.innerHTML = `${hour}:${minute}:${second}`

    //play alarm
    if (second == 00) {
        verifyAl();
    }
}

function delAlarm(i) {
    alarms.splice(i, 1)
    listAlarm()
}

function verifyAl() {
    let hNow = new Date;
    hNow = `${hNow.getHours()}:${hNow.getMinutes()}`
    if (alarms.some(al => al.time == hNow)) {
        let element = alarms.find(al => al.time == hNow)
        //toca o alarme
        console.log(element.description)
    }
}

function listAlarm() {
    let htmlAlarm = ''
    alarms.sort((cur, next) => cur.timeSort - next.timeSort)

    for (i in alarms) {
        htmlAlarm += `<p>Hora: ${alarms[i].time} Descrição: ${alarms[i].description} <button onclick='delAlarm(${i})'><img src='trash.png' alt='trash' class='trash'></button></p>`;
    }
    hAlarm.innerHTML = htmlAlarm;
}

setInterval(hour, 1000)