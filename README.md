# Big Brother

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run lint`

Runs the lint on the code and shows you all the problems (syntax, errors, etc ...).

### Pipeline

A complete CI/CD pipeline is created using Gihub Actions. We also use webhooks to send notifications to our Slack Channel.

##Jobs

-Lint
Runs the lint on the code and shows you all the problems (syntax, errors, etc ...).

-Test
If the lint is OK, runs all the tests of our test suites (DOM elements, Tracking tests ...).

-Merge-to-prod
If the tests are OK, merges the code from MASTER to PRODUCTION branch.

-Build
When the merge is done, this job logs in to Docker Hub, builds an image using the Dockerfile and then pushes the image to a DockerHub registry.
