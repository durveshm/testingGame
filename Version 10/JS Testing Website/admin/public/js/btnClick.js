
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

//hide original iframe, unnessecary for user to see
//origIframe.style.display = 'none';



function createIframe(req, res) {
    //add the iframes to the webpage onload
    document.body.appendChild(newIframe);
    document.body.appendChild(origIframe);
    upload.style.display = 'none';

}

//FOR APPROVING
function readyUpload() {
    document.getElementById('c').value = document.getElementById('code').innerHTML;
    document.getElementById('m').value = document.getElementById('mutation').innerHTML;
    document.getElementById('ec').value = document.getElementById('explaincode').innerHTML;
    document.getElementById('em').value = document.getElementById('explainmut').innerHTML;
    document.getElementById('s').value = document.getElementById('solution').innerHTML;
}

//FOR UPLOADING
function updateIframe() {
    newIframe.contentWindow.document.open('text/html', 'replace');
    newIframe.contentWindow.document.write('');
    newIframe.contentWindow.document.close();
    origIframe.contentWindow.document.open('text/html', 'replace');
    origIframe.contentWindow.document.write('');
    origIframe.contentWindow.document.close();
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
    let RS = '<script>' + document.getElementById('p1m').value;
    let ORS = '<script>' + document.getElementById('p1o').value;
    //remove line breaks
    RS = RS.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    ORS = ORS.replace(/(\r\n\t|\n|\r|\t)/gm,"");
    //use the user input as the test
    let CS = document.getElementById('codeInput').value;
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
        alert('You may now upload your scenario');
        upload.style.display = 'inline';
    }
    else {
        alert('Your Test Solution does not match your program code! Please Try Again.')
    }

}

//FOR UPLOADING - 2 MUTATIONS
function verifyIframe2(){
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
    if (iframeContent.includes('2 specs, 2 failures') && origiframeContent.includes('2 specs, 0 failures')){
        //alert to ensure the user the score has been updated
        alert('You may now upload your scenario');
        upload.style.display = 'inline';
    }
    else {
        alert('Your Test Solution does not match your program code! Please Try Again.')
    }

}

