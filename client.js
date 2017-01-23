(function init(){
  chrome.extension.onRequest.addListener(function(request, sender, callback) {
      if (request.action == "getSource") {
        parser(document.getElementsByTagName('html')[0].innerHTML, showResult);
      } else if (request.action == "getActiveHost") {
        callback({host: location.host});
      }
      callback({error: 'error'});
  });
})()

function showResult(err, result) {
  if(err){
    alert("Parse error");
    console.error(err);
  }else{
    window.prompt("Copy to clipboard: Ctrl+C, Enter", result);
  }
}

function parser(htmlPage, callback) {
  var err = null;
  /*...
  ...
  parsing...
  ...
  ...
  */
  callback(err, htmlPage);
}
