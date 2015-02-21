(function(){
    if(mashtotsConfig.isSaveSettings === 'true'){
        console.log(mashtotsConfig.isSavePages);
        localStorage.mashtotsIsSavePages = mashtotsConfig.isSavePages;
        localStorage.mashtotsIsOnlyFields = mashtotsConfig.isOnlyFields;
        localStorage.mashtotsAction = mashtotsConfig.action;
    }
    if(localStorage.mashtotsIsOnlyFields === 'ture'){
        console.log('aaa');
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
    console.log(localStorage.mashtotsIsSavePages);
    if(mashtotsConfig.isSaveSettings === 'true' || localStorage.mashtotsIsSavePages === 'true'){
        switch(localStorage.mashtotsAction) {
            case 'toMashtots':
                mashtots.sovietToMashtots(document.body, undefined, filters);
                break;
            case 'toSoviet':
                mashtots.mashtotsToSoviet(document.body, undefined, filters);
                break;
            case 'removeSavedData':
                localStorage.removeItem('mashtotsIsSavePages');
                localStorage.removeItem('mashtotsIsOnlyFields');
                localStorage.removeItem('mashtotsAction');
                break;
        }
    }
})();