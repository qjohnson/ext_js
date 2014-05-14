/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function createNetBeansWin() {
    var win  = new Ext.create('Ext.Window', {
        id : 'myWindow',
        title : 'My first ExtJs Window with NetBeans',
        width : 300,
        height : 150,
        layout : 'fit'
    }); 
    win.show();
}
Ext.onReady(createNetBeansWin);
