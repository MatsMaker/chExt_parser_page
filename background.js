var contextMenusId;

(function init(){
  chrome.browserAction.onClicked.addListener(function() {
    getPageHtml(hookParse);
  });

  // chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  //   if(msg.action == 'active'){
  //     chrome.browserAction.setIcon({path:"icon2.png"});
  //     // createContextMenu()
  //     // sendResponse(true);
  //   } else  if(msg.action == 'deactive'){
  //     chrome.browserAction.setIcon({path:"icon1.png"});
  //     // chrome.contextMenus.remove(contextMenusId, sendResponse);
  //   }
  // })
})();

function genericOnClick(info, tab) {
  getPageHtml(hookParse);
}

function getPageHtml(callback) {
  try {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendRequest(tab.id, {action: "getSource"}, function(source) {
        callback(null, source);
      });
    });
  }
  catch (ex) {
    callback(ex, null);
  }
}

// function createContextMenu() {
//   var contexts = ["page","selection","link","editable","image","video","audio"];
//   for (var i = 0; i < contexts.length; i++) {
//     var context = contexts[i];
//     var title = "Parse page";
//     if(contextMenusId){
//       chrome.contextMenus.update(contextMenusId, {checked: false})
//     }else{
//       contextMenusId = chrome.contextMenus.create({
//         "title": title,
//         "contexts":[context],
//         "checked": true,
//         "onclick": genericOnClick
//       });
//     }
//   }
// }

function hookParse(err, data) {
  if(err){
    console.error(err)
  }else{
    console.log('start parse page');
  }
}
