//main appcontent
// ====================
// GET HTML ELEMENTS
// ====================
console.log("wowow app.js loaded :D");


const rulesPanel = document.getElementById("rulesPanel");
const categoryPanel = document.getElementById("categoryPanel");
const studentPanel = document.getElementById("studentPanel");
const examFrameWrapper = document.getElementById("examFrameWrapper");
const examHeader = document.getElementById("examHeader");

examFrameWrapper.hidden = true; //make hide

const preExamPanel =
    document.getElementById("preExamPanel");

const continueStartBtn =
    document.getElementById("continueStartBtn");

const acknowledgeRulesBtn =
    document.getElementById("acknowledgeRulesBtn");

const juniorBtn =
    document.getElementById("juniorBtn");

const seniorBtn =
    document.getElementById("seniorBtn");

const backBtn =
    document.getElementById("backBtn");

const candidateForm =
    document.getElementById("candidateForm");

const studentName =
    document.getElementById("studentName");

const selectedDivisionText =
    document.getElementById("selectedDivisionText");

const displayStudent =
    document.getElementById("displayStudent");

const quizFrame =
    document.getElementById("quizFrame");

const terminationScreen =
    document.getElementById("terminationScreen"); //if exam was terminated due to tabswitch

const startBtn =
    document.getElementById("startBtn");
const warningModal =
    document.getElementById("warningModal");
// ====================
// GOOGLE FORM LINKS
// ====================

const forms = {
    junior: "https://forms.gle/WKEBbArmU4Gj9K5j9",
    senior: "https://forms.gle/yBnJ1mKbd7B9rzZG6"
};


// ====================
// CURRENT SELECTION
// ====================

let selectedDivision = "";
let rulesAcknowledged = false; //prevent user from accessing forms w/o acknowledging rules


// ====================
// TIMER STUFF
// ====================

// ====================
// TIMER STUFF
// ====================

let totalTimeMin = 30; // CHANGE TIME TOTAL HERE

const t = document.getElementById("timer");

let timerInterval = null;
let examEndTime = null;

function startTimer(totalTimeMin) {

    // Prevent multiple timers from running
    if (timerInterval !== null) {
        clearInterval(timerInterval);
    }

    // Calculate exact time when exam ends
    examEndTime = Date.now() + (totalTimeMin * 60 * 1000);

    function updateTimer() {

        const timeRemainingMs = examEndTime - Date.now();
        const timeRemainingSec = Math.max(
            0,
            Math.ceil(timeRemainingMs / 1000)
        );

        const minutes = Math.floor(timeRemainingSec / 60);
        const seconds = timeRemainingSec % 60;

        t.textContent =
            "TIME REMAINING: " +
            minutes +
            ":" +
            String(seconds).padStart(2, "0");

        if (timeRemainingSec <= 0) {

            clearInterval(timerInterval);
            timerInterval = null;

            terminate();
        }
    }
    // Show 30:00 immediately
    updateTimer();

    // Update every second
    timerInterval = setInterval(updateTimer, 1000);
}


// ====================
// TERMINATION WWWWWWOW
// ====================

function terminate() {

    window.examStarted = false;

    localStorage.setItem("examTerminated", "true");

    examFrameWrapper.hidden = true;
    examHeader.hidden = true;
    warningModal.hidden = true;
    preExamPanel.hidden = true;
    studentPanel.hidden = true;
    categoryPanel.hidden = true;
    rulesPanel.hidden = true;
    brandHeader.hidden = true;

    terminationScreen.hidden = false;

    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

// ====================
// RULES → CATEGORY 
// ====================

acknowledgeRulesBtn.addEventListener("click", () => {

    console.log("BUTTON WORKED");

    rulesPanel.hidden = true;
    rulesAcknowledged = true;
    categoryPanel.hidden = false;

});


// ====================
// CATEGORY → CANDIDATE
// ====================

juniorBtn.addEventListener("click", () => {

    selectedDivision = "Junior";

    selectedDivisionText.textContent =
        "Selected Category: Junior Division";

    categoryPanel.hidden = true;
    studentPanel.hidden = false;

});


seniorBtn.addEventListener("click", () => {

    selectedDivision = "Senior";

    selectedDivisionText.textContent =
        "Selected Category: Senior Division";

    categoryPanel.hidden = true;
    studentPanel.hidden = false;

});


// ====================
// BACK → CATEGORY
// ====================

backBtn.addEventListener("click", () => {

    studentPanel.hidden = true;
    categoryPanel.hidden = false;

    studentName.value = "";

});


// ====================
// CONFIRM LOGIN
// ====================

candidateForm.addEventListener("submit", (event) => {

    // Stop the form from actually submitting/reloading the page
    event.preventDefault();

    const name = studentName.value.trim();

    // Extra safety check
    if (name === "") {
        return;
    }

    // Display candidate name in the exam header
    displayStudent.textContent = name;

    // DON'T START THE EXAM HERE
    // Just move to the confirmation screen

    studentPanel.hidden = true;
    preExamPanel.hidden = false;

});


// ====================
// ACTUALLY START EXAM
// ====================

continueStartBtn.addEventListener("click", async () => {

    // Load the correct Google Form
    if (selectedDivision === "Junior") {
        quizFrame.src = forms.junior;
    }
    else if (selectedDivision === "Senior") {
        quizFrame.src = forms.senior;
    }

    // Try to enter fullscreen
    try {
        await document.documentElement.requestFullscreen();
    }
    catch (error) {
        console.log("Failed to enter fullscreen:", error);
        return;
    }

    // Hide confirmation screen
    preExamPanel.hidden = true;

    // Show exam
    examFrameWrapper.hidden = false;
    examHeader.hidden = false;

    // NOW the exam has actually started
    window.examStarted = true;

    // Start timer
    startTimer(totalTimeMin);

});
if (localStorage.getItem("examTerminated") === "true") {
    terminate();
}//prob wont work but why not try