// Timer Variables
let workTime = 25; // Default work time in minutes
let breakTime = 5; // Default break time in minutes
let isWork = true;
let timerInterval;

// DOM Elements
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const workInput = document.getElementById("work-time");
const breakInput = document.getElementById("break-time");

// Load Sound
const notificationSound = new Audio("original-phone-ringtone-36558.mp3"); // Replace with your sound file path

// Start Timer
function startTimer() {
  const duration = (isWork ? workTime : breakTime) * 60; // Convert minutes to seconds
  let timeLeft = duration;

  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Update Timer Display
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    // When Time's Up
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      notificationSound.play();
      isWork = !isWork; // Switch between work and break
      startTimer(); // Automatically start the next session
    }

    timeLeft -= 1;
  }, 1000);
}

// Reset Timer
function resetTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent = "00:00";
  isWork = true;
}

// Update Work and Break Times
function updateTimes() {
  workTime = parseInt(workInput.value) || 25; // Default to 25 if invalid input
  breakTime = parseInt(breakInput.value) || 5; // Default to 5 if invalid input
}

// Event Listeners
startButton.addEventListener("click", () => {
  updateTimes();
  resetTimer();
  startTimer();
});

resetButton.addEventListener("click", resetTimer);