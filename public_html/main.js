//main class constructor
function main() {
    var maxQueue = 20;
    var maxGuests = 25;
    var guestQueue = [];
    var guests = [];
    
    var doorbell = new Audio('sounds/doorbell-1.wav');
    var playSound = true;
        
    var newGuestButton = new Ext.create('Ext.Button', {
        text: 'No New Guest(s)!',
        height: '30px',
        scale: 'small',
        disabled: 'true',
        handler: function () {
            fetchGuest();
        }
    });
    
    var soundToggle = new Ext.create('Ext.Button', {
        icon: 'images/speaker_louder_32.png',
        height: '40px',
        width: '40px',
        scale: 'large',
        handler: function() {
            if (playSound)
            {
                soundToggle.setIcon('images/speaker_off_32.png');
                playSound = false;
            }
            else
            {
                soundToggle.setIcon('images/speaker_louder_32.png');
                playSound = true;
            }
        }
    });
    
    var queueGuest = function() {
        if (guestQueue.length <= maxQueue){
            helper.getRandomPerson(function (success, person){
                if (success){
                    guestQueue.push(person);
                }
                else {
                    guestQueue.push(person);
                }
                if (playSound){
                    doorbell.play();
                    setTimeout(function () { doorbell.load();}, 5000);
                }
                
                if (guestQueue.length === 1)
                {
                    //Enable the button
                    newGuestButton.enable();
                }
                //Update value displayed for event queue button
                newGuestButton.setText("New Guest(s)! (" + guestQueue.length + ")");
            });
        }
    };
    var fetchGuest = function() {
        if (guests.length <= maxGuests) {
            var guest = guestQueue.shift();
            guests.push(guest);
            helper.displayPersonWindow(guest);

            newGuestButton.setText("New Guest(s)! (" + guestQueue.length + ")");
            if (guestQueue.length === 0) 
            {
                newGuestButton.disable();
                newGuestButton.setText("No New Guest(s)!");
            }
        }
    };
    this.go = function() {
        var button = new Ext.create('Ext.Button', {
            text: 'It\'s Party Time!',
            scale: 'large',
            renderTo: Ext.getBody(),
            floating: true,
            shadow: 'drop',
            handler: function() {
                
                button.hide();
                
                new Ext.Viewport({
                    layout: "fit",           
                    items: [
                      {
                        layout: "border",
                        defaults: {
                          bodyStyle: 'padding:10px;'
                        },
                        bbar: new Ext.Toolbar({ 
                          //your Toolbar config options
                          height: '50px',
                          items: [newGuestButton, soundToggle]
                        })
                      }
                    ]
                });
                
                //Loops over setTimeout to have a new guest show up every 15-45 seconds
                function loop() {
                    var randInterval = Math.floor((Math.random() * 20000) + 10000);
                    setTimeout(function() {
                        queueGuest();
                        loop();  
                    }, randInterval);
                }
                loop();
            }
        });
        button.anchorTo(Ext.getBody(), "c", [-(button.getWidth()/2), -(button.getHeight()/2)]);
        button.show();
    };
}

var begin = new main();
begin.go();

