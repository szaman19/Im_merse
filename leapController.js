// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

var tutorialSection = true;
var movieList = false;
var movieMode = false;
// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

//Stop Tracking
function pauseTracker(){
  setTimeout(function(){
    //  console.log("valid input detected") ;
    paused = false;
  },500);
}

Leap.loop(controllerOptions, function(frame) {
  if (paused) {
    return; // Skip this update
  }

  var swipeRightCounter = 0;
  var swipeLeftCounter = 0;


//Swipe right function
  function swipeRight(state){
    if(frame.gestures.length > 0){
      for (var i = 0; i < frame.gestures.length; i++) {
          var gesture = frame.gestures[i];
          if(gesture.type === "swipe"){
            // console.log(vectorToString(gesture.direction,1));
            // console.log(gesture.direction[0]);
            if(gesture.direction[0] < -.7 && gesture.duration > 500) {
              swipeRightCounter = swipeRightCounter + 1;
            }
          }
        }
        if(swipeRightCounter > 6){
          swipeRightCounter = 0;
          if(state === "tsection"){
              console.log("User Swiped Right on tutorial");
              $('#myCarousel').carousel("next");
          }

          paused = true;
          pauseTracker();
          return true;
        }else{
          return false;
        }
    } else{
      return false;
    }
  }

  //Swipe left function
    function swipeLeft(state){
      if(frame.gestures.length > 0){

        for (var i = 0; i < frame.gestures.length; i++) {
            var gesture = frame.gestures[i];
            if(gesture.type === "swipe"){
              // console.log(vectorToString(gesture.direction,1));
              // console.log(gesture.direction[0]);
              if(gesture.direction[0] > -.7 && gesture.duration > 500) {
                swipeLeftCounter = swipeLeftCounter + 1;
              }
            }
          }
          if(swipeLeftCounter > 6){
            swipeLeftCounter = 0;
            paused = true;

            if(state === "tsection"){
                console.log("User Swiped Left on tutorial");

                $('#myCarousel').carousel("prev");
            }

            pauseTracker();
            return true;

          }else{
            return false;
          }
      }else{
        return false;
      }
    }

  //Screen Tap Fuction

  function screenTap(state){
    if(frame.gestures.length > 0){
      var tap = false;
      for(var i = 0; i < frame.gestures.length; i++){
        var gesture = frame.gestures[i];
        if(gesture.type ==="screenTap"){
          tap = true;
        }
      }

      paused = true;
      console.log("User tapped");
      pauseTracker();
      return tap;
    }else{
      return false;
    }

  }

// Open Palm Function

function openPalm(){
  var returnVar = false;
  if(frame.gestures.length ==0){
    if (frame.hands.length > 0) {
      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];

        if(hand.grabStrength < .2){
          returnVar = true;
        }
      }
    }
  }
  return returnVar;
}

// Closed Palm Function

function closedPalm(){
  var returnVar = false;
  if(frame.gestures.length ==0){
    if (frame.hands.length > 0) {
      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];

        if(hand.grabStrength > .8){
          returnVar = true;
        }
      }
    }
  }
  return returnVar;
}
  //Instructions for when the tutorial is going on
  if(tutorialSection){


    // var swipedRight = swipeRight();
    // var swipedLeft = swipeLeft();
    // var screenTapped = screenTap();
    //
    // if(swipedRight){
    //   console.log("user swiped right");
    //   swipedRight = false;
    // }else if (swipedLeft) {
    //   console.log("user swiped left");
    //   swipedLeft = false;
    // }


    swipeRight("tsection");
    swipeLeft("tsection");
    // screenTap();
  }
  // Display Frame object data
 //  var frameOutput = document.getElementById("frameData");
 //
 //  var frameString = "Frame ID: " + frame.id  + "<br />"
 //                  + "Timestamp: " + frame.timestamp + " &micro;s<br />"
 //                  + "Hands: " + frame.hands.length + "<br />"
 //                  + "Fingers: " + frame.fingers.length + "<br />"
 //                  + "Tools: " + frame.tools.length + "<br />"
 //                  + "Gestures: " + frame.gestures.length + "<br />";
 //
 //  // Frame motion factors
 //  if (previousFrame && previousFrame.valid) {
 //    var translation = frame.translation(previousFrame);
 //    frameString += "Translation: " + vectorToString(translation) + " mm <br />";
 //
 //    var rotationAxis = frame.rotationAxis(previousFrame);
 //    var rotationAngle = frame.rotationAngle(previousFrame);
 //    frameString += "Rotation axis: " + vectorToString(rotationAxis, 2) + "<br />";
 //    frameString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";
 //
 //    var scaleFactor = frame.scaleFactor(previousFrame);
 //    frameString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
 //  }
 //
 // try {
 //    frameOutput.innerHTML = "<div style='width:300px; float:left; padding:5px'>" + frameString + "</div>";
 // } catch (e) {
 //   console.log(e);
 // }


  // Display Hand object data
  // var handOutput = document.getElementById("handData");
  // var handString = "";
  // if (frame.hands.length > 0) {
  //   for (var i = 0; i < frame.hands.length; i++) {
  //     var hand = frame.hands[i];
  //
  //     handString += "<div style='width:300px; float:left; padding:5px'>";
  //     // handString += "Hand ID: " + hand.id + "<br />";
  //     // handString += "Type: " + hand.type + " hand" + "<br />";
  //     handString += "Direction: " + vectorToString(hand.direction, 2) + "<br />";
  //     handString += "Palm position: " + vectorToString(hand.palmPosition) + " mm<br />";
  //     handString += "Grab strength: " + hand.grabStrength + "<br />";
  //     handString += "Pinch strength: " + hand.pinchStrength + "<br />";
  //     handString += "Confidence: " + hand.confidence + "<br />";
  //     // handString += "Arm direction: " + vectorToString(hand.arm.direction()) + "<br />";
  //     // handString += "Arm center: " + vectorToString(hand.arm.center()) + "<br />";
  //     // handString += "Arm up vector: " + vectorToString(hand.arm.basis[1]) + "<br />";
  //
  //     // Hand motion factors
  //     if (previousFrame && previousFrame.valid) {
  //       var translation = hand.translation(previousFrame);
  //       handString += "Translation: " + vectorToString(translation) + " mm<br />";
  //
  //       var rotationAxis = hand.rotationAxis(previousFrame, 2);
  //       var rotationAngle = hand.rotationAngle(previousFrame);
  //       handString += "Rotation axis: " + vectorToString(rotationAxis) + "<br />";
  //       handString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";
  //
  //       var scaleFactor = hand.scaleFactor(previousFrame);
  //       handString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
  //     }
  //
  //     // IDs of pointables associated with this hand
  //     if (hand.pointables.length > 0) {
  //       var fingerIds = [];
  //       for (var j = 0; j < hand.pointables.length; j++) {
  //         var pointable = hand.pointables[j];
  //           fingerIds.push(pointable.id);
  //       }
  //       if (fingerIds.length > 0) {
  //         handString += "Fingers IDs: " + fingerIds.join(", ") + "<br />";
  //       }
  //     }
  //
  //     handString += "</div>";
  //   }
  // }
  // else {
  //   handString += "No hands";
  // }
  //
  //     handOutput.innerHTML = handString;
  //
  //
  //
  // Display Pointable (finger and tool) object data
  //  /



  // // Display Gesture object data
  // var gestureOutput = document.getElementById("gestureData");
  // var gestureString = "";
  // if (frame.gestures.length > 0) {
  //   if (pauseOnGesture) {
  //     togglePause();
  //   }
  //   for (var i = 0; i < frame.gestures.length; i++) {
  //     var gesture = frame.gestures[i];
  //     gestureString += "Gesture ID: " + gesture.id + ", "
  //                   + "type: " + gesture.type + ", "
  //                   + "state: " + gesture.state + ", "
  //                   + "hand IDs: " + gesture.handIds.join(", ") + ", "
  //                   + "pointable IDs: " + gesture.pointableIds.join(", ") + ", "
  //                   + "duration: " + gesture.duration + " &micro;s, ";
  //
  //     switch (gesture.type) {
  //       case "circle":
  //         gestureString += "center: " + vectorToString(gesture.center) + " mm, "
  //                       + "normal: " + vectorToString(gesture.normal, 2) + ", "
  //                       + "radius: " + gesture.radius.toFixed(1) + " mm, "
  //                       + "progress: " + gesture.progress.toFixed(2) + " rotations";
  //         break;
  //       case "swipe":
  //         gestureString += "start position: " + vectorToString(gesture.startPosition) + " mm, "
  //                       + "current position: " + vectorToString(gesture.position) + " mm, "
  //                       + "direction: " + vectorToString(gesture.direction, 1) + ", "
  //                       + "speed: " + gesture.speed.toFixed(1) + " mm/s";
  //         break;
  //       case "screenTap":
  //       case "keyTap":
  //         gestureString += "position: " + vectorToString(gesture.position) + " mm";
  //         break;
  //       default:
  //         gestureString += "unkown gesture type";
  //     }
  //     gestureString += "<br />";
  //   }
  // }
  // else {
  //   gestureString += "No gestures";
  // }


      // gestureOutput.innerHTML = gestureString;

// var counter = 0;
// var gestureOutput = document.getElementById("gestureData");
//
// var gestureString = "";
//
//   if(frame.gestures.length > 0){
//     frame.gestures.forEach(function(gesture){
//               if(gesture.type === "circle"){
//                 gestureString = "Circle Gesture detected";
//                 var li = document.createElement("li");
//                 li.appendChild(document.createTextNode(gestureString));
//                 gestureOutput.appendChild(li);
//               }
//     });
//   } else{
//     gestureString = "No Gesture Detected";
  // }

//           switch (gesture.type){
//             case "circle":
//                 counter = counter + 1;
//                 gestureString = counter.toString() + " Circle Gesture detected";
//                 li.appendChild(document.createTextNode(gestureString));
//                 gestureOutput.appendChild(li);
//                 console.log("Circle Gesture");
//                 break;
//             case "keyTap":
//                 counter = counter + 1;
//                 gestureString = counter.toString() + " Key Tap Gesture detected";
//                 li.appendChild(document.createTextNode(gestureString));
//                 gestureOutput.appendChild(li);
//                 console.log("Key Tap Gesture");
//                 break;
//             case "screenTap":
//                 counter = counter + 1;
//                 gestureString = counter.toString() + " Screen Tap Gesture detected";
//                 li.appendChild(document.createTextNode(gestureString));
//                 gestureOutput.appendChild(li);
//                 console.log("Screen Tap Gesture");
//                 break;
//             case "swipe":
//                 counter = counter + 1;
//                 gestureString = counter.toString() + " Swipe Gesture detected";
//                 var li = document.createElement("li");
//                 li.appendChild(document.createTextNode(gestureString));
//                 gestureOutput.appendChild(li);
//                 console.log("Swipe Gesture");
//                 break;
//           }
//       });
//     }

  // Store frame for motion functions
  previousFrame = frame;
})

function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function togglePause() {
  paused = !paused;

  if (paused) {
    document.getElementById("pause").innerText = "Resume";
  } else {
    document.getElementById("pause").innerText = "Pause";
  }
}

function pauseForGestures() {
  if (document.getElementById("pauseOnGesture").checked) {
    pauseOnGesture = true;
  } else {
    pauseOnGesture = false;
  }
}
