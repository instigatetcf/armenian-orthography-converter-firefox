var MashtotsMozilla = {
    _data: {},
    write: function(file, data, callback){
        Components.utils.import("resource://gre/modules/NetUtil.jsm");
        Components.utils.import("resource://gre/modules/FileUtils.jsm");

        let fd = FileUtils.getFile('ProfD', [file]);
        let ostream = FileUtils.openSafeFileOutputStream(fd);
        let converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].
                        createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
        converter.charset = "UTF-8";
        let istream = converter.convertToInputStream(data);
        NetUtil.asyncCopy(istream, ostream, function(status) {
            if (!Components.isSuccessCode(status)) {

            }
            callback && callback(Components.isSuccessCode(status));
        });
    },
    read: function(file, callback){
        Components.utils.import("resource://gre/modules/NetUtil.jsm");
        Components.utils.import("resource://gre/modules/FileUtils.jsm");

        let fd = FileUtils.getFile('ProfD', [file]);
        NetUtil.asyncFetch(fd, function(inputStream, status) {
            if (!Components.isSuccessCode(status)) {
                callback && callback(null);
                return;
            }
            var data = NetUtil.readInputStreamToString(inputStream, inputStream.available());
            callback && callback(data);
        });
    },
    injectScript: function(url){
        let script = content.document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        content.document.getElementsByTagName('head')[0].appendChild(script);
    },
    injectCode: function(code){
        let script = content.document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.textContent = code;
        content.document.getElementsByTagName('head')[0].appendChild(script);
    },
    onLoad: function() {
        // initialization code
        this.initialized = true;
        this.loadData();
    },
    loadData: function(){
        MashtotsMozilla.read('mashtots.json', function(data){
            try{
                MashtotsMozilla._data = JSON.parse(data);

                if(typeof(MashtotsMozilla._data.action) != 'undefined'){
                    document.getElementById('mashtots-action').value = MashtotsMozilla._data.action;
                }
                if(typeof(MashtotsMozilla._data.isOnlyFields) != 'undefined'){
                    document.getElementById('mashtots-is-only-fields').checked = MashtotsMozilla._data.isOnlyFields;
                }
                if(typeof(MashtotsMozilla._data.isSavePages) != 'undefined'){
                    document.getElementById('mashtots-is-save-pages').checked = MashtotsMozilla._data.isSavePages;
                }
            }catch(e){}
        });
    },
    saveData: function(){
        MashtotsMozilla._data.action = document.getElementById('mashtots-action').value;
        MashtotsMozilla._data.isOnlyFields = document.getElementById('mashtots-is-only-fields').checked;
        MashtotsMozilla._data.isSavePages = document.getElementById('mashtots-is-save-pages').checked;
        MashtotsMozilla.write('mashtots.json', JSON.stringify(MashtotsMozilla._data));
    },
    onConvert: function() {
        this.conver(true);
    },
    onMenuItemCommand: function() {
        window.open('chrome://mashtots/content/hello.xul', '', 'chrome');
    },
    onPageLoad: function(){
        this.conver(false);
    },
    conver: function(isSaveSettings){
        @@files

        let action = document.getElementById('mashtots-action').value;
        let isOnlyFields = document.getElementById('mashtots-is-only-fields').checked;
        let isSavePages = document.getElementById('mashtots-is-save-pages').checked;
        let code = 'mashtotsConfig = {};'+
        'mashtotsConfig.isSaveSettings = "' + isSaveSettings + '";'+
        'mashtotsConfig.action = "' + action + '";'+
        'mashtotsConfig.isOnlyFields = "' + isOnlyFields + '";'+
        'mashtotsConfig.isSavePages = "' + isSavePages + '";'+
        '';
        this.injectCode(code);

        this.saveData();
        /*
        MashtotsMozilla.write('mashtots.json', JSON.stringify({
            action: action,
            isOnlyFields: isOnlyFields,
            isSavePages: isSavePages
        }), function(isWrote){
            if(!isWrote){
                return;
            }
            MashtotsMozilla.read('mashtots.json', function(data){
                Firebug.Console.log(JSON.parse(data));
            });
        });
        */

        this.injectScript('chrome://mashtots/skin/inject/injection.js');
    }
};

window.addEventListener('load', function(e) { MashtotsMozilla.onLoad(e); }, false);
//MashtotsMozilla.onLoad();
gBrowser.addEventListener('load', function(e){
    let doc = e.originalTarget;
    if (doc instanceof HTMLDocument && doc.defaultView.frameElement == null) {
        MashtotsMozilla.onPageLoad(doc);
    }
}, true);
