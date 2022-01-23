firebase.initializeApp({
    projectId: "finalhtml"
  });
  var db = firebase.firestore();
  var ref = db.collection("rank");
  let audioback = new Audio("audio/rank.mp3")
  let text, count = 1;
  ref.orderBy('grade', 'desc').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      text = $("<tr></tr>");
      text.html("<th scope='row'>" + count + "</th>" + "<td>" + doc.id + "</td>" + "<td>" + doc.data().grade + "</td>" + "</tr>");
      $("#person").append(text);
      count++;
      console.log(doc.id, doc.data());
    });
  });
  function GoBack(){
    $.cookie("restart",1);
    window.location.href = "index.html";
  }
  function Back(){
    audioback.play();
  }
  function Insert(){
    window.location.href = "generateQuestion.html";
  }