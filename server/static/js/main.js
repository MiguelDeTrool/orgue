import { PageSetup } from "./pageSetup.js";
import { DataProcessor } from "./dataProcessor.js";
import { Clock } from "./clock.js";
import { CanvasAnimator } from "./canvasAnimator.js";

const canvasAnimator = CanvasAnimator();
const clock = Clock([canvasAnimator]);

const dataProcessor = DataProcessor([clock, canvasAnimator]);

const pageSetup = PageSetup(dataProcessor);
pageSetup.getJson();
