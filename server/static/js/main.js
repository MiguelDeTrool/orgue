import { PageSetup } from "./pageSetup.js";
import { DataProcessor } from "./dataProcessor.js";
import { Clock } from "./clock.js";
import { CanvasAnimator } from "./canvasAnimator.js";
import { MidiOutput } from "./midiOutput.js";
import { IncAndDecNum, LoadingModal } from "./innerUI.js";

IncAndDecNum("#length", ".plus", ".minus");
const loadingModal = LoadingModal(".loading-modal");

const midiOutput = MidiOutput();
const canvasAnimator = CanvasAnimator();
const clock = Clock([canvasAnimator, midiOutput]);
clock.addSubscriber(canvasAnimator);
clock.addSubscriber(midiOutput);

const dataProcessor = DataProcessor();
dataProcessor.addSubscriber(clock);
dataProcessor.addSubscriber(canvasAnimator);
dataProcessor.addSubscriber(midiOutput);

const pageSetup = PageSetup();
pageSetup.addSubscriber(dataProcessor);
pageSetup.addSubscriber(loadingModal);
pageSetup.getJson();

setTimeout(clock.startClock, 1000);
