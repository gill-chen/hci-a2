/***************************************************
* CSC428/2514 - St. George, Winter 2020
*
* File: watch.js
* Summary: Watch Component
*
* The code is commented, and the comments provide information
* about what each js file is doing.
*
****************************************************/

/**
 * Libraries
 */
import React from 'react';
import './index.css';
import TextArea from './textarea'
import KeyboardNormal from './keyboard.normal'
import KeyboardZoom from './keyboard.wip'
import WatchImage from './asset/apple-watch-cropped.jpg'
import { text } from './phrases3.txt'; 


/**
 * Functions
 */

/**
 * @Deprecated.
 * Calculate watch size (width and height) in pixels.
 * 	if you decide to use exact AppleWatch size, use this function to get width and height.
 * @param: ppi , your device independent pixel per inch. Can be acheived from the web.
 * @param: watchSize, default apple watch size, 38mm or 42mm.
 * 			other size value will be return zero in size.
 */
const deviceIndependenceSize = (ppi,watchSize) => {
	var width,height,deviceWidthInPixel,deviceHeightInPixel;
	if(watchSize === 42){
		// AppleWatch Series 3 + size 42mm has a resolution of 312x390 px, 302 ppi
		//	DeviceSize: {Width:33.3, Height: 38.6mm}
		//	ScreenSize: {Width: 26mm , Height: 33mm}
		width = 26; height = 33;
		deviceWidthInPixel = width/25.4*ppi;
		deviceHeightInPixel = height/25.4*ppi;
		return {width: deviceWidthInPixel, height:deviceHeightInPixel};
	}else if(watchSize === 38){
		// AppleWatch Series 3 + size 38mm has a resolution of 272x340 px, 290 ppi
		// 	DeviceSize: {Width: 33.3mm, Height:42.5mm}
		//	ScreenSize: {Width: 24mm, Height: 30mm}
		width = 24; height = 30;
		deviceWidthInPixel = width/25.4*ppi;
		deviceHeightInPixel = height/25.4*ppi;
		return {width: deviceWidthInPixel, height:deviceHeightInPixel};
	}else{
		return {width:0, height:0}
	}
}

/**
 * Download user typed content and target phrases
 * you can and should add more measurements
 * that you recorded in your study into the text parameter
 * so that you can save them into a file
 * @param {*} text:
 * @param {*} name:
 * @param {*} type:
 */
function download(text, name, type) {
	// console.log(JSON.parse(text));
	var a = document.createElement("a");
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}	

// functions to shuffle array randomly (but using seed for easy reproduction - each seed will represent a participant)
function shuffle(array, seed) {                // <-- ADDED ARGUMENT
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(random(seed) * m--);        // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed                                     // <-- ADDED LINE
  }

  return array;
}

function random(seed) {
  var x = Math.sin(seed++) * 10000; 
  return x - Math.floor(x);
}

// var tf = require('fs');

// fs.readFile(text, function(err, data) {
//     if(err) throw err;
//     var array = data.toString().split("\n");
// 	for (var index = 0; index < array.length; ++index) {
// 	    console.log(array[index]);
// 	}
// });

// function shuffleArray(array) {

//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
//     return array; 
// }


const styles = {
    container: {
        backgroundImage: `url(${WatchImage})`, 
    }
};


/**
 * Watch Class
 * This class extends React.Component
 */
class Watch extends React.Component {

	/**
	 * Constructor
	 * @param {} props: a paramater which enables you to access
	 * 			values passed from parent Componenet(or Node).
	 * 			e.g., if you pass 'value' as 5 in Watch component
	 * 				<Watch value={5}/>
	 * 				you can access by calling 'this.props.value'
	 * 				props are immutable.
	 */
	constructor(props){
		super(props);

		//Your URL parameter can be accessed with following syntax.
		console.log(this.props.type);
		console.log(this.props.type===undefined);
		this.type = (this.props.type === undefined) ? this.props.match.params.type : this.props.type;
		this.originalScale = (this.props.originalScale === undefined)?this.props.match.params.scaleVal : this.props.originalScale;
		this.participant = (this.props.participant === undefined) ? this.props.match.params.participant : this.props.participant;
		this.index = (this.props.index === undefined) ? this.props.match.params.index : this.props.index;


		this.phrases2 = ["a feeling of complete exasperation", "an excellent way to communicate", "can we play cards tonight", "four times is a charm", "it is difficult to concentrate"]; 

		this.phrases = ["a feeling of complete exasperation", "a little encouragement is needed", "a problem with the engine", "a psychiatrist will help you", "a quarter of a century", "all good boys deserve fudge", "all work and no play", "an excellent way to communicate", "are you talking to me", "be discreet about your meeting", "be discreet about your meeting","but the levee was dry", "can we play cards tonight", "completely sold out of that", "consequences of a wrong turn", "destruction of the rain forest", "do not drink too much","do not walk too quickly", "double double toil and trouble", "elections bring out the best", "every apple from every tree", "exceed the maximum speed limit", "express delivery is very fast","faster than a speeding bullet", "file all complaints in writing", "flashing red light means stop", "get rid of that immediately", "goldilocks and the three bears", "great disturbance in the force","he was wearing a sweatshirt", "her majesty visited our country", "house with new electrical panel", "I skimmed through your proposal", "it is difficult to concentrate", "just what the doctor ordered","lie detector tests never work", "limited warranty of two years", "longer than a football field", "mom made her a turtleneck", "movie about a nutty professor", "my bank account is overdrawn","my mother makes good cookies", "nothing wrong with his style", "obligations must be met first", "our silver anniversary is coming", "peering through a small hole", "physics and chemistry are hard","prayer in schools offends some", "public transit is much faster", "quick there is someone knocking", "rapidly running short on words", "sent this by registered mail","spill coffee on the carpet", "the algorithm is too complicated", "the coronation was very exciting", "the food at this restaurant", "the generation gap gets wider", "the insulation is not working","the laser printer is jammed", "the objective of the exercise", "the registration period is over", "the treasury department is broke", "there are winners and losers", "these cookies are so amazing","these cookies are so amazing", "this mission statement is baloney", "this phenomenon will never occur", "traveling to conferences is fun", "we must redouble our efforts", "you are a wonderful example","you must make an appointment", "your etiquette needs some work"]; 
		
		// this.phrases2 = ["a feeling of complete exasperation", "a little encouragement is needed", "a problem with the engine", "a psychiatrist will help you", "a quarter of a century",...
		// "all good boys deserve fudge", "all work and no play", "an excellent way to communicate", "are you talking to me", "be discreet about your meeting", "be discreet about your meeting",...
		// "but the levee was dry", "can we play cards tonight", "completely sold out of that", "consequences of a wrong turn", "destruction of the rain forest", "do not drink too much",...
		// "do not walk too quickly", "double double toil and trouble", "elections bring out the best", "every apple from every tree", "exceed the maximum speed limit", "express delivery is very fast",...
		// "faster than a speeding bullet", "file all complaints in writing", "flashing red light means stop", "get rid of that immediately", "goldilocks and the three bears", "great disturbance in the force",...
		// "he was wearing a sweatshirt", "her majesty visited our country", "house with new electrical panel", "I skimmed through your proposal", "it is difficult to concentrate", "just what the doctor ordered",...
		// "lie detector tests never work", "limited warranty of two years", "longer than a football field", "mom made her a turtleneck", "movie about a nutty professor", "my bank account is overdrawn",...
		// "my mother makes good cookies", "nothing wrong with his style", "obligations must be met first", "our silver anniversary is coming", "peering through a small hole", "physics and chemistry are hard",...
		// "prayer in schools offends some", "public transit is much faster", "quick there is someone knocking", "rapidly running short on words", "sent this by registered mail",...
		// "spill coffee on the carpet", "the algorithm is too complicated", "the coronation was very exciting", "the food at this restaurant", "the generation gap gets wider", "the insulation is not working",...
		// "the laser printer is jammed", "the objective of the exercise", "the registration period is over", "the treasury department is broke", "there are winners and losers", "these cookies are so amazing",...
		// "these cookies are so amazing", "this mission statement is baloney", "this phenomenon will never occur", "traveling to conferences is fun", "we must redouble our efforts", "you are a wonderful example",...
		// "you must make an appointment", "your etiquette needs some work"]; 

		// var fs = require("fs");
		// fs.readFile("./phrases3.txt", function(text){
		//     var textByLine = text.split("\n")
		// });


		// this function will sort the array in random order

		this.phrases = shuffle(this.phrases, this.participant); 

		console.log(this.phrases);
		//this.type = this.props.match.params.type;
		//this.originalScale = this.props.match.params.scaleVal;
		console.log("[Watch] type: "+this.type);
		console.log("[Watch] originalScale: "+this.originalScale);
		console.log("[Watch] participant: "+this.participant);
		console.time('timer'); 
		// this.start = window.performance.now();

		// React Component States.
		// inputPhrase: a variable containing all characters typed by users.
		// inputChar: a variable containing your current input character from the Keyboard.
		// if 'inputPhrase' or 'inputChar' value has changed by onKeyCharReceived(),
		// Watch Component will re-render the interface if the state has changed by calling
		// 	setState({});
		this.state = {
			targetPhrase: this.phrases[0],
			inputPhrase: "",
			inputChar: "",
			keyPressedTimes: 0,
			time: 0,
			charTime: [], 
			phraseNo: 0,
		};

		this.trial = []; 

		console.log(this.trial);

		// For Debug, uncomment only if you want to measure exact width and height in pixels.
		// Following codes won't be affected on any of your code. 
		/*
		var size42 = deviceIndependenceSize(112,42);
		console.log("AppleWatch 42mm => "+size42.width +"/"+size42.height);
		var size38 = deviceIndependenceSize(112,38);
		console.log("AppleWatch 38mm => "+size38.width +"/"+size38.height);
		*/
	}
 
	/**
	 * Callback for input character changes.
	 * @param {} c: changed character
	 *
	 * This callback will be passed to child (Keyboard components, in our case).
	 * when the input character received, it changes inputPhrase state.
	 */
	onKeyCharReceived = (c) => {
		if (this.state.keyPressedTimes == 0) {
			this.overall_start = Date.now();
			this.char_start = window.performance.now(); 

			this.setState({inputChar : c});
			this.state.inputPhrase += c;	

			this.state.keyPressedTimes += 1; 
			console.log(this.state.keyPressedTimes);
			}
		else {
			this.char_end = window.performance.now(); 
			this.state.charTime += (this.char_end - this.char_start)
			this.state.charTime += ","
			this.char_start = window.performance.now(); 

			this.setState({inputChar : c});
			this.state.inputPhrase += c;	
			this.state.keyPressedTimes += 1; 
			console.log(this.state.keyPressedTimes);
		}
	};


	//log data to files
	//this sample code only logs the target phrase and the user's input phrases
	//TODO: you need to log other measurements, such as the time when a user inputs each char, user id, etc.
	saveData = () => {

		//retrieving previous data first from local storage 
		this.setState.phraseNo = JSON.parse(localStorage.getItem("index")); 
		console.log(this.state.phraseNo);

		if (this.state.phraseNo = 0){
			this.trial = [];
		}
		else {
			this.trial = JSON.parse(localStorage.getItem("prevData")); 
		}
		console.log(this.trial);


		this.overall_end = Date.now();
		this.char_end = window.performance.now(); 
		this.timing = this.overall_end - this.overall_start - (this.char_end - this.char_start);
		
		let log_file = JSON.stringify({
			targetPhrase: this.state.targetPhrase,
			inputPhrase: this.state.inputPhrase,
			keyPressedTimes: this.state.keyPressedTimes,
			time: this.timing, 
			charTime: this.state.charTime
		})

		this.trial += (log_file+"\r\n"); 

		console.log(this.state.phraseNo); 
		//set index in local storage 
		localStorage.setItem("index", JSON.stringify(this.state.phraseNo)); 

		console.log(this.trial);

		//set current data in local storage 
		localStorage.setItem("prevData", JSON.stringify(this.trial));

		this.state.inputPhrase = "";
		this.state.phraseNo += 1; 
		this.state.charTime = [];



		this.setState({targetPhrase: this.phrases[this.state.phraseNo]})

		this.setState({inputChar : "clear"}); 
		// download(this.trial, "results.txt", "text/plain");
	}


	endSession = () => {
		console.log(this.trial);
		download(this.trial, "results.txt", "text/plain");
		localStorage.clear(); 
	}

	/**
	 * Render function()
	 * This function will return UI of the system.
	 *	It will return different text-entry system, depending on which
	 *	type property you did pass from index.js
	 */
	render(){
		// style={{}} is an inline styling with calculated screen size // <img src={WatchImage} style={{height: 180}}/> 
		if(this.type === 'normal' && this.originalScale === '0.112'){
			return(
				<div className="watch">
					<div>Participant {this.participant}</div>
					<label className="label">{this.state.targetPhrase}</label>
					<TextArea className="text" inputChar={this.state.inputChar}/>

					<div className="image" style ={styles.container}>
						<div style={{margin: "auto", display: "inline-block", position: "relative", top: "70px", right: "3px"}}>
							<KeyboardNormal originalScale={this.originalScale} onKeyCharReceived ={this.onKeyCharReceived}/>
						</div>
					</div> 	

					<button onClick={this.saveData} style={{position: 'absolute', top: '75%', left: '2.5%'}}>NEXT</button>
					<button onClick={this.endSession} style={{position: 'absolute', top: '100%', left: '2.5%'}}>END SESSION</button>
				</div>
			);
		}
		else if(this.type === 'normal' && this.originalScale === '0.15'){
			return(
				<div className="watch">
					<label>{this.state.targetPhrase}</label>
					<TextArea inputChar={this.state.inputChar}/>
					
					<div className="large-image" style ={styles.container}>
						<div style={{margin: "auto", display: "inline-block", position: "relative", top: "90px", right: "3px"}}>
							<KeyboardNormal originalScale={this.originalScale} onKeyCharReceived ={this.onKeyCharReceived}/>
						</div>
					</div> 	
					<button onClick={this.saveData} style={{position: 'absolute', top: '65%', left: '2.5%'}}>SAVE AGAIN</button>
					<button style={{position: 'absolute', top: '65%', left: '25%'}}>NEXT</button>
				</div>
			);
		}

		else if(this.type === 'zoom'){
			//the save button below is only to demonstrate to you how to save data
			// to files.
			//TODO: You need to remove it in your experiment and figure out another way
			// call this.saveData function to save user's data
			return(
				<div className="watch">
				  <label>{this.targetPhrase}</label>
					<TextArea inputChar={this.state.inputChar}/>
					<KeyboardZoom originalScale={this.originalScale} onKeyCharReceived ={this.onKeyCharReceived}/>
					<button onClick={this.saveData}>SAVE</button>
				</div>
			);
		}else{
			// exception
			return(
				<div>
					<p> [Rendering Failed] You have got wrong parameters. Check your 'type' property </p>
				</div>
			)
		}
	}
}

export default Watch
