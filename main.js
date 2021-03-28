function doc(id) {
  const doc = document.getElementById(`${id}`);
  return doc;
}
const svg = doc("svg");
svg.setAttribute("width", window.innerWidth - 10);
svg.setAttribute("height", window.innerHeight / 2);

const svgContainer = doc("control-point-container");
const playerAGutti = doc("player-A-gutti-container");
const playerBGutti = doc("player-B-gutti-container");
var el = document.getElementsByClassName("ctrl");
/*
  1 2 3
  4 5 6
  7 8 9 
*/

var playerData = {
  playerName1: "",
  playerName2: "",
  time: 0,
};

var posA = [1, 2, 3];
var posB = [7, 8, 9];
var currentPlayerId = "";
var isA;
var r = 20;

const winPos = [
  [4, 5, 6],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [1, 5, 9],
];
const pos = [
  [2, 4, 5],
  [1, 3, 5],
  [2, 5, 6],
  [1, 5, 7],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [3, 9, 5],
  [4, 8, 5],
  [5, 7, 9],
  [8, 5, 6],
];

doc("toss-btn").addEventListener("click", () => {
  isA = Math.floor(Math.random() * 2);
  console.log(isA);
  if (isA) {
    doc("A").style.display = "initial";
  } else {
    doc("B").style.display = "initial";
  }
  doc("toss-btn").setAttribute("disabled", true);
});

doc("play-btn").addEventListener("click", () => {
  const name1 = doc("Aname");
  const name2 = doc("Bname");
  playerData.playerName1 = doc("nameA").value;
  playerData.playerName2 = doc("nameB").value;
  if (
    isA !== undefined &&
    playerData.playerName2 != "" &&
    playerData.playerName1 != ""
  ) {
    name1.innerText = `${playerData.playerName1.toUpperCase()}`;
    name2.innerText = `${playerData.playerName2.toUpperCase()}`;
    doc('hide-me').style.display = 'none'
    var duration = setInterval(() => {
      playerData.time++;
    }, 1000)

  } else alert('fuck')
});

function checkEquality(arr1, arr2) {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  let f1 = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      f1++;
    }
  }
  if (f1 === arr1.length) {
    return true;
  } else return false;
}

function getPos(id) {
  let f1 = id.split("");
  if (f1[0] === "A") {
    return posA[parseInt(f1[1]) - 1];
    //console.log(posA[parseInt(f1[1]) - 1]);
  } else {
    return posB[parseInt(f1[1]) - 1];
  }
}
function makeBiger() {
    if (isA ) {
    for (let i = 0; i < playerAGutti.children.length; i++) {
        playerAGutti.children[i].setAttribute("r", 20);
     }
    }else{for (let i = 0; i < playerAGutti.children.length; i++) {
      playerAGutti.children[i].setAttribute("r", 10);
    }}
  
    if(!isA) {
     for (let i = 0; i < playerBGutti.children.length; i++) {
      playerBGutti.children[i].setAttribute("r", 20);
    }
   }else{
     for (let i = 0; i < playerBGutti.children.length; i++) {
       playerBGutti.children[i].setAttribute("r", 10);
     }
   }
}
function mark(x, y) {
  const el = doc("marker");
  el.style.display = "initial";
  el.setAttribute("cx", x);
  el.setAttribute("cy", y);
  hideCtrl();

//makeBiger() 
}

function hideMarker() {
  doc("marker").style.display = "none";
}


function hideCtrl() {
  for (let i = 0; i < el.length; i++) {
    el[i].style.display = "none";
  }
}

function showCtrl(id) {
  //ARRAY
  id.forEach((e) => {
    doc(e.toString()).style.display = "initial";
  });
}

function setPos(id) {
  if (currentPlayerId == "A1") posA[0] = parseInt(id);
  if (currentPlayerId == "A2") posA[1] = parseInt(id);
  if (currentPlayerId == "A3") posA[2] = parseInt(id);

  if (currentPlayerId == "B1") posB[0] = parseInt(id);
  if (currentPlayerId == "B2") posB[1] = parseInt(id);
  if (currentPlayerId == "B3") posB[2] = parseInt(id);
}

function move(id, x, y) {
  const el = doc(id);
  el.setAttribute("cx", x);
  el.setAttribute("cy", y);
}

for (let i = 0; i < playerAGutti.children.length; i++) {
  (function(index) {
    playerAGutti.children[index].addEventListener("click", (e) => {
      if (isA) {
        currentPlayerId = playerAGutti.children[index].getAttribute("id");
        let x = doc(currentPlayerId).getAttribute("cx");
        let y = doc(currentPlayerId).getAttribute("cy");

        mark(x, y);

        showCtrl(pos[getPos(currentPlayerId) - 1]);
      }
    });
  })(i);
}

for (let i = 0; i < playerBGutti.children.length; i++) {
  (function(index) {
    playerBGutti.children[index].addEventListener("click", (e) => {
      if (!isA) {
        currentPlayerId = playerBGutti.children[index].getAttribute("id");
        let x = doc(currentPlayerId).getAttribute("cx");
        let y = doc(currentPlayerId).getAttribute("cy");

        mark(x, y);

        showCtrl(pos[getPos(currentPlayerId) - 1]);
      }
    });
  })(i);
}

function displeyEndBox() {
  doc('hide-me').style.display = 'initial'
  doc('end-menu').style.display = 'initial'
  doc('start-menu').style.display = 'none'
  clearInterval(duration)
  doc('duration').innerText = `${playerData.time}sec`
}
for (let i = 0; i < svgContainer.children.length; i++) {
  (function(index) {
    svgContainer.children[index].addEventListener("click", (e) => {
      var x = svgContainer.children[index].getAttribute("cx").toString();
      var y = svgContainer.children[index].getAttribute("cy").toString();
      var id = svgContainer.children[index].getAttribute("id");
      if (currentPlayerId != "") {
        move(currentPlayerId, x, y);
        setPos(id);
        navigator.vibrate([100, 200])
      }
      isA = !isA;
      currentPlayerId = "";
      hideMarker();
      hideCtrl();
      winPos.forEach((e) => {
        if (checkEquality([...e], [...posA])) {
          displeyEndBox()
          doc('winner-name').innerText = `${playerData.playerName1}`
        }
      });

      winPos.forEach((e) => {
        if (checkEquality([...e], [...posB])) {
          displeyEndBox()
          doc('winner-name').innerText = `${playerData.playerName2}`
        }
      });

    });
  })(i);
}