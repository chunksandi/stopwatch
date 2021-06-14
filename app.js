let startTime = 0
let storedTime = 0
let timer
let x = 0
let pausedTime = 0

const startBut = document.querySelector(".startbut")
const restartBut = document.getElementById("but3")
const lapBut = document.getElementById("lapbut")
const indivlap = document.getElementById("indivlap")
const timeflash = document.getElementById("counter")
const stop = document.querySelector('.stop')

function startCountingFunc() {
    unconvertedDuration = Date.now() - startTime;
    storedTime = converter(unconvertedDuration)
    timeflash.innerHTML = storedTime;
    pausedTime = unconvertedDuration;
    console.log(storedTime)
}

function resumeFromPauseFunc() {
    unconvertedDuration = Date.now() - startTime
    prevNcurrentinMS = unconvertedDuration + pausedTime
    storedTime = converter(prevNcurrentinMS);
    timeflash.innerHTML = storedTime;
    console.log(storedTime)
    pausedTime = prevNcurrentinMS
}

function converter(dur) {
    let value = dur / 1000
    let inHrs = value / 3600
    let hh = Math.floor(inHrs)
    let inMin = (inHrs - hh) * 60
    let mm = Math.floor(inMin)
    let inSec = (inMin - mm) * 60
    let ss = Math.floor(inSec)
    let inHSec = (inSec - ss) * 100
    let hs = Math.floor(inHSec)
    return `${pad2(hh)}:${pad2(mm)}:${pad2(ss)}:${pad2(hs)}`
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

startBut.addEventListener('click', () => {
    if (startBut.innerHTML == "start" && x === 1) {
        startTime = Date.now()
        startBut.classList.add("turnRed")
        timer = setInterval(resumeFromPauseFunc, 100)
        return startBut.innerText = "stop"
    }
    if (startBut.innerHTML == "start" && x === 0) {
        startBut.classList.add("turnRed")
        startTime = Date.now();
        timer = setInterval(startCountingFunc, 100)
        startBut.innerText = "stop"
        return (x = 1)
    }
    if (startBut.innerHTML === "stop") {
        startBut.classList.remove("turnRed")
        startBut.innerText = "start"
        clearInterval(timer)
        return (x = 1)
    }
})

lapBut.addEventListener('click', () => {
    if (startBut.innerHTML === "stop"){
    let p = document.createElement('p')
    p.innerHTML = storedTime
    indivlap.insertBefore(p,indivlap.childNodes[0])
    }
})

restartBut.addEventListener('click', () => {
    startBut.classList.remove("turnRed")
    startBut.innerText = "start"
    clearInterval(timer)
    console.log("stop")
    storedTime = `00:00:00:00`
    timeflash.innerHTML = storedTime;
    indivlap.innerHTML = ""
    return x = 0
})
