(function init(){
  chrome.extension.onRequest.addListener(function(request, sender, callback) {
      if (request.action == "getSource") {
        parser(document.getElementsByTagName('html')[0].innerHTML, showResult);
      }
  });

  // chrome.tabs.onActivated.addListener(function(){
  //   console.log('tt');
  //   var toggleContextMenu = (location.host == "www.upwork.com") ? "active" : "deactive";
  //   chrome.runtime.sendMessage({action: toggleContextMenu}, function(result){
  //     console.log('init parse upwork page', result);
  //   });
  // })
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
