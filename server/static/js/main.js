import { PageSetup } from "./pageSetup.js";
import { DataProcessor } from "./dataProcessor.js";
import { Clock } from "./clock.js";
import { CanvasAnimator } from "./canvasAnimator.js";
import { MidiOutput } from "./midiOutput.js";

const midiOutput = MidiOutput();
const canvasAnimator = CanvasAnimator();
const clock = Clock([canvasAnimator, midiOutput]);

const dataProcessor = DataProcessor([clock, canvasAnimator, midiOutput]);

const pageSetup = PageSetup(dataProcessor);
pageSetup.getJson();

setTimeout(clock.startClock, 1000);
