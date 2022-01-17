let click = 0;
let DocumentnObj;
let object = $.cookie("object");
let subject = object.slice(0, -1);
let chose = object.slice(-1);
let level = "";
switch (chose) {
    case "1":
        level = "easy";
        break;
    case "2":
        level = "medium";
        break;
    case "3":
        level = "hard";
        break;
}
firebase.initializeApp({
    projectId: "finalhtml"
});
var db = firebase.firestore();
var ref = db.collection(subject).doc(level);
var ref2 = db.collection("PersonGrade").doc("total");
let audioback = new Audio("audio/ques.mp3");
var point = 0;
ref.get().then(doc => {
    let questionObj = JSON.parse(doc.data().q1);
    DocumentnObj = questionObj;
    console.log("question:" + questionObj.question);
    $("#question").text(questionObj.question);
    $("#a").text(questionObj.a);
    $("#b").text(questionObj.b);
    $("#c").text(questionObj.c);
    $("#d").text(questionObj.d);
});
ref2.get().then(doc => {
    point = doc.data().grade;
});
$(document).ready(function () {
    $("#a").click(function () {
        Disable();
        if (DocumentnObj.answer != 'a')
            Wrong(this);
        else
            Correct(this);
    });
    $("#b").click(function () {
        Disable();
        if (DocumentnObj.answer != 'b')
            Wrong(this)
        else
            Correct(this);
    });
    $("#c").click(function () {
        Disable();
        if (DocumentnObj.answer != 'c') {
            Wrong(this);
        }
        else {
            Correct(this);
        }
    });
    $("#d").click(function () {
        Disable();
        if (DocumentnObj.answer != 'd') {
            Wrong(this);
        }
        else {
            Correct(this);
        }
    });
});
function Correct(object) {
    audioback.pause();
    point += chose * 100;
    click = 1;
    $(object).attr("class", "btn btn-success");
    const audioc = new Audio("audio/correct.mp3");
    audioc.play();
    setTimeout(function () {
        $("#win").show();
        const audioch = new Audio("audio/cheer.mp3");
        audioch.play();
    }, 2000);
    setTimeout(function () {
        ref2.update({
            grade: point
        }).then(() => {
            window.location.href = "index.html";
        });
    }, 3300);
}
function Wrong(object) {
    audioback.pause();
    point += 0;
    click = 1;
    $(object).attr("class", "btn btn-danger");
    const audio = new Audio("audio/wrong.mp3");
    audio.play();
    setTimeout(function () {
        $("#wrong").show();
        const audiok = new Audio("audio/SoundKnife.mp3");
        audiok.play();
    }, 2000);
    setTimeout(function () {
        ref2.update({
            grade: point
        }).then(() => {
            window.location.href = "index.html";
        });
    }, 3000);
}
setTimeout(function () {
    audioback.pause();
    if (!click) {
        Disable();
        const audio = new Audio("audio/timeout.mp3");
        audio.play();
        ref2.update({
            grade: point
        }).then(() => {
            window.alert("您未作答題目");
            window.location.href = "index.html";
        });
    }
}, 20000)
function Disable() {
    $("#a").attr("disabled", true);
    $("#b").attr("disabled", true);
    $("#c").attr("disabled", true);
    $("#d").attr("disabled", true);
}
function Back() {
    audioback.play();
}
$.getScript('https://rawgit.com/kimmobrunfeldt/progressbar.js/1.0.0/dist/progressbar.js', function () {

    var loading = `<style>
    div#container {
      margin: 20px;
      width: 200px;
      height: 200px;
      pointer-events: none;
      user-select: none;
    }
    div#bkground {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 200px;
      height: 200px;
    }
    div#bkground div {
      width: 182px;
      height: 182px;
      background-color: #a3a3ff;
      border-radius: 100px;
    }
    div#whitecircle {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 200px;
      height: 200px;
    }
    div#whitecircle div {
      width: 182px;
      height: 182px;
      background-color: #fff;
      border-radius: 100px;
    }
    div#tick {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 200px;
      height: 200px;
    }
    div#tick div {
      color: #E0E0FF;
      font-size: 0;
      font-weight: bold;
    }
    </style>
    <div id="container">
    <div id='bkground'><div></div></div>
    <div id='whitecircle'><div></div></div>
    <div id='tick'><div>✔</div></div>
    </div>
    </div>`;
    $('div#check.check').html(loading);
    var bar = new ProgressBar.Circle(container, {
        strokeWidth: 5,
        easing: 'linear',
        duration: 20000,
        color: '#a3a3ff',
        trailColor: '#d1d1ff',
        trailWidth: 5,
        svgStyle: null,
        from: { color: '#a3a3ff', width: 5 },
        to: { color: '#a3a3ff', width: 5 },
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);
            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }
        }
    });
    bar.text.style.color = 'transparent';
    bar.animate(1.0);
    var interval2 = setInterval(function () {
        if ($('div.progressbar-text').text() == '100') {
            clearInterval(interval2);
            $('div#whitecircle div').animate({
                width: 0,
                height: 0
            }, 333, function () {
                $('div#tick div').animate({
                    fontSize: 150
                }, 333);
            });
        };
    }, 100);
})