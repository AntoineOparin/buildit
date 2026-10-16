# Build It

A slot-machine style idea generator. Spin two reels, **App Category** + **Target Audience**, and build whatever comes up.

![Demo](docs/demo.gif)

> Full-quality recording: [docs/demo.mp4](docs/demo.mp4)

## Running it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

To make a production build:

```bash
npm run build     # outputs to dist/
npm run preview   # serves the built app at http://localhost:4173
```

## How to use it

| | |
|---|---|
| **Spin** | Click **Spin** or press **Space**. Both reels spin, and the audience reel stops a little after the category reel. |
| **Lock a reel** | Click the 🔒 next to a reel's label to keep its word. Spin again to change only the other reel. |
| **Timer** | Pick 15, 30 or 60 min and click **Start timer**. You can pause, resume or reset it. |
| **History** | Your last 6 combinations appear as tags under the controls. |

## Screenshots

**Ready to spin**

![Home](docs/home.png)

**Mid-spin (motion blur)**

![Spinning](docs/spinning.png)

**A result, with history**

![Result](docs/result.png)

**Timer running**

![Timer](docs/timer.png)

**On a phone**

<img src="docs/mobile.png" alt="Mobile" width="320" />

## Customizing the words

Edit the two lists in [`src/words.js`](src/words.js). Add or remove as many words as you like.

## Project layout

```
src/
  App.jsx      page layout, spin logic, timer, history
  Reel.jsx     a single spinning reel with motion blur
  words.js     the category and audience word lists
  styles.css   styling
docs/          screenshots and demo recordings
```
