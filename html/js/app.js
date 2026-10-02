//main appcontent
// ====================
// GET HTML ELEMENTS
// ====================
console.log("app.js loaded :D");
const rulesPanel = document.getElementById("rulesPanel");
const categoryPanel = document.getElementById("categoryPanel");
const studentPanel = document.getElementById("studentPanel");
const examFrameWrapper = document.getElementById("examFrameWrapper");
const examHeader = document.getElementById("examHeader");
examFrameWrapper.hidden = true; //make hide
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

//timer stuff
let totalTimeMin = 30; //CHANGE TIME TOTAL HERE
const t = document.getElementById("timer");

function startTimer(totalTimeMin) {
    let timeRemainingSec = totalTimeMin * 60;
    t.textContent =
        "TIME REMAINING: " +
        Math.floor(timeRemainingSec / 60) +
        ":00";
    const timerInterval = setInterval(() => {
        if (!window.examStarted) {
            clearInterval(timerInterval);
            return;
        }
        if (timeRemainingSec <= 0) {
            clearInterval(timerInterval);
            terminate();
            return;
        }
        timeRemainingSec--;

        const minutes =
            Math.floor(timeRemainingSec / 60);

        const seconds =
            timeRemainingSec % 60;

        t.textContent =
            "TIME REMAINING: " +
            minutes +
            ":" +
            String(seconds).padStart(2, "0");
    }, 1000);
}
    
    

// ====================
// EVENT START TIME
// ====================

const eventStartTime =
    new Date("2026-10-03T00:00:00+05:30");

function checkStartTime() {

    if (new Date() >= eventStartTime) {

        startBtn.disabled = false;

        startBtn.textContent =
            "ENGAGE FULLSCREEN & START";

        clearInterval(startTimeChecker);
    }
}

const startTimeChecker =
    setInterval(checkStartTime, 1000);

checkStartTime();


// TERMINATION WWWWWWOW
function terminate() {
    window.examStarted = false;
    examFrameWrapper.hidden = true;
    examHeader.hidden = true;
    warningModal.hidden = true;
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
// START EXAM
// ====================

candidateForm.addEventListener("submit", async (event) => {

    // Stop the form from actually submitting/reloading the page
    event.preventDefault();

    const name = studentName.value.trim();

    // Extra safety check
    if (name === "") {
        return;
    }

    // Display candidate name in the exam header
    displayStudent.textContent = name;

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
    }

    // Hide candidate screen
    studentPanel.hidden = true;

    // Show exam
    examFrameWrapper.hidden = false;
    examHeader.hidden = false;
    examStarted = true;
    startTimer(totalTimeMin);
    window.examStarted = true;
});