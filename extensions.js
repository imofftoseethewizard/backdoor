chrome.windows.getTabByUrl = function getTabByUrl(url, C) {
  chrome.windows.getAll({ populate: true }, function(windows) {
    var tabs = [];
    for (var i = 0; i < windows.length; i++)
      tabs = tabs.concat(windows[i].tabs);

    for (var i = 0; i < tabs.length; i++)
      if (tabs[i].url == url)
	return C(tabs[i]);

    C(null);
  });
}

chrome.windows.findOrCreateTab = function findOrCreateTab(url, C) {
  chrome.windows.getTabByUrl(url, function(tab) {
    if (tab == null)
      chrome.tabs.create({ url: url }, C);
    else
      C(tab);
  });
}

document.clickElement = function clickElement(elem) {
  if (document.createEvent) {
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window,
			 0, 0, 0, 0, 0,
			 false, false, false, false,
			 0, null);
    elem.dispatchEvent(event);
  }
  else if (elem.fireEvent) {
    elem.fireEvent("onclick");
  }
}

document.selectChoiceByValue = function selectChoiceByValue(select, value) {
  var options = select.children;
  for (var i = 0; i < options.length; i++)
    if (options[i].value == value) {
      select.selectedIndex = i;
      break;
    }
}



// Local Variables:
// mode: espresso
// c-basic-offset: 2
// indent-tabs-mode: nil
// fill-column: 78
// End:
