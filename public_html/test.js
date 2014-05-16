/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Make the JsonP request

/*
Ext.data.JsonP.request({
    url: 'http://api.randomuser.me',
    callbackKey: 'jsonCallBack',
    callback: function (jsonData) {
		alert(jsonData);
    }
});
*/

/*
Ext.Ajax.request({
    url: 'http://api.randomuser.me/',
    success: function(response){
        alert("success");
    }
});
*/


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
