//main appcontent
// ====================
// GET HTML ELEMENTS
// ====================
console.log("APP.JS LOADED");
const rulesPanel = document.getElementById("rulesPanel");
const categoryPanel = document.getElementById("categoryPanel");
const studentPanel = document.getElementById("studentPanel");
const examFrameWrapper = document.getElementById("examFrameWrapper");
const examHeader = document.getElementById("examHeader");
exameFrameWrapper.hidden = true; //make hide
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


function startTimer(totalTimeMin) {
    let timeRemainingSec= totalTimeMin * 60;
    let secDisplayValue = 0;
    let minDisplayValue = totalTimeMin;
    setInterval(() => {
        while (timeRemainingSec > 0) {
            timeRemainingSec--;
            secDisplayValue = timeRemainingSec % 60;
            minDisplayValue = Math.floor(timeRemainingSec / 60);
        }
    }, 1000);
    const t = document.getElementById("timer");
    t.textContent = "TIME REMAINING:\t" + minDisplayValue + ": " + secDisplayValue;
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
    startTimer(totalTimeMin);
});
