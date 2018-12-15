A very simple JS editor built using [React](https://reactjs.org/).

## Why?

I hear ya. There are already a lot of JS playgrounds _(JSFiddle, codepen etc...)_ out there. Why reinvent the wheel?

I started building this nifty tool for two main reasons:

1. I wanted **to learn** React. _(Nope, not with another Todo application!)_
2. I wanted **to develop** a simple version of a web app that I frequently used and wished it was better. That's when JSFiddle came to my mind. Not that JSFiddle isn't awesome, but I predominantly used it only to write Javascript code and barely used HTML or CSS, which meant I missed out on things like console.logs().

Hence, CS Editor!

## How?

Thank God for Open source software and some nifty hacks.

To implement the editor part with syntax highlighting and keymap bindings, I implemented a customized version of the insanely awesome [CodeMirror](https://github.com/codemirror/CodeMirror) _(**Fun fact:** Almost every famous code editor on the internet uses this plugin)_

To capture the console.log entries, I took a sneaky _(read 'hacky')_ approach using `postMessage` API.

To execute the input JS code, I utilized the good _(bad)_ old `eval` function. Anyone who has read the documentation on eval would know it's very slow and not so safe. While this approach works for a hackathon-ed hobby project, I've planned to work on a better-sandboxed execution of the code in the near future.

**P.S: PRs are welcome!**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
