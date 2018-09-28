function startGame() {
    startTitle.innerHTML = "Create a test to kill the mutant!";
    codeError.innerHTML = "M1. Line 34 - return numRiders <= capacity;";
    document.getElementById('startButton').style.visibility = "hidden";
    document.getElementById('checkButton').style.visibility = "visible";
}
function checkTest() {
    var testBoxo = ("const sum = require('./app');" + <br> + document.getElementById('testCode').value);
	var testBox = new function (testBoxo);
	return testBox();
}


test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});