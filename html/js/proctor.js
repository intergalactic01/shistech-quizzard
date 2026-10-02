//prevent tab switching 
// ================================
// PROCTORING
// ================================

// ================================
// GET HTML ELEMENTS
// ================================

window.examStarted = false;

const warningModal =
    document.getElementById("warningModal");

const warningTitle =
    document.getElementById("warningTitle");

const warningMessage =
    document.getElementById("warningMessage");

const acknowledgeBtn =
    document.getElementById("acknowledgeBtn");

const strikeTracker =
    document.getElementById("strikeTracker");



// ================================
// STRIKE SYSTEM
// ================================

let strikes = 0;
const maxStrikes = 1;


function registerStrike(reason) {

    strikes++;

    strikeTracker.textContent =
        "STRIKES: " + strikes + " / " + maxStrikes;

    warningTitle.textContent =
        "WARNING";

    warningMessage.textContent =
        reason + " This incident has been recorded.";

    warningModal.hidden = false;

    // End exam if maximum strikes are reached
    if (strikes >= maxStrikes) {
        warningTitle.textContent =
            "EXAM TERMINATED";

        warningMessage.textContent =
            "Maximum number of strikes reached. Your exam has been terminated.";

        acknowledgeBtn.textContent =
            "END EXAM";
    }
}


// ================================
// TAB SWITCH / WINDOW HIDDEN
// ================================

document.addEventListener("visibilitychange", () => {

    if (window.examStarted && document.hidden) {
        registerStrike("Tab switching or minimizing detected.");
    }

});


// ================================
// FULLSCREEN EXIT
// ================================

document.addEventListener("fullscreenchange", () => {

    if (window.examStarted && !document.fullscreenElement) {
        registerStrike("Fullscreen exited.");
    }

});


// ================================
// WARNING ACKNOWLEDGEMENT
// ================================

acknowledgeBtn.addEventListener("click", () => {

    warningModal.hidden = true;

});