/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Make the JsonP request

Ext.data.JsonP.request({
    url: 'http://whateverorigin.org/get?url=http://api.randomuser.me',
    callbackKey: 'callback',
    callback: function (result, data) {
        var result = JSON.parse(data.contents).results[0].user;
        alert(result.phone)
    }
});

//document.write("<iframe id=\"apiFrame\" sandbox=\"allow-same-origin allow-scripts\" src=\"http://api.randomuser.me/\"></iframe>");

function createNetBeansWin() {
    var win  = new Ext.create('Ext.Window', {
        id : 'myWindow',
        title : 'My first ExtJs Window with NetBeans',
        width : 600,
        height : 300,
        layout : 'fit'
    }); 
    win.show();
}
Ext.onReady(createNetBeansWin);
