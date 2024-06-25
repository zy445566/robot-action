import * as robot from "robotjs";
import * as fsPromise from "fs/promises";
import { ActionFlowsData } from "./types";
import { uIOhook, EventType } from "uiohook-napi";
import { EventTypeFuncMap } from "./transfer";

async function readActionFlowsFile(
  actionFlowsFilePath: string
): Promise<ActionFlowsData> {
  const fileData = await fsPromise.readFile(actionFlowsFilePath);
  const actionData = JSON.parse(fileData.toString());
  return actionData;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function runner(actionFlowsFilePath: string) {
  const actionData = await readActionFlowsFile(actionFlowsFilePath);
  if (actionData.mouseDelay) {
    robot.setMouseDelay(actionData.mouseDelay);
  }
  if (actionData.keyboardDelay) {
    robot.setKeyboardDelay(actionData.keyboardDelay);
  }
  const actionList = actionData.action;
  let resultTmp = null;
  for (let i = 0; i < actionList.length; i++) {
    const action = actionList[i];
    let mainRuner = robot;
    if (action.command === "sleep") {
      if (typeof action.args[0] === "number") {
        await sleep(action.args[0]);
        continue;
      }
    }
    if (action.command.startsWith("plugin.")) {
      const pluginInfo = action.command.split(".");
      mainRuner = require(pluginInfo[1])[pluginInfo[2]];
    }
    if (mainRuner[action.command] instanceof Function) {
      resultTmp = await mainRuner[action.command](
        ...action.args.map((arg) => (arg === "$result" ? resultTmp : arg))
      );
    } else {
      throw new Error("command not found");
    }
  }
}

export async function recorder(
  actionFlowsFilePath: string
): Promise<() => void> {
  const data = {
    action: [],
  };
  let tmpTime = Date.now();
  uIOhook.on("input", (e) => {
    if (EventTypeFuncMap[e.type]) {
      const now = Date.now();
      const time = now - tmpTime;
      tmpTime = now;
      if (time > 0) {
        data.action.push({
          command: "sleep",
          args: [time],
        });
      }
      data.action.push(EventTypeFuncMap[e.type](e));
    }
  });
  uIOhook.start();
  return async () => {
    uIOhook.stop();
    fsPromise.writeFile(actionFlowsFilePath, JSON.stringify(data, null, 2));
  };
}
