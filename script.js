const tAlarm = document.getElementById("tAlarm");
const dAlarm = document.getElementById("dAlarm");
const hAlarm = document.getElementById("alarms");
const tDisplay = document.getElementById("time-display");
const snd =  new Audio("alarm.wav");

//Alarm constructor
class alarm {
    constructor(time, description) {
        this.time = time;
        this.description = description;
        this.timeSort = parseInt(`${time.replace(":","")}`);      
    }
}

//Alarm array - if user has storage of alarms, call and list that, else start alarms array
if (localStorage.getItem("alarms")) {
    let a = localStorage.getItem("alarms");
    var alarms = JSON.parse(a);
    listAlarm()
    const mTitle = document.getElementById("modal-title")
    const mText = document.getElementById("modal-text")
    mTitle.innerHTML = "Habilitar som de alarmes"
    mText.innerHTML = "Fechar para habilitar alarmes gravados"
    openModal('dv-modal')
}
else {
    var alarms = [];
}

//Set alarm
function setAlarm() {
    time = tAlarm.value;
    
    descr = dAlarm.value;

    const nAlarm = new alarm(time, descr) //adiciona novo alarme   
    alarms.push(nAlarm);

    listAlarm();
}
document.addEventListener('keypress', function(e){
    if(e.which == 13){
       setAlarm();
    }
 }, false);

//Clock refresh and call verify alarm on 00 second
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
//Call clock and refresh second by second
hour()
setInterval(hour, 1000)


//Alarm delete
function delAlarm(i) {
    alarms.splice(i, 1)
    listAlarm()
}

function verifyAl() {
    
    let hNow = new Date;
    hourNow = hNow.getHours()
    minNow = hNow.getMinutes()
    hourNow < 10 ? hourNow = `0${hourNow}` : false;
    minNow < 10 ? minNow = `0${minNow}` : false;
    hNow = `${hourNow}:${minNow}`
    const mTitle = document.getElementById("modal-title")
    const mText = document.getElementById("modal-text")
    if (alarms.some(al => al.time == hNow)) {
        let element = alarms.find(al => al.time == hNow)
        //toca o alarme
        mTitle.innerHTML = hNow
        mText.innerHTML = element.description
        openModal('dv-modal')
        console.log(element.description)
        snd.currentTime = 0; //define som para início
        snd.play();
        setTimeout(function stopAlarm() {
            snd.stop();
          }, 3000)
    }
}

//List alarms sorting by hour
function listAlarm() {
    let htmlAlarm = ''
    alarms.sort((cur, next) => cur.timeSort - next.timeSort)

    for (i in alarms) {
        htmlAlarm += `<p>${alarms[i].time} - ${alarms[i].description} <button onclick='delAlarm(${i})'><img src='trash.png' alt='trash' class='trash'></button></p>`;
    }
    hAlarm.innerHTML = htmlAlarm;
    localStorage.setItem("alarms", JSON.stringify(alarms)) //store alarms on cache
}

// Modal

function openModal(mn) {
 const modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'Block';
    document.body.style.overflow = 'hidden';
}

function closeModal(mn) {
    const modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    snd.pause() //pausa som ao fechar modal
}
