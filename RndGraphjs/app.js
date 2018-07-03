var selectedNodes = (function () {
    var state; // Private Variable
    var turns = 0;
    var nextlev = 1;
    var mydata;
    var current_level = 0;
    var n = 4;
    var m = 3;
    var pub = {};// public object - returned at end of module

    pub.getNodes = function () {
        return n;
    }

    pub.nodesplusplus = function () {
        n++;
    }

    pub.getEdges = function () {
        return m;
    }

    pub.nodesplusplus = function () {
        m++;
    }

    pub.setCurrentLevel = function (currentlevel) {
        current_level = currentlevel
        return current_level;

    }

    pub.getCurrentLevel = function () {
        return current_level;

    }

    pub.currentLevelplusplus = function () {
        return current_level++;

    }

    pub.setNextLevel = function (nextLevel) {
        nextlev = nextLevel;
    }

    pub.getNextLevel = function () {
        return nextlev;
    }

    pub.setData = function (data) {
        mydata = data;
    }

    pub.setOptions = function (options) {
        myoptions = options;
    }

    pub.setNetwork = function (network) {
        mynetwork = network;
    }

    pub.changeState = function (newstate) {
        state = newstate;
    };

    pub.resetTurn = function () {
        turns = 0;

    }

    pub.addTurn = function () {
        return turns++
    }



    pub.getState = function () {
        return state;
    }


    pub.getData = function () {
        return mydata;
    }

    pub.getOptions = function () {
        return myoptions;
    }

    pub.getNetwork = function () {
        return mynetwork;
    }
    pub.getTurn = function () {
        return turns;
    }
    return pub; // expose externally
}());

function growSelection(data, state) {

    var n = 0;

    for (n = 0; n <= data.nodes.length; n++) {
        if (n == state) {
            data.nodes.update({ id: n, group: "amis" });
        }

    }

}

class GraphGenerator {
    constructor(nb_nodes, nb_edges) {
        this.nb_nodes = nb_nodes;
        this.nb_edges = nb_edges;
    }

    get gen_nodes() {
        return this.complete_list_nodes();
    }

    get gen_rnd_edges() {
        return this.list_edges();
    }

    complete_list_edges() {
        var temp = [];
        var i;
        var j;
        for (i = 0; i < this.nb_nodes + 1; i++) {
            for (j = i + 1; j < this.nb_nodes + 1; j++) {
                temp.push({ from: i, to: j });
            }
        }
        var ls_edges = temp;
        return ls_edges;
    }

    complete_list_nodes() {
        var temp = [];
        var i;
        for (i = 0; i < this.nb_nodes + 1; i++) {
            temp.push({ id: i, label: 'Node ' + i, group: 'inconnus' });
        }
        return temp;
    }

    list_edges() {
        var temp = [];
        temp = this.complete_list_edges();
        shuffle(temp);
        var temp2 = [];
        var i;
        var n = 0;
        for (i = 0; i < this.nb_edges; i++) {
            var edgedata = temp[i];
            temp2.push({ from: edgedata.from, to: edgedata.to, id: n });
            n++;
        }
        console.log(temp2);
        return temp2;
    }
}
function addElement(newContent) {
    var currentDiv = document.getElementById("div1");
    currentDiv.replaceChild(newContent, currentDiv.childNodes[0]);
}

function startLevel() {
    selectedNodes.addTurn();

    console.log(selectedNodes.getTurn());
    var n = (selectedNodes.getNodes()) * (selectedNodes.getCurrentLevel() + 1);
    var m = (selectedNodes.getEdges()) * (selectedNodes.getCurrentLevel() + 1);
    var Graph = new GraphGenerator(n, m);
    var list_nodes = new vis.DataSet(options);
    list_nodes.add(Graph.gen_nodes);
    var list_edges = new vis.DataSet(options);
    list_edges.add(Graph.gen_rnd_edges);
    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: list_nodes,
        edges: list_edges
    };
    var options = {
        groups: {
            amis: { color: { background: 'red', highlight: 'red' }, borderWidth: 3 },
            inconnus: { color: { background: 'blue' }, borderWidth: 2 }

        }
    };
    var network = new vis.Network(container, data, options);

    selectedNodes.setData(data);
    selectedNodes.setOptions(options);

    // initialize your network!

    network.on("selectNode", function () {
        var selectedNode = network.getSelectedNodes();
        selectedNodes.changeState(selectedNode);
        var conti = document.getElementById("buttoncontinue");
        conti.value = "You have selected node " + selectedNode + ". Continue ?";
    });

}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}




function growFriends() {
    var data = selectedNodes.getData();

    console.log("GrowFoF");
    var m = 0;

    var listupdatenodes = [];

    for (m = 0; m < data.edges.length; m++) {
        var tempedge = data.edges.get(m);
        var tempnode = data.nodes.get(tempedge.from);


        if (tempnode.group == "amis") {
            listupdatenodes.push({ id: tempedge.to, group: "amis" });

        }
        tempnode = data.nodes.get(tempedge.to);


        if (tempnode.group == "amis") {
            listupdatenodes.push({ id: tempedge.from, group: "amis" });

        }
    }

    m = 0;
    for (m = 0; m < listupdatenodes.length; m++) {
        data.nodes.update(listupdatenodes[m]);

    }

}

function checkIfAllFriends(data) {
    var n;
    selectedNodes.setNextLevel(1);
    for (n = 0; n < data.nodes.length; n++) {
        var tempnode = data.nodes.get(n);

        if (tempnode.group == "inconnus") {
            selectedNodes.setNextLevel(0);
        }
    }

    return selectedNodes.getNextLevel();

}
