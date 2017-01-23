var contextMenusId;

(function init(){

  chrome.browserAction.onClicked.addListener(function() {
    getPageHtml(hookParse);
  })
  chrome.tabs.onUpdated.addListener(function(){
    initPage();
  })
  chrome.tabs.onHighlighted.addListener(function(){
    initPage();
  })
  chrome.tabs.onActivated.addListener(function(){
    initPage();
  })

})();

function initPage() {
  chrome.contextMenus.removeAll(function(result) {
    chrome.browserAction.setIcon({path:"icon1.png"});
    contextMenusId = undefined;
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendRequest(tab.id, {action: "getActiveHost"}, function(result) {
        var toggleContextMenu = (result !== undefined && result.host == "www.upwork.com") ? "active" : "deactive";
        if(toggleContextMenu == 'active' && contextMenusId === undefined){
          chrome.browserAction.setIcon({path:"icon2.png"});
          initContextMenu();
        }
      });
    });
  })
}

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

function initContextMenu() {
  var contexts = ["page","selection","link","editable","image","video","audio"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Parse page";
    contextMenusId = chrome.contextMenus.create({
      "title": title,
      "contexts":[context],
      "checked": true,
      "onclick": genericOnClick
    });
  }
}

function hookParse(err, data) {
  if(err){
    console.error(err)
  }else{
    console.log('start parse page');
  }
}
