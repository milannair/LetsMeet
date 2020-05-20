# LetsMeet

LetsMeet is a useful tool for teams and groups to see in what time slots are
their colleagues, family and friends available, and schedule a meeting for a
time period that works for everyone.

## Prerequisites

Before building, testing and running LetsMeet, please make sure you have
installed Node.js. Any recent version should work, but the confirmed
version is listed below for reference.
for your reference.

- Node.js (12.16.3, 14.2.0)

### Platforms

LetsMeet's back-end and front-end are both platform-independent. You can run
the back-end on any platform that has Node.js and an internet connection (or Node.js and MongoDB). The
front-end supports Android, iOS and web.

## Building and Testing LetsMeet

Refer to the [user](https://github.com/milannair/LetsMeet/wiki/User-Documentation) or [dev](https://github.com/milannair/LetsMeet/wiki/Developer-Documentation) documentation for respective building and testing instructions.

## Running LetsMeet

### Running the Back-end

1. Make sure port 8000 is not blocked by your firewall. It will be used by the
   back-end.

2. In the `api` directory, run `npm start`. The back-end will start running.
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

### Links
[Requirements, Architecture, Design, Testing, and CI](https://docs.google.com/document/d/1dkohsmQGX5KDGNGMGTPQ_vPJNPvdhAjXJFZqr1CVU9Q/edit?usp=sharing)<br/>
[Developer Documentation](https://github.com/milannair/LetsMeet/wiki/Developer-Documentation)<br/>
[User Documentation](https://github.com/milannair/LetsMeet/wiki/User-Documentation)
