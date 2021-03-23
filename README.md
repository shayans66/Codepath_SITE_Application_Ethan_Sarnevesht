# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Ethan Shayan Sarnevesht

Time spent: 20 hours spent in total

Link to project: https://cheerful-humane-poison.glitch.me/

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Time left for each turn is rendered to screen every decisecond
- [x] Current amount of lives are on updated on screen 

## Video Walkthrough

Here's a walkthrough of implemented user stories:
[demo](https://i.imgur.com/cOR4OHo.mp4)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
w3schools
MDN Web Docs
WebDev Subreddit on reddit.com
StackOverflow

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
To add the functionality for having a countdown at the beginning of each turn, I decided to start the timer right after the clue sequence ended. However, I couldn't simply start the 'setInterval()' method right after the clue sequence code block right away because the the clue sequence had a delay. I had to figure out how to calculate when the delay would end so I'd know when to start counting. So I tried a lot of different methods for calculating the right delay until I found the last 'delay' iteration plus the clueHoldTime to work. From there I used the setTimeout method to delay the setInterval method by that much.
Another challenger was when I tested the game outside of the playground, and in the cheerful-humane-poison.glitch.me domain, the sounds weren't working, so I did some research and found that google chrome has a security protocol that does not allow sound from the browser until the user has clicked on something. So I looked up how to resume the sound of the game and found a place in the code such that at that point it would start the sound using the statement. 'context.resume()'
Another challenge was that when I clicked the stop button in the middle of a clue sequence playing, the timer would still go afterwards since there was a delay for the timer to start after the clue sequence. After lots of debugging to find out why this was the case, I found out that I would need to check if the game was still going on in my setTimeout-invoked timer function, using a global boolean variable gamePlaying. By first checking that the game was still going on in my myTimer() function invoked by setTimeout(), I made sure I would never start a timer unless a game was in session.


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
    * How is it possible that we are able to use the sound library and the setInterval/clearInterval methods without having to explicitly import any javascript libraries at the top of script.js?
    * Do typical object-oriented methodologies such as inheritance, polymorphism, and encapsulation commonly seen in Java/C++ also apply to javascript?
    * Why is it that we can write complicated javascript logic and functions that compile in-browser, but when you need a dedicated backend using python or another backend language, the browser doesn't compile that code?



4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
For future iterations of the project, I would include a pre-game set of instructions for the user to specify the difficulty of the game setting from easy, medium, to hard.
    * For the easy mode, the user would have to guess a maximum of 6 keys in a sequence over the course of the game. Each key sequence playback would start at the defaulted 1000 milliseconds, and each playback thereafter would decrease by the original playback (1000ms) divided by the number of keys, 6. Last, the time per turn would be 20 seconds.
    * For medium mode, the user would guess a sequence 12 keys over the course of the game. Each key sequence would decrease by 3 times the original playback (3000ms) divided by the number of keys, 12. Last, the time per turn would be 15 seconds.
    * For hard mode, the user would guess a sequence of 15 keys over the course of the game.  Each key sequence would decrease by 5 times the original playback (5000ms) divided by the number of keys, 15. Last, the time per turn would be 10 seconds.
    




## License

    Copyright [Ethan Shayan Sarnevesht]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
