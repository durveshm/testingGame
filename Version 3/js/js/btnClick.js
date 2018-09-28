

let newIframe = document.createElement('iframe');

newIframe.width = '100%'; newIframe.height = '100%';

newIframe.src = 'about:blank';

//var User = require('../models/user');

function createIframe(req, res) {

    //var objTo = document.getElementById('runTest');
//objTo.appendChild(newIframe);

    document.body.appendChild(newIframe);


}

function refreshIframe() {

    alert('Checking');

    //var objTo = document.getElementById('runTest');
//objTo.appendChild(newIframe);



    let CSS = '<link rel="shortcut icon" type="image/png" href="/jasmine/jasmine_favicon.png">' + '<link rel="stylesheet" type="text/css" href="/jasmine/jasmine.css">' ;

    let JS = '<script type="text/javascript" src="/jasmine/jasmine.js"></script>' + '<script type="text/javascript" src="/jasmine/jasmine-html.js"></script>' + '<script type="text/javascript" src="/jasmine/boot.js"></script>';

    let RS = '<script>' + 'function getOpposite(bool) {' +  'return bool;}';

    let CS = document.getElementById('codeInput').value;

    document.getElementById('codeInput').value = CS;

    //document.getElementById("kek").value=RS;

    let myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + JS + RS  + CS + '</script></body></html>';





    newIframe.contentWindow.document.open('text/html', 'replace');
    newIframe.contentWindow.document.write(myContent);

    newIframe.contentWindow.document.close();

    window.scrollTo(0,document.body.scrollHeight);


}

function updatepts(req, res)
{

    document.getElementById('kek').innerHTML = req.user.points;


    User.updatePoints(points, function(err, user){
        if(err) throw err;
        console.log(user);
    });
}


