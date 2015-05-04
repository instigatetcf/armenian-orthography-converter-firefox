(function(){
    if(mashtotsConfig.isSaveSettings === 'true'){
        localStorage.mashtotsIsSavePages = mashtotsConfig.isSavePages;
        localStorage.mashtotsIsOnlyFields = mashtotsConfig.isOnlyFields;
        localStorage.mashtotsAction = mashtotsConfig.action;
    }
    if(localStorage.mashtotsIsOnlyFields === 'ture'){
        var filters = {
            'textarea':null,
            'input': {
                'type': ['text', 'search', 'url']
            },
            'div': {
                'contenteditable': 'true'
            },
            'iframe': {
                '$function': function(element){
                    try {
                        var doc = element.contentDocument || element.contentWindow.document;
                        var isDesignModeOn = doc.designMode == 'on';
                        var isContentEditable = doc.getElementsByTagName('body')[0].getAttribute('contenteditable') == 'true';
                        return isDesignModeOn || isContentEditable ? true : false;
                    }
                    catch(e){
                        return false;
                    }
                }
            }
        };
    }
    if(mashtotsConfig.isSaveSettings === 'true' || localStorage.mashtotsIsSavePages === 'true'){
        switch(localStorage.mashtotsAction) {
            case 'toMashtots':
                window.mashtots.sovietToMashtotsDom(document.body, undefined, filters);
                break;
            case 'toSoviet':
                window.mashtots.mashtotsToSovietDom(document.body, undefined, filters);
                break;
            case 'removeSavedData':
                localStorage.removeItem('mashtotsIsSavePages');
                localStorage.removeItem('mashtotsIsOnlyFields');
                localStorage.removeItem('mashtotsAction');
                break;
        }
    }
})();
