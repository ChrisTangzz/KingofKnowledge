firebase.initializeApp({
    projectId: "finalhtml"
});
var db = firebase.firestore();
var ref2 = db.collection("PersonGrade").doc("total");
let point;
let cookie = Object.keys($.cookie());
const audiostart = new Audio("audio/start.mp3");
const audiostop = new Audio("audio/stop.mp3");
const audioback = new Audio("audio/mainback.mp3");
const audio = [];
const subjects = ["computer", "programming", "physics", "discreteMath", "digitalLogic", "liner", "calculus"];
$(document).ready(function () {
    ref2.get().then(doc => {
        point = doc.data().grade;
        $("#grade").html("<strong>" + "目前分數為:" + point + "</strong>");
    });
    if (Object.keys($.cookie()).length == 8) {
        $("#inputnameModal").modal("show");
    }
    else if ($.cookie("restart")) {
        $.cookie("restart", 0);
        restart();
    }
    $("#restart").click(function () {
        restart();
    });
    for (let sub in subjects) {
        $("#" + subjects[sub]).click(function () {
            if ($.cookie(subjects[sub])) {
                window.alert("你已經作答過了喔，請選擇其他題");
                audiostop.play();
            }
            else {
                audiostart.play();
                HidePic();
                setTimeout(SetPicsrc(this), 1000);
            }
        });
    }
    for (let i = 1; i <= 3; i++) {
        $("#chose" + i).click(function () {
            let nowid = this.id;
            let string = $("#pic" + i).attr("src");
            string = string.slice(13, -5);
            $.cookie(string, i);
            $.cookie("object", string + i);
        });
    }
    for (let i = 1; i <= 3; i++) {
        $("#chose" + i).mouseover(function () {
            audio[i] = new Audio("audio/" + i + ".mp3");
            audio[i].play();
        });
    }
});
function SetPicsrc(object) {
    let picname = object.id;
    for (let i = 1; i <= 3; i++) {
        $("#pic" + i).attr("src", "imagesfolder/" + picname + i + ".png");
    }
    for (let i = 1; i <= 3; i++) {
        $("#chose" + i).fadeIn(i * 1000);
    }
}
function HidePic() {
    for (let i = 1; i <= 3; i++) {
        $("#chose" + i).hide();
    }
}
function Store() {
    console.log($("#recipient-name").val());
    var ref = db.collection("rank").doc($("#recipient-name").val());
    ref.set({
        grade: point
    }).then(() => {
        console.log("YES");
        window.location.href = "rank.html";
    });
}
function restart() {
    for (let i = 0; i < cookie.length; i++) {
        $.removeCookie(cookie[i]);
    }
    ref2.update({
        grade: 0
    }).then(() => {
        location.reload();
    });
}
function Back(){
    audioback.play();
}