

function onClick() {
    console.log("onClick called");
    var theState = selectedNodes.getState();
    console.log(theState);
    var theData = selectedNodes.getData();

    if (checkIfAllFriends(theData)) {
        selectedNodes.currentLevelplusplus();
        var conti = document.getElementById("buttonnextlevel");
        selectedNodes.resetTurn();
        conti.value = "Go to level " + selectedNodes.getCurrentLevel();
        startLevel();
    }

}

function initApp() {

    selectedNodes.setNextLevel(1);
    var conti = document.getElementById("buttonnextlevel");
    // we can set either onclick or add an event listener
    conti.onclick = onClick;

    var conti = document.getElementById("buttoncontinue");
    // we can set either onclick or add an event listener
    conti.onclick = onClickcontinue;

}