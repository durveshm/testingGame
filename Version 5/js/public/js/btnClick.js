
//Create the iframe variables outside of the function to avoid being created more than once button click after button click
//iframe for running test against mutated code
let newIframe = document.createElement('iframe');
newIframe.width = '100%'; newIframe.height = '100%';
newIframe.src = 'about:blank';
//iframe for running test against original code
let origIframe = document.createElement('iframe');
origIframe.width = '100%'; origIframe.height = '100%';
origIframe.src = 'about:blank';
//hide original iframe, unnessecary for user to see
origIframe.style.display = 'none';



function createIframe(req, res) {
    //add the iframes to the webpage onload
    document.body.appendChild(newIframe);
    document.body.appendChild(origIframe);

}

function refreshIframe() {
    //alert to assure the button click is working
    alert('Checking');
    //assign variables to parts of the html page to be rendered - sandbox javascript using jasmine
    let CSS = '<link rel="shortcut icon" type="image/png" href="/public/jasmine/jasmine_favicon.png">' + '<link rel="stylesheet" type="text/css" href="/public/jasmine/jasmine.css">' ;
    let JS = '<script type="text/javascript" src="/public/jasmine/jasmine.js"></script>' + '<script type="text/javascript" src="/public/jasmine/jasmine-html.js"></script>' + '<script type="text/javascript" src="/public/jasmine/boot.js"></script>';
    //store the current location in a variable
    var path = window.location.href;
    //take the last two characters to indicate the current user scenario in progress e.g. B 3
    var loc = path.slice(-2);
    // store function result in an array variable because returning two values
    let NS = checkScenario(loc);
    //One script for mutated code, one for original code - access array values
    let RS = NS[0];
    let ORS = NS[1];

    //let RS = '<script>' + 'function getOpposite(bool) {' +  'return bool;}';
    //let ORS = '<script>' + 'function getOpposite(bool) {' +  'return !bool;}';
    //use the user input as the test
    let CS = document.getElementById('codeInput').value;
    //store page in a single variable
    let myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + JS + RS  + CS + '</script></body></html>';
    let origContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + JS + ORS  + CS + '</script></body></html>';
    alert(myContent);
    //inject variable into iframe to create the test page
    newIframe.contentWindow.document.open('text/html', 'replace');
    newIframe.contentWindow.document.write(myContent);
    newIframe.contentWindow.document.close();
    origIframe.contentWindow.document.open('text/html', 'replace');
    origIframe.contentWindow.document.write(origContent);
    origIframe.contentWindow.document.close();
    //scroll to bottom of page so user can see the test result for convenience
    window.scrollTo(0,document.body.scrollHeight);
}

function checkIframe(){
    //use variables to access the iframe contents
    //mutated code must fail + original code must pass for success
    // MUST test against both versions to ensure the mutant causes the failure
    var iframeDocument = newIframe.contentDocument || newIframe.contentWindow.document;
    var origiframeDocument = origIframe.contentDocument || origIframe.contentWindow.document;
    //Check both iframes content exists
    if (!iframeDocument || !origiframeDocument) {
        alert("Please Click Run Test before Saving!");
    }
    //store the content of the jasmine-alert bar which contains the result of the test
    //Must use [0] to grab the element as a string
    var iframeContent = iframeDocument.getElementsByClassName('jasmine-alert')[0].innerHTML;
    var origiframeContent = origiframeDocument.getElementsByClassName('jasmine-alert')[0].innerHTML;
    //double check iframes content is empty
    if (!iframeContent || !origiframeContent){
        alert('Please Click Run Test before Saving!');
    }
    //Mutation Fail + Original Pass = Success & Update Points
    //Cannot be tampered with as content is within an iframe + original iframe is hidden
    if (iframeContent.includes('1 spec, 1 failure') && origiframeContent.includes('1 spec, 0 failures')){
        //alert to ensure the user the score has been updated
        alert('Updating Score');
        //store the current location in a variable
        var path = window.location.href;
        //take the last two characters to indicate the current user scenario in progress e.g. B 3
        var last2 = path.slice(-2);
        //use it to determine which save game location it should redirect to
        var loc = '/saves/saveGame' + last2;
        //redirect to save game
        window.location=(loc);
    }

}


function checkScenario(loc)
{
    //SCENARIO A
    let RSA0 = '<script>' + 'function getOpposite(bool) {' +  'return bool;}';
    let ORSA0 = '<script>' + 'function getOpposite(bool) {' +  'return !bool;}';

    let RSA1 = '<script>' + 'function getArea(side1, side2, side3){' + 'var perimeter = (side1 + side2 - side3)/2;' + 'var area = Math.sqrt(perimeter*((perimeter-side1)*(perimeter-side2)*(perimeter-side3)));' + 'return area;}';
    let ORSA1 = '<script>' + 'function getArea(side1, side2, side3){' + 'var perimeter = (side1 + side2 + side3)/2;' + 'var area = Math.sqrt(perimeter*((perimeter-side1)*(perimeter-side2)*(perimeter-side3)));' + 'return area;}';

    let RSA2 = '<script>' + 'function checkSunday (year) {' + 'for (var y = 2014; y <= 2050; y++){' + 'var d = new Date(y, 0, 1);' + 'if ( d.getDay() === 0 ){' + 'return ("1st January is being a Sunday  "+year);}}}';
    let ORSA2 = '<script>' + 'function checkSunday (year) {' + 'for (var y = year; y <= 2050; y++){' + 'var d = new Date(y, 0, 1);' + 'if ( d.getDay() === 0 ){' + 'return ("1st January is being a Sunday  "+year);}}}';

    let RSA3 = '<script>' +  'function guessNumber(gnum){' + 'var num = Math.ceil(Math.random() * 10);' + 'if (gnum == num) {' + 'return ("Matched");}' + 'return ("Not matched, the number was " + num);}';
    let ORSA3 = '<script>' +  'function guessNumber(gnum){' + 'var num = Math.ceil(Math.random() * 10);' + 'if (gnum == num) {' + 'return ("Matched");}' + 'else {' + 'return ("Not matched, the number was " + num);}}';

    let RSA4 = '<script>' + 'function setVariable(varName){' + 'var n = "120";' + 'this[varName] = n;' + 'return (this[varName])}';
    let ORSA4 = '<script>' + 'function setVariable(varName){' + 'var n = 120;' + 'this[varName] = n;' + 'return (this[varName])}';

    //SCENARIO B
    let RSB0 = '<script>' + 'function test50(x, y){' + 'if ((x != 50 || y == 50) || (x + y == 50)){' + 'return ("Success");}}';
    let ORSB0 = '<script>' + 'function test50(x, y){' + 'if ((x == 50 || y == 50) || (x + y == 50)){' + 'return ("Success");}}';

    let RSB1 = '<script>' + 'function start_spec_str(str){' + 'if (str.length < 4){' + 'return false;}' + 'front = str.substring(0, 4);' + 'if (front == "Java"){' + 'return true;}}';
    let ORSB1 = '<script>' + 'function start_spec_str(str){' + 'if (str.length < 4){' + 'return false;}' + 'front = str.substring(0, 4);' + 'if (front == "Java"){' + 'return true;}' + 'else{' + 'return false;}}';

    let RSB2 = '<script>' + 'function capital_letter(str){' + 'str = str.split(" ");' + 'for (var i = 0, x = str.length; i > x; i++){' + 'str[i] = str[i][0].toUpperCase() + str[i].substr(1);}' + 'return str.join(" ");}';
    let ORSB2 = '<script>' + 'function capital_letter(str){' + 'str = str.split(" ");' + 'for (var i = 0, x = str.length; i < x; i++){' + 'str[i] = str[i][0].toUpperCase() + str[i].substr(1);}' + 'return str.join(" ");}';

    let RSB3 = '<script>' + 'function first_half (str){' + 'if (str.length % 2 == 0){' + 'return str.slice(0, str.length);}' + 'return str;}';
    let ORSB3 = '<script>' + 'function first_half (str){' + 'if (str.length % 2 == 0){' + 'return str.slice(0, str.length / 2);}' + 'return str;}';

    let RSB4 = '<script>' + 'function sumn(val){' + 'var sn = 0;' + 'var i = 0;' + 'while (sn <= val){' + 'sn = i++;}' + 'return i - 2;}';
    let ORSB4 = '<script>' + 'function sumn(val){' + 'var sn = 0;' + 'var i = 0;' + 'while (sn <= val){' + 'sn += i++;}' + 'return i - 2;}';

    //CHECK SCENARIO LETTER AND NUMBER - RETURN CORRECT VARIABLES
    if (loc.includes('A')){
        if (loc.includes('0')){
            return [RSA0, ORSA0];
        }
        if (loc.includes('1')){
            return [RSA1, ORSA1];
        }
        if (loc.includes('2')){
            return [RSA2, ORSA2];
        }
        if (loc.includes('3')){
            return [RSA3, ORSA3];
        }
        if (loc.includes('4')){
            return [RSA4, ORSA4];
        }
    }
    else if (loc.includes('B')){
        if (loc.includes('0')){
            return [RSB0, ORSB0];
        }
        if (loc.includes('1')){
            return [RSB1, ORSB1];
        }
        if (loc.includes('2')){
            return [RSB2, ORSB2];
        }
        if (loc.includes('3')){
            return [RSB3, ORSB3];
        }
        if (loc.includes('4')){
            return [RSB4, ORSB4];
        }
    }
}

function checkScore()
{
    var i;
    var a;
    for (i = 0; i < 10; i++) {
        var b = 's' + i;
        c = document.getElementById(b).innerHTML;
        var sA = addPoints(c);
        document.getElementById(b).innerHTML = 'Your Current Score: ' + sA + '/5';
    }

}

function addPoints(s){
    var s1 = Number(s[0]);
    var s2 = Number(s[2]);
    var s3 = Number(s[4]);
    var s4 = Number(s[6]);
    var s5 = Number(s[8]);
    var sF = s1 + s2 + s3 + s4 + s5;
    return sF;
}
