import {
  EventType,
  type UiohookKeyboardEvent,
  type UiohookMouseEvent,
  type UiohookWheelEvent,
  UiohookKey,
} from "uiohook-napi";
import {} from "robotjs";

function getKeyboardKey(event: UiohookKeyboardEvent) {
  const KeyboardMap = {
    [UiohookKey.A]: "a",
    [UiohookKey.B]: "b",
    [UiohookKey.C]: "c",
    [UiohookKey.D]: "d",
    [UiohookKey.E]: "e",
    [UiohookKey.F]: "f",
    [UiohookKey.G]: "g",
    [UiohookKey.H]: "h",
    [UiohookKey.I]: "i",
    [UiohookKey.J]: "j",
    [UiohookKey.K]: "k",
    [UiohookKey.L]: "l",
    [UiohookKey.M]: "m",
    [UiohookKey.N]: "n",
    [UiohookKey.O]: "o",
    [UiohookKey.P]: "p",
    [UiohookKey.Q]: "q",
    [UiohookKey.R]: "r",
    [UiohookKey.S]: "s",
    [UiohookKey.T]: "t",
    [UiohookKey.U]: "u",
    [UiohookKey.V]: "v",
    [UiohookKey.W]: "w",
    [UiohookKey.X]: "x",
    [UiohookKey.Y]: "y",
    [UiohookKey.Z]: "z",
    [UiohookKey[0]]: "0",
    [UiohookKey[1]]: "1",
    [UiohookKey[2]]: "2",
    [UiohookKey[3]]: "3",
    [UiohookKey[4]]: "4",
    [UiohookKey[5]]: "5",
    [UiohookKey[6]]: "6",
    [UiohookKey[7]]: "7",
    [UiohookKey[8]]: "8",
    [UiohookKey[9]]: "9",
    [UiohookKey.Numpad0]: "numpad_0",
    [UiohookKey.Numpad1]: "numpad_1",
    [UiohookKey.Numpad2]: "numpad_2",
    [UiohookKey.Numpad3]: "numpad_3",
    [UiohookKey.Numpad4]: "numpad_4",
    [UiohookKey.Numpad5]: "numpad_5",
    [UiohookKey.Numpad6]: "numpad_6",
    [UiohookKey.Numpad7]: "numpad_7",
    [UiohookKey.Numpad8]: "numpad_8",
    [UiohookKey.Numpad9]: "numpad_9",
    [UiohookKey.F1]: "f1",
    [UiohookKey.F2]: "f2",
    [UiohookKey.F3]: "f3",
    [UiohookKey.F4]: "f4",
    [UiohookKey.F5]: "f5",
    [UiohookKey.F6]: "f6",
    [UiohookKey.F7]: "f7",
    [UiohookKey.F8]: "f8",
    [UiohookKey.F9]: "f9",
    [UiohookKey.F10]: "f10",
    [UiohookKey.F11]: "f11",
    [UiohookKey.F12]: "f12",
    [UiohookKey.Tab]: "tab",
    [UiohookKey.Enter]: "enter",
    [UiohookKey.Escape]: "escape",
    [UiohookKey.Backspace]: "backspace",
    [UiohookKey.Space]: "space",
    [UiohookKey.PageUp]: "pageup",
    [UiohookKey.PageDown]: "pagedown",
    [UiohookKey.End]: "end",
    [UiohookKey.Home]: "home",
    [UiohookKey.Insert]: "insert",
    [UiohookKey.Delete]: "delete",
    [UiohookKey.MetaRight]: "command",
    [UiohookKey.NumpadEnter]: "enter",
    [UiohookKey.NumpadEnd]: "end",
    [UiohookKey.NumpadInsert]: "insert",
    [UiohookKey.NumpadDelete]: "delete",
    [UiohookKey.ArrowLeft]: "left",
    [UiohookKey.ArrowUp]: "up",
    [UiohookKey.ArrowRight]: "right",
    [UiohookKey.ArrowDown]: "down",
    [UiohookKey.Ctrl]: "control",
    [UiohookKey.CtrlRight]: "control",
    [UiohookKey.Alt]: "alt",
    [UiohookKey.AltRight]: "alt",
    [UiohookKey.Shift]: "shift",
    [UiohookKey.ShiftRight]: "right_shift",
    [UiohookKey.Meta]: "command",
  };
  if (!KeyboardMap[event.keycode]) {
    throw new Error(`Keycode ${event.keycode} not support now`);
  }
  return KeyboardMap[event.keycode];
}

function getMouseButton(event: UiohookMouseEvent) {
  switch (event.button) {
    case 1:
      return "left";
    case 2:
      return "right";
    case 3:
      return "middle";
    default:
      return "left";
  }
}

function getMouseScroll(event: UiohookWheelEvent) {
  switch (event.direction) {
    case 3:
      return [0, event.rotation];
    case 4:
      return [event.rotation, 0];
    default:
      return [0, event.rotation];
  }
}
export const EventTypeFuncMap = {
  [EventType.EVENT_KEY_PRESSED]: (event: UiohookKeyboardEvent) => {
    return {
      command: "keyToggle",
      args: [getKeyboardKey(event), "down"],
    };
  },
  [EventType.EVENT_KEY_RELEASED]: (event: UiohookKeyboardEvent) => {
    return {
      command: "keyToggle",
      args: [getKeyboardKey(event), "up"],
    };
  },
  [EventType.EVENT_MOUSE_PRESSED]: (event: UiohookMouseEvent) => {
    return {
      command: "mouseToggle",
      args: ["down", getMouseButton(event)],
    };
  },
  [EventType.EVENT_MOUSE_RELEASED]: (event: UiohookMouseEvent) => {
    return {
      command: "mouseToggle",
      args: ["up", getMouseButton(event)],
    };
  },
  [EventType.EVENT_MOUSE_MOVED]: (event: UiohookMouseEvent) => {
    return {
      command: "moveMouse",
      args: [event.x, event.y],
    };
  },
  [EventType.EVENT_MOUSE_WHEEL]: (event: UiohookWheelEvent) => {
    return {
      command: "scrollMouse",
      args: getMouseScroll(event),
    };
  },
};
