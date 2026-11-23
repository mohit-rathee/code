## ▶️ Usage

### Run Test Command

```bash
npm run test <path/to/input/file>
```

**Examples:**

From Canvas State:
```bash
npm run test inputState/sampleCanvas.js
```

Steps:
```
[1/3] Canvas → Code
[2/3] Code → Canvas
[3/3] Canvas → Code
```

From React Code:
```bash
npm run test inputCode/sampleComponent.jsx
```

Steps:
```
[1/2] Code → Canvas
[2/2] Canvas → Code
```


## 🔍 Live Preview

To see the latest converted code in action:

```bash
cd testing-apps-ai-code
npm install   # First time only
npm run dev
```

Then open **http://localhost:3000** in your browser. Every time you run a test, `page.tsx` will be updated automatically.
