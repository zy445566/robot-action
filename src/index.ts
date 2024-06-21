const fs = require("fs");
import * as robot from "robotjs";
import * as fsPromise from "fs/promises";
import { ActionFlowsData } from "./types";

async function readActionFlowsFile(
  actionFlowsFilePath: string
): Promise<ActionFlowsData> {
  const fileData = await fsPromise.readFile(actionFlowsFilePath);
  const actionData = JSON.parse(fileData.toString());
  return actionData;
}

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
