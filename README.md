# robot-action

Node.js Desktop Automation Flows Runner.

Power by [robotjs](https://github.com/octalmage/robotjs)

# exmaple

action-flows.json

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

Run action flows (default:./action-flows.json)

```sh
npx robot-action ./action-flows.json
```
