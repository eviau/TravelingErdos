


function onClickcontinue() {
    console.log("onClick called");
    var theState = selectedNodes.getState();
    var conti = document.getElementById("buttoncontinue");
    if (selectedNodes.getCurrentLevel() == 0 && selectedNodes.getTurn()==0) {
        startLevel();
    }
    console.log("print random 2");

    if (selectedNodes.getTurn() > 0) {
        var theData = selectedNodes.getData();

        conti.value = "You have selected node " + theState + ". Continue ?";
        growSelection(theData, theState);
        growFriends();
        selectedNodes.addTurn();
        console.log("theturn " + selectedNodes.getTurn());

    }
}

