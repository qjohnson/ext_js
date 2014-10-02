/*The helper object is designed to provide assistance to functionalities in main.js
 *Ideally, it will clean up the code in main.js and reduce clutter
 */
var helper = new Object();

helper.apiConnection = false;

//The following section provides alternative arrays for random person generation when third-party user generator api is down.
helper.genders = ["Male", "Female"];
helper.femaleFirsts = ["Veronika", "Norah", "Mikaela", "Martina", "Susan", "Delia", "Petra"];
helper.maleFirsts = ["Benjamin", "Luciano", "Franco", "Louis", "Charles", "Kim", "Quincy"];
helper.last = ["Lee", "Smirnov", "Smith", "Garcia", "Diaz", "Williams", "Cohen", "Takahashi", "Jones", "Esposito"];
helper.femaleImages = ["images/woman_1.jpg", "images/woman_2.jpg", "images/woman_3.jpg"];
helper.maleImages = ["images/man_1.jpg", "images/man_2.jpg", "images/man_3.jpg"];
helper.states = [
    "Alabama", 
    "Alaska", 
    "Arizona", 
    "Arkansas", 
    "California", 
    "Colorado", 
    "Connecticut", 
    "Delaware", 
    "District Of Columbia", 
    "Florida", 
    "Georgia", 
    "Hawaii", 
    "Idaho", 
    "Illinois", 
    "Indiana", 
    "Iowa", 
    "Kansas", 
    "Kentucky", 
    "Louisiana", 
    "Maine", 
    "Maryland", 
    "Massachusetts", 
    "Michigan", 
    "Minnesota", 
    "Mississippi", 
    "Missouri", 
    "Montana", 
    "Nebraska", 
    "Nevada", 
    "New Hampshire", 
    "New Jersey", 
    "New Mexico", 
    "New York", 
    "North Carolina", 
    "North Dakota", 
    "Ohio", 
    "Oklahoma", 
    "Oregon", 
    "Pennsylvania", 
    "Rhode Island", 
    "South Carolina", 
    "South Dakota", 
    "Tennessee", 
    "Texas", 
    "Utah", 
    "Vermont", 
    "Virginia", 
    "Washington", 
    "West Virginia", 
    "Wisconsin", 
    "Wyoming"
];
//End of random generation arrays

helper.greetings = ["Hello there!", "Greetings!", "Fantastic to see you!", "Good day!"];

//Given an array, return a random element
helper.getRandom = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

//Return a random greeting
helper.randomGreeting = function() {
    return this.getRandom(this.greetings);
};

//Generate a random person from values provided in arrays belonging to the helper object
helper.generatePerson = function() {
    var person = {};
    person.name = {};
    person.location = {};
    person.gender = this.getRandom(this.genders);
    if (person.gender === "Female"){
        person.name.first = this.getRandom(this.femaleFirsts);
        person.picture = this.getRandom(this.femaleImages);
    }
    else if (person.gender === "Male"){
        person.name.first = this.getRandom(this.maleFirsts);
        person.picture = this.getRandom(this.maleImages);
    }
    person.name.last = this.getRandom(this.last);
    person.location.state = this.getRandom(this.states);
    return person;
};

//Using JSONP capabilities in ExtJS, helper.getRandomPerson (via the help of a third party JSONP support program and randomuser.me)
//fetches a JSON file containing details for a random "party guest"
helper.getRandomPerson = function(callback) {
    Ext.data.JsonP.request({
        url: 'http://whateverorigin.org/get?url=http://api.randomuser.me',
        callbackKey: 'callback',
        callback: function (result, data) {
            if (result && data){
                this.apiConnection = true;
                callback(result, JSON.parse(data.contents).results[0].user);
            }
            else {
                this.apiConnection = false;
                callback(result, helper.generatePerson());
            }
        }
    });
};

helper.displayPersonWindow = function(person) {
    
    function capitalize(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    Ext.define('Post', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'post'},
       {name: 'desc'}
    ]   
    });
    
    var addr;
    if (this.apiConnection)
        addr = capitalize(person.location.street) + '\n' + capitalize(person.location.city) + ', ' + capitalize(person.location.state) + ' ' + person.location.zip;
    else
        addr = capitalize(person.location.state);
    
    var myData = [
        [
            'Name:',
            capitalize(person.name.first) + ' ' + capitalize(person.name.last)
        ],
        [
            'From:',
            addr        
        ]
    ];

    // create the data store
    var store = Ext.create('Ext.data.ArrayStore', {
        model: 'Post',
        data: myData
    });

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        stateful: true,
        collapsible: true,
        multiSelect: true,
        columns: [
            {
                text     : '',
                width    : 150,
                sortable : false,
                dataIndex: 'post'
            },
            {
                text     : 'Value',
                flex     : 1,
                sortable : false,
                dataIndex: 'desc'
            }
        ],
        height: 200,
        width: 380,
        border: false,
        title: '"' + this.randomGreeting() + '"',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        }
    });
    
    Ext.create('Ext.window.Window', {
        title: capitalize(person.name.first) + ' ' + capitalize(person.name.last),
        height: 400,
        width: 600,
        layout: 'hbox',
        items:
            [
                {
                    xtype: 'panel', 
                    width: 200,
                    height: 400,
                    html: '<img src="' + person.picture.medium + '"style="max-height:100%; max-width:100%;"/>',
                    border: false
                },
                {
                    xtype: 'panel',
                    border: false,
                    items: grid
                        
                }
            ]
    }).show();
};
    
