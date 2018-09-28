
//Create the iframe variables outside of the function to avoid being created more than once button click after button click
//iframe for running test against mutated code
let newIframe = document.createElement('iframe');
newIframe.width = '100%'; newIframe.height = '100%';
newIframe.src = 'about:blank';
//iframe for running test against original code
let origIframe = document.createElement('iframe');
origIframe.width = '100%'; origIframe.height = '100%';
origIframe.src = 'about:blank';
let upload = document.getElementById('upload');
//store codes and mutation codes
var codes = document.getElementsByClassName('sn');
var mutations = document.getElementsByClassName('sm');
var solutions = document.getElementsByClassName('ss');
//hide original iframe, unnessecary for user to see
//origIframe.style.display = 'none';



function createIframe(req, res) {
    //add the iframes to the webpage onload
    document.body.appendChild(newIframe);
    document.body.appendChild(origIframe);
    upload.style.display = 'none';

}
//FOR PLAYING -- TESTGAME
function refreshIframe() {
    //alert to assure the button click is working
    alert('Running');
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
    let RS = '<script>' + NS[0];
    let ORS = '<script>' + NS[1];

    //use the user input as the test
    //let CS = document.getElementById('codeInput').value;
    let CS = editor.getValue();
    //store page in a single variable
    let myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + JS + RS  + CS + '</script></body></html>';
    let origContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + JS + ORS  + CS + '</script></body></html>';
    //inject variable into iframe to create the test page
    newIframe.contentWindow.document.open('text/html', 'replace');
    newIframe.contentWindow.document.write(myContent);
    newIframe.contentWindow.document.close();
    origIframe.contentWindow.document.open('text/html', 'replace');
    origIframe.contentWindow.document.write(origContent);
    origIframe.contentWindow.document.close();

    document.getElementById('c').value = NS[1];
    document.getElementById('m').value = NS[0];
    document.getElementById('s').value = editor.getValue();

        //scroll to bottom of page so user can see the test result for convenience
        window.scrollTo(0,document.body.scrollHeight);

}

//FOR PLAYING --mutantgame
function refreshIframem() {
    //alert to assure the button click is working
    alert('Running');
    //assign variables to parts of the html page to be rendered - sandbox javascript using jasmine
    let CSS = '<link rel="shortcut icon" type="image/png" href="/public/jasmine/jasmine_favicon.png">' + '<link rel="stylesheet" type="text/css" href="/public/jasmine/jasmine.css">' ;
    let JS = '<script type="text/javascript" src="/public/jasmine/jasmine.js"></script>' + '<script type="text/javascript" src="/public/jasmine/jasmine-html.js"></script>' + '<script type="text/javascript" src="/public/jasmine/boot.js"></script>';
    //store the current location in a variable
    var path = window.location.href;
    //take the last two characters to indicate the current user scenario in progress e.g. B 3
    var loc = path.slice(-2);
    //One script for mutated code, one for original code - access array values
    let RS = '<script>' + editor.getValue();
    //use the user input as the test
    //let CS = document.getElementById('codeInput').value;
    let CS = checkScenariom(loc);
    //store page in a single variable
    let myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + JS + RS  + CS + '</script></body></html>';
    //inject variable into iframe to create the test page
    newIframe.contentWindow.document.open('text/html', 'replace');
    newIframe.contentWindow.document.write(myContent);
    newIframe.contentWindow.document.close();
    //scroll to bottom of page so user can see the test result for convenience
    window.scrollTo(0,document.body.scrollHeight);
}

//FOR UPLOADING
function updateIframe() {
    //alert to assure the button click is working
    alert('Running');
    //assign variables to parts of the html page to be rendered - sandbox javascript using jasmine
    let CSS = '<link rel="shortcut icon" type="image/png" href="/public/jasmine/jasmine_favicon.png">' + '<link rel="stylesheet" type="text/css" href="/public/jasmine/jasmine.css">' ;
    let JS = '<script type="text/javascript" src="/public/jasmine/jasmine.js"></script>' + '<script type="text/javascript" src="/public/jasmine/jasmine-html.js"></script>' + '<script type="text/javascript" src="/public/jasmine/boot.js"></script>';
    //store the current location in a variable
    var path = window.location.href;
    //take the last two characters to indicate the current user scenario in progress e.g. B 3
    var loc = path.slice(-2);
    // store function result in an array variable because returning two values

    let RS = '<script>' + editor2.getValue();
    let ORS = '<script>' + editor1.getValue();
    //remove line breaks
    RS = RS.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    ORS = ORS.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    //use the user input as the test
    let CS = editor.getValue();
    //store page in a single variable
    let myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + JS + RS  + CS + '</script></body></html>';
    let origContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + JS + ORS  + CS + '</script></body></html>';
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

//FOR PLAYING THE GAME -- testgame
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
        alert('Score has been Updated');
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

//FOR PLAYING THE GAME - 2 tests -- testgame
function checkIframe1(){
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
    if (iframeContent.includes('2 specs, 2 failures') && origiframeContent.includes('2 specs, 0 failures')){
        //alert to ensure the user the score has been updated
        alert('Score has been Updated');
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

//FOR PLAYING THE GAME -- mutantgame
function checkIframem(){
    //use variables to access the iframe contents
    //mutated code must fail + original code must pass for success
    // MUST test against both versions to ensure the mutant causes the failure
    var iframeDocument = newIframe.contentDocument || newIframe.contentWindow.document;
    //Check both iframes content exists
    if (!iframeDocument ) {
        alert("Please Click Run Test before Saving!");
    }
    //store the content of the jasmine-alert bar which contains the result of the test
    //Must use [0] to grab the element as a string
    var iframeContent = iframeDocument.getElementsByClassName('jasmine-alert')[0].innerHTML;
    //double check iframes content is empty
    if (!iframeContent){
        alert('Please Click Run Test before Saving!');
    }
    //Mutation Fail + Original Pass = Success & Update Points
    //Cannot be tampered with as content is within an iframe + original iframe is hidden
    if (iframeContent.includes('1 spec, 0 failures')){
        //alert to ensure the user the score has been updated
        alert('Score has been Updated');
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

//FOR UPLOADING
function verifyIframe(){
    //use variables to access the iframe contents
    //mutated code must fail + original code must pass for success
    // MUST test against both versions to ensure the mutant causes the failure
    var iframeDocument = newIframe.contentDocument || newIframe.contentWindow.document;
    var origiframeDocument = origIframe.contentDocument || origIframe.contentWindow.document;
    //Check both iframes content exists
    if (!iframeDocument || !origiframeDocument) {
        alert("Please Click Run Test before Verifying!");
    }
    //store the content of the jasmine-alert bar which contains the result of the test
    //Must use [0] to grab the element as a string
    var iframeContent = iframeDocument.getElementsByClassName('jasmine-alert')[0].innerHTML;
    var origiframeContent = origiframeDocument.getElementsByClassName('jasmine-alert')[0].innerHTML;
    //double check iframes content is empty
    if (!iframeContent || !origiframeContent){
        alert('Please Click Run Test before Verifying!');
    }
    //Mutation Fail + Original Pass = Success & Update Points
    //Cannot be tampered with as content is within an iframe + original iframe is hidden
    if (iframeContent.includes('1 spec, 1 failure') && origiframeContent.includes('1 spec, 0 failures')){
        //alert to ensure the user the score has been updated
        document.getElementById('c').value = editor1.getValue();
        document.getElementById('m').value = editor2.getValue();
        document.getElementById('ec').value = editor3.getValue();
        document.getElementById('em').value = editor4.getValue();
        document.getElementById('s').value = editor.getValue();
        alert('You may now upload your scenario');
        upload.style.display = 'inline';
    }
    else {
        alert('Your Test Solution does not match your program code! Please Try Again.')
    }

}

function checkScenario(loc)
{
    //SCENARIO A
    //let RSA0 = '<script>' + 'function getOpposite(bool) {' +  'return bool;}';
    //let ORSA0 = '<script>' + 'function getOpposite(bool) {' +  'return !bool;}';
    var i;
    var RSA;
    var ORSA;


    if (loc.includes('A') || loc.includes('C') || loc.includes('D')){
        i = 0;
    }
    else if (loc.includes('B')){
        i = 5;
    }
    let add = i + Number(loc.slice(-1));

    RSA = mutations[add].innerText;
    ORSA = codes[add].innerText;
    return [RSA, ORSA];
}

function checkScenariom(loc)
{
    var i;
    var C;


    if (loc.includes('E') || loc.includes('G')){
        i = 0;
    }
    else if (loc.includes('F')){
        i = 5;
    }
    let add = i + Number(loc.slice(-1));

    C =  solutions[add].innerText;
    return [C];
}

function checkScore()
{
    var i;
    var a;
    var d;
    for (i = 0; i < 7; i++) {
        var b = 's' + i;
        if (b !== 's1' || b !== 's5') {
            c = document.getElementById(b).innerHTML;
            var sA = addPoints(c);
            if (b === 's0'){
                d = document.getElementById('s1').innerHTML;
                var sB = addPoints(d);
                var sT = sA + sB;
                document.getElementById(b).innerHTML = 'Your Current Score: ' + sT + '/10';
            }
            else if (b === 's4'){
                d = document.getElementById('s5').innerHTML;
                var sB = addPoints(d);
                var sT = sA + sB;
                document.getElementById(b).innerHTML = 'Your Current Score: ' + sT + '/10';
            }
            else{
                document.getElementById(b).innerHTML = 'Your Current Score: ' + sA + '/5';
            }

        }
    }

}

function tcheckScore()
{
    var i;
    var a;
    for (i = 0; i < 2; i++) {
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

