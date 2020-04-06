var curData = {usd: 145, eur: 292, rub: 298};

$.get("http://www.nbrb.by/API/ExRates/Rates/" + curData["usd"], {"periodicity": 0}, function (data, status, dataType) {
    console.log(data);
    curData["usd"] = data;
});
$.get("http://www.nbrb.by/API/ExRates/Rates/" + curData["eur"], {"periodicity": 0}, function (data, status, dataType) {
    console.log(data);
    curData["eur"] = data;
});
$.get("http://www.nbrb.by/API/ExRates/Rates/" + curData["rub"], {"periodicity": 0}, function (data, status, dataType) {
    console.log(data);
    curData["rub"] = data;
});

function toUsd(selection) {
    let match = selection.match(/\$\s*(\d+\.\d+)/);
    return parseFloat(match[1]);
}

function toEur(selection) {
    return selection;
}

function toRub(selection) {
    return selection;
}

function toByn(selection) {
    return selection;
}

var d = [
    {
        "id": "usdToBYN",
        "title": "Convert USD to BYN",
    }
];
// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "USDtoBYN",
        "title": "USD to BYN",
        "contexts": ["selection"]
    });
    chrome.contextMenus.create({
        "id": "EURtoBYN",
        "title": "EUR to BYN",
        "contexts": ["selection"]
    });
    chrome.contextMenus.create({
        "id": "RUBtoBYN",
        "title": "RUB to BYN",
        "contexts": ["selection"]
    });
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        let result;
        chrome.tabs.executeScript({
            code: "document.getSelection().toString()"
        }, selection => {
            switch (info.menuItemId) {
                case "sccContextMenu$":
                    result = toUsd(selection[0]);
                    break;
                case "sccContextMenu€":
                    result = toEur(selection[0]);
                    break;
                case "sccContextMenu₽":
                    result = toRub(selection[0]);
                    break;
                case "sccContextMenuBYN":
                    result = toByn(selection[0]);
                    break;
            }

            chrome.tabs.executeScript({
                code: 'alert("' + result + '")'
            });
        });
    });
});


