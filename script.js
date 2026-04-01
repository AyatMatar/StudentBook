/* Id Page or URL*/
const cover = document.getElementById("cover");
const lesson = document.getElementById("lesson");
const quiz = document.getElementById("quiz");

/* Navigation buttons */
const startBtn = document.getElementById("startBtn");
const nextToQuiz = document.getElementById("nextToQuiz");
const backToCover = document.getElementById("backToCover");
const backTolesson = document.getElementById("backTolesson");

/* voice */
const audio = document.getElementById("lessonAudio");
const audioIcon = document.getElementById("audioIcon");
const audioIconInner = document.getElementById("audioIconInner");

/* function Navigation Page */
function showPage(hidePage, showPage) {
    hidePage.classList.remove("active");
    showPage.classList.add("active");
}

/*GO cover -> lesson */
startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(cover, lesson);
});

/* GO lesson -> quiz   */
nextToQuiz.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(lesson, quiz);
    audio.pause();
    audio.currentTime = 0;

    audioIconInner.classList.remove("fa-pause");
    audioIconInner.classList.add("fa-volume-high");
});

/* Back lesson ->cover  */
backToCover.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(lesson, cover);
    audio.pause();
    audio.currentTime = 0;
    audioIconInner.classList.remove("fa-pause");
    audioIconInner.classList.add("fa-volume-high");
});

/* Back quiz ->lesson  */
backTolesson.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(quiz, lesson);
});

/* Btn play voice or pause */
audioIcon.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        audioIconInner.classList.replace("fa-volume-high", "fa-pause");
    } else {
        audio.pause();
        audioIconInner.classList.replace("fa-pause", "fa-volume-high");
    }
});

audio.addEventListener("ended", () => {
    audioIconInner.classList.remove("fa-pause");
    audioIconInner.classList.add("fa-volume-high");
});

/* Quiz */

let allCorrect = true;

document.querySelectorAll(".question input[type='radio']").forEach(radio => {
    radio.addEventListener("change", function () {
        const parentQuestion = this.closest(".question");
        const feedback = parentQuestion.querySelector(".feedback-msg");

        if (this.value === "correct") {
            feedback.textContent = "✔ Correct!";
            feedback.className = "feedback-msg correct";
            if (allCorrect) {
                celebrate();
            }
        } else {
            feedback.textContent = "✘ Try Again!";
            feedback.className = "feedback-msg wrong";
        }

       
    });
});

function celebrate() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

