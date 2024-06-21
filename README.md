# robot-action

Node.js Desktop Automation Flows Runner.

Power by [robotjs](https://github.com/octalmage/robotjs),[uiohook-napi](https://github.com/SnosMe/uiohook-napi).

# install

```sh
npm i robot-action -g
```

# exmaple

Record action flows (default output:./action-flows.json)

```sh
robot-action record
```

action-flows.json like:

```json
{
  "action": [
    {
      "command": "moveMouse",
      "args": [254, 33]
    },
    {
      "command": "mouseClick",
      "args": ["right"]
    },
    {
      "command": "typeString",
      "args": ["hello world\n"]
    }
  ]
}
```

Run action flows (default iutput:./action-flows.json)

```sh
robot-action run
```
