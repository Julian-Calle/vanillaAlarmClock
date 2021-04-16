"use strict";
//selection of DOM's elements necessary for the program
const hourText = document.querySelector(".time");
const dayText = document.querySelector(".date");
const yearText = document.querySelector(".year");
const outerCircle = document.querySelector(".outer");
const innerCircle = document.querySelector(".inner");
const alamrCircle = document.querySelector(".alarm");
const alarmText = document.querySelector(".timer h1");
const formTimer = document.querySelector("form");
const timeInput = document.querySelector("input");

//this numbers are required for the correct circle dimensions
const minCircleSize = 280;
const maxCicleSize = 630;
let alarmDate = new Date();
let currentDate = new Date();
let maxAlarmCircleValue;
let timerActive;

formTimer.addEventListener("submit", handlerClick);

function handlerClick(e) {
  e.preventDefault();
  const timeInputValue = timeInput.value;
  if (timeInputValue) {
    const [alarmHour, alarmMinutes] = timeInput.value.split(":");
    let alarm = new Date();
    let currentTime = new Date();
    alarm.setHours(alarmHour);
    alarm.setMinutes(alarmMinutes);
    alarm.setSeconds(0);
    alarm.setMilliseconds(0);
    maxAlarmCircleValue = distanceDate(currentTime, alarm);
    timerActive = true;
    alarmDate = alarm;
  }
}

//used for determine num of second until alarm stop
function checkTimer(alarmTime) {
  alarmText.innerText =
    alarmTime < 0 ? " " : `Quedan ${Math.trunc(alarmTime)} seg`;
}
//used to determinate the discatance between two different dates in seconds
function distanceDate(startDate, endDate) {
  const sec = (endDate.getTime() - startDate.getTime()) / 1000;
  return sec;
}

//with this array we can traslate to Spanish the date`s moth
const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
// this is the main program that execute all the other function;
function clock() {
  const time = new Date();
  const hours = formatNumber(time.getHours());
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());

  innerCircleShape(seconds, outerCircleShape());

  const separator = seconds % 2 ? ":" : " ";
  const month = monthNames[time.getMonth()];
  hourText.innerText = `${hours}${separator}${minutes}${separator}${seconds}`;
  dayText.innerText = `${time.getDate()} de ${month}`;
  yearText.innerText = `${time.getFullYear()}`;

  if (seconds >= 58) {
    outerCircle.style.border = `red solid 10px`;
  } else {
    outerCircle.style.border = `blue 7px solid`;
  }

  if (timerActive) {
    checkTimer(distanceDate(time, alarmDate));
    alarmCircleShape(distanceDate(time, alarmDate), maxAlarmCircleValue);
  }
}
//used to get a number in the right format, it means with two digits
function formatNumber(number) {
  return number < 10 ? `0${number}` : number;
}
//determine the ourter circle's  animation and  behavior
function outerCircleShape() {
  let outerCicleWidth;
  const windowWidth = innerWidth;
  if (windowWidth < minCircleSize) {
    outerCicleWidth = minCircleSize;
  } else if (windowWidth > minCircleSize && windowWidth < maxCicleSize) {
    outerCicleWidth = windowWidth - 4;
  } else {
    outerCicleWidth = maxCicleSize - 4;
  }
  outerCircle.style.width = `${outerCicleWidth}px`;
  outerCircle.style.height = `${outerCicleWidth}px`;
  return outerCicleWidth;
}
//determine the innerter circle's  animation and  behavior
function innerCircleShape(num, circleSize) {
  innerCircle.style.border = `white solid ${180 / num}px`;
  innerCircle.style.border = num >= 59 ? `red solid ${3}px` : "white solid 1px";
  innerCircle.style.width = `${(circleSize / 60) * num - 1}px`;
  innerCircle.style.height = `${(circleSize / 60) * num - 1}px`;
}
//determine the alarm circle's  animation and  behavior
function alarmCircleShape(num, circleSize) {
  if (num > 0) {
    alamrCircle.style.width = `${
      (outerCircleShape() / circleSize) * (circleSize - Math.trunc(num) - 1)
    }px`;
    alamrCircle.style.height = `${
      (outerCircleShape() / circleSize) * (circleSize - Math.trunc(num) - 1)
    }px`;
  } else {
    timerActive = false;
    alamrCircle.style.width = `0px`;
    alamrCircle.style.height = `0px`;
  }
}
setInterval(clock, 1000);
