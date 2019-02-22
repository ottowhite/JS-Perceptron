const tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
var inputs = [];
var weight = [random(0.1, 0.3), random(0.1, 0.3)];
const bias = random(-0.15, -0.1);
//const bias = -0.4371683502738899;
var synapse = [0, 0];
var output = 1;
//-1 is false, 1 is true
var trainingData = [[0, 0, -1], 
                    [1, 0, -1], 
                    [1, 1, 1],
                    [0, 1, -1]];

var correct = [];
var target = [true, true, true, true];

var neuron = 0;

var generation = 0;

function random(min, max) {
    return Math.random() * (max-min) + min;
}

function sign(input) {
    if (input > 0) {
        return 1;
    } else if (input <= 0) {
        return -1;
    }
}

//executes code for the specified number of generations I BROKE IT IN HERE!!!!
function trainingLoop(trainingData, noGenerations) {
    /*
    for (var i = 0; i < noGenerations + 1; i++) {
        document.writeln("Generation: " + i + "<br>");
        dataLoop(trainingData);
        document.writeln("<br>");
        if (correct.toString() === target.toString())  {
            document.writeln("Learned");
        }
    }
    */
    
    while (correct.toString() !== target.toString()) {
        generation++;
        document.writeln("Generation: " + generation + "<br>");
        dataLoop(trainingData);
        document.writeln("<br>");
    }
}

//loops through all data and passes it to the forward regression in an acceptable format
function dataLoop(trainingData) {
    for (var i = 0; i < trainingData.length; i++) {
        inputs = [trainingData[i][0], trainingData[i][1]];
        desiredOutput = trainingData[i][2];
        
        if (forward(inputs, desiredOutput)) {
            correct[i] = true;
        } else {
            correct[i] = false;
        }
    }
}

//executes the ANN itself, executes rewire if not all outputs are correct
function forward(inputs, desiredOutput) {
    synapse[0] = inputs[0] * weight[0];
    synapse[1] = inputs[1] * weight[1];
    
    neuron = sign(synapse[0] + synapse[1] + bias);
    
    if (neuron === desiredOutput) {
        document.writeln(inputs[0] + tab + inputs[1] + tab + tab + neuron + tab + "Correct" + tab + bias + tab + weight[0] + tab + weight[1] + tab + synapse[0] + tab + synapse[1] + "<br>");
        return true;
    } else {
        document.writeln(inputs[0] + tab + inputs[1] + tab + tab + neuron + tab + "Incorrect" + tab + bias + tab + weight[0] + tab + weight[1] + tab + synapse[0] + tab + synapse[1] + "<br>");
        rewire(neuron, synapse, desiredOutput);
        return false;
    }
}

//edits weights
function rewire(neuron, synapse, desiredOutput) {
    //if the neuron value is too great
    if (neuron > desiredOutput) {
        //if the value of synapse 0 is greater than synapse 1
        if (synapse[0] > synapse[1]) {
            //halve the weight of synapse 0
            weight[0] = weight[0] * 0.87;
        //if the value of synapse 1 is greater than synapse 0
        } else {
            //halve the value of synapse 1
            weight[1] = weight[1] * 0.87;
        }
    
    //if the neuron value is too low
    } else {
        //if synapse 0 is greater than synapse 1
        if (synapse[0] > synapse[1]) {
            //double the weight of the larger synapse
            weight[0] = weight[0] * 1.13;
        //if synapse 1 is greater than synapse 0
        } else {
            weight[1] = weight[1] * 1.13;
        }
    }
}


document.writeln("Inputs" + tab + "Output" + tab + "Correct" + tab + "Bias" + tab + "Weights" + tab + tab + "Synapse values<br>");
trainingLoop(trainingData, 10);
