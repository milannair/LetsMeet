# LetsMeet

LetsMeet is a useful tool for teams and groups to see in what time slots are
their colleagues, family and friends available, and schedule a meeting for a
time period that works for everyone.

## Prerequisites

Before building, testing and running LetsMeet, please make sure you have
installed the following dependencies. Any recent version should work, but the
versions for each dependency that are confirmed to be working are still listed
for your reference.

- MongoDB (4.2.6)
- Node.js (12.16.3, 14.2.0)

### Platforms

LetsMeet's back-end and front-end are both platform-independent. You can run
the back-end on any platform that has MongoDB and Node.js available. The
front-end supports Android, iOS and web.

### Setting Up MongoDB

You may follow the official [MongoDB Community Edition Installation
Tutorial](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials)
for your operating system to set up MongoDB. Please make sure you install
MongoDB on the same machine you want to run the back-end of LetsMeet on, and
use the default MongoDB ports.

After the MongoDB server is up and accessible via `mongodb://localhost`, you
are all set; LetsMeet's back-end will automatically populate database schemas
for you.

## Building and Testing LetsMeet

The back-end and front-end of LetsMeet are both included in this repository.
They should be built and tested separately; however, the commands for building
and testing are exactly the same.

1. Change the working directory to the one containing the component you want to
   build:
   - Back-end: `api`
   - Front-end: `frontend`

2. Run `npm install` to install the packages required by the component. After
   the command completes, the component is ready to run.

3. Now, the component can be tested by running `npm test`.

## Running LetsMeet

### Running the Back-end

1. Check if the MongoDB server is running.

2. Make sure port 8000 is not blocked by your firewall. It will be used by the
   back-end.

3. In the `api` directory, run `npm start`. The back-end will start running.
   To stop the program, press Ctrl-C.

### Running the Front-end

1. If this is the first time you run the front-end on a machine, then install
   `expo-cli` using `npm install --global expo-cli`. Note that you might need
   superuser privilege to run the command successfully (usually by prepending
   the command with `sudo`).

2. For full functionality, make sure the back-end is running on your machine.

3. In the `frontend` directory, run `npm start`. You will see Expo running and
   popping up a new browser tab. Follow the instructions given by Expo to run
   the front-end app on an Android device or simulator, an iOS simulator, or in
   your browser.
