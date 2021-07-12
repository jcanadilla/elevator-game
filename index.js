module.exports = {
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        floors.forEach((floor) => {
            // Listen to button pressed
            floor.on("up_button_pressed", function() {
                // Maybe tell an elevator to go to this floor?
                console.log('FLOOR UP PRESSED?', this.level);
				elevator.destinationQueue.push(this.level);
				elevator.checkDestinationQueue();
            });
            floor.on("down_button_pressed", function() {
                // Maybe tell an elevator to go to this floor?
                console.log('FLOOR DOWN PRESSED?', this.level);
				elevator.destinationQueue.push(this.level);
				elevator.checkDestinationQueue();
            })
        })
       
        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {
            // let's go to all the floors (or did we forget one?)
            const currentFloor = elevator.currentFloor();
            console.log("CURRENT FLOOR: ", currentFloor);
            if (currentFloor === 0) {
                elevator.goingUpIndicator(true);
            } else if (floors.length - 1 === currentFloor) {
                elevator.goingDownIndicator(false);
            }

            console.log("DIRECTION: ", elevator.destinationDirection());

            const pressedFloors = elevator.getPressedFloors();
            console.log("PRESSED FLOORS: ", pressedFloors)

            // Get floors selected

            if (pressedFloors.length > 0) {
                pressedFloors.forEach((floor) => {
                    console.log("Go to floor: ", floor);
                    elevator.goToFloor(floor);
                });                
            }

        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    },
}
