//prevent tab switching 
// ================================
// PROCTORING
// ================================

// ================================
// GET HTML ELEMENTS
// ================================

window.examStarted = false;


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
        "A violation of the exam rules was detected. Your session has been terminated. Contact the Quizzard Event Manager on Discord to appeal.";

    acknowledgeBtn.disabled = true;
    acknowledgeBtn.textContent = "END EXAM (59)";

    let countdown = 59;

    const terminationCountdown = setInterval(() => {

        countdown--;

        if (countdown > 0) {
            acknowledgeBtn.textContent =
                "END EXAM (" + countdown + ")";
        }
        else {
            clearInterval(terminationCountdown);

            acknowledgeBtn.disabled = false;
            acknowledgeBtn.textContent =
                "END EXAM";
        }

    }, 1000);
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
    if (strikes >= maxStrikes) {
        terminate();
        return;
    }
    warningModal.hidden = true;
});