
//Create the iframe variables outside of the function to avoid being created more than once button click after button click
//iframe for running test against mutated code
let newIframe = document.createElement('iframe');
newIframe.width = '50%'; newIframe.height = '100%';
newIframe.src = 'about:blank';
//iframe for running test against original code
let origIframe = document.createElement('iframe');
origIframe.width = '50%'; origIframe.height = '100%';
origIframe.src = 'about:blank';
let upload = document.getElementById('upload');
//store codes and mutation codes
var gameScores = document.getElementById('gs').innerHTML;
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

        //One script for mutated code, one for original code - access array values
        let RS = '<script>' + document.getElementById('mutation').innerHTML;
        let ORS = '<script>' + document.getElementById('code').innerHTML;
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

    document.getElementById('oid').value = document.getElementById('objectid').innerHTML;
    document.getElementById('m').value = document.getElementById('mutation').innerHTML;
    document.getElementById('c').value = document.getElementById('code').innerHTML;
    document.getElementById('s').value = editor.getValue();
    document.getElementById('t').value = document.getElementById('stype').innerHTML;

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

    //One script for mutated code, one for original code - access array values
    let RS = '<script>' + document.getElementById('mutation').innerHTML;
    let ORS = '<script>' + editor.getValue();
    //use the user input as the test
    //let CS = document.getElementById('codeInput').value;
    let CS = document.getElementById('solution').innerText;
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

    document.getElementById('oid').value = document.getElementById('objectid').innerHTML;
    document.getElementById('m').value = document.getElementById('mutation').innerHTML;
    document.getElementById('c').value = editor.getValue();
    document.getElementById('s').value = document.getElementById('solution').innerText;
    document.getElementById('t').value = document.getElementById('stype').innerHTML;

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

    document.getElementById('c').value = editor1.getValue();
    document.getElementById('m').value = editor2.getValue();
    document.getElementById('ec').value = editor3.getValue();
    document.getElementById('em').value = editor4.getValue();
    document.getElementById('s').value = editor.getValue();
}



