# Requirements
​
## Product Description
​
Note: focus on this section the most. These should be broad categories, so
try to not exceed 8 and 5, respectively. (You don't need to go over 4 and 2
unless you want to.
​
### Answer each of these questions briefly (1-4 sentences):
1. What is your product?  
A.1) LetsMeet is a scheduling app focused on mobile users that allows users to create default schedule and schedule meetings through making LetsMeet groups. 
2. What problem does it solve?  
A.2) It makes scheduling events quicker and easier by avoiding the long conversations people need to have about each of their personal calendars in order to schedule events together.
3. Who is the target audience?  
A.3) We are focusing on college students and other people working in an academic environment who need to find meeting times and places with widely different schedules.
4. What alternatives exist, and how is your product different?  
A.4) Some alternative tools are When2Meet, Google Calendar, and Doodle.

When2Meet: When2Meet has an un-intuitive UI and is difficult to operate on a mobile phone. Another disadvantage of When2Meet is the need to specify your schedule each time you use it for meeting with a group. LetsMeet will be developed with mobile users in mind and give people the abilities to use the same schedule over multiple meeting groups without needing to specify it multiple times.

Google Calendar: Although it allows people to check free time spots of other people, it does not provide functionality to compare multiple people’s schedules. What’s more, it is not giving users the option to choose where they want to meet.
​
Doodle: Doodle is an app that allows an event host to send a survey for the best meeting times. However, Doodle does not integrate Google Calendar and requires attendees to fill out their best times for each individual event.

### List 4+ major features plus description:
1. Create an account and edit a schedule to be shared with groups.
2. Create a group and invite members.
3. Any member of a group requests a meeting time based on when all users are available and the other group members can confirm or decline the requested meeting or the group members can vote on multiple meeting times.
4. When a meeting is confirmed, every group member is notified and every group member’s schedule is automatically updated and propagated to their other groups.
​
### List 2+ stretch-goal features plus description:
Integrate with Google Calendar: Import a calendar from Google to fill out your availability instead of entering it in manually.
Select a meeting location and the app will show the top-voted location suggestion.
Implement a chat feature so that users can chat within their groups.
Allow users to create multiple schedules and choose which schedule is their ‘default’ schedule.
Allow users to create recurring events in their groups.
​
## Requirements
​
Use this section to be really concrete about what having those major features
means. Use one-sentence bullet points as much as possible.
​
​
### Functional requirements (aka features)
For each major feature, list the things the product must do to count as
having this feature. (Shoot for 5-20 single sentence bullets that include
the word "must" - but you can play around with it.)

Major Feature 1:
* Must NOT show event details in calendars to shared users, only show time slots where the user is available.
* A user will have a universal (default) schedule that they will share with each group they create or accept an invitation to without the app asking them to specify a schedule.
​
Major Feature 2:
* Must allow searching another user by their name, email, and phone number in order to invite them.
* Must allow users to accept or decline a group invite.
* Must allow users to leave groups.

Major Feature 3:
* Must allow users to create meeting requests and choose whether all users have to confirm the meeting (unanimous) or create a poll of meetings times
* Must allow users to confirm or decline a meeting request.
* Must allow users to vote on meeting request polls.
* Must send a notification when a meeting has been set.
* Must allow users to review the meeting time after it is confirmed.
* Must allow users to remove themselves from a meeting after confirming said meeting.

Major Feature 4:
* Must automatically add the scheduled meeting (and block the time slot) to every team member’s shared schedule, without any further interaction from the user once the meeting time is confirmed.
* Must wait for every user in the group to vote for a requested time before adding the event to every team member’s shared schedule.

### Non-functional requirements:
Break down any things your product must in a performance/privacy/under-the-hood
sense.
Must be able to be extended with the functionality of creating and managing multiple schedules, which is a stretch goal of our project.
Must be no transaction conflicts when multiple meeting times are requested by different groups.
​
### Use cases
(Just include a link to your use cases and say that it must satisfy all of
these use cases.)
​
​
## Use Cases
Read the spec - it's pretty clear.  But basically, each team member
comes up with a use case and covers each of these (briefly):
1. actors
2. preconditions
3. triggers
4. minimal/success guarantees (end condition)
5. the list of steps to the success scenario
6. failure end conditions
7. extensions/variations of the scenario

### Creating a schedule
1. Actors: app user
2. Preconditions: app is installed on user’s mobile device
3. Triggers: user is creating a profile and has to create a schedule
4. minimal/success guarantees (end condition): user’s schedule is created
5. the list of steps to the success scenario: 
    1. User opens the app
    2. User creates a new profile
    3. User enters their personal information
    4. User goes to next page
    5. User clicks and drags (or other input functionality TBD) their available times on the calendar on screen
    6. User confirms their schedule is completed
6. failure end conditions: 
The user doesn’t select an available time slot.
7. extensions/variations of the scenario
* User can also create/edit a schedule after the profile has been created

### Creating a group
1. Actors: app user​
2. Preconditions: user has created a profile
3. Triggers: user creates a group (presses a button)
4. Minimal/success guarantees: a group is created with the user’s selected group members
5. Steps to success scenario: 
    1. User presses a “Create a Group” button
    2. User enters a group name
    3. User searches (by name, username, email, or phone number) and selects group members
    4. User confirms group details, group is created, and invites are sent out to group members
6. Failure end conditions:
None
7. Extensions/Variations of the scenario:
None

### Joining a group
1. Actors: user
2. Preconditions: a group invite was sent to the user
3. Triggers: user accepts the invitation to the group
4. minimal/success guarantees (end condition): user joins the group and is able to use all functionality of being in a group
5. the list of steps to the success scenario
    1. User presses a button to accept invitation
    2. User joins the group now.
6. failure end conditions: 
None
7. extensions/variations of the scenario: 
user declines the group invitation and is not added to the group

### Leaving a group
1. Actors: user in a group
2. Preconditions: user must be in the group they want to leave
3. Triggers: user wants to leave a group.
4. minimal/success guarantees (end condition): user leaves the group and no longer appears in the group to any of the group members
5. the list of steps to the success scenario
    1. User presses a button to leave the group
    2. A confirmation dialog appears
    3. User confirms that they want to leave the group
    4. User leaves the group and no longer appears in the group to other group members
6. failure end conditions: 
    NONE
7. extensions/variations of the scenario: 
If the user is the only user in the group, the group is deleted after the user leaves
The user can leave a group after they have joined it by pressing the “Leave Group” button and confirming that they want to leave.

### Scheduling a meeting with a poll
1. Actors: user in a group
2. Preconditions: a group of at least 2 users is formed
3. Triggers: any group member requests a meeting in the app
4. Minimal/success guarantees: a meeting time agreed by every group member is determined and the meeting is put on every group member’s schedule
5. Steps to the success scenario:
    1. Each group member indicates when they are available in their own schedule (this was done on account creation).
    2. The user requests a meeting time in the app. The app checks everyone’s free time and shows time slots when strictly more than 50% of the group are available.
    3. The user chooses the meeting request to be a poll.
    4. The user selects the meeting times that they want to request and be included in the poll
    5. The poll for this meeting request is posted in the group.
    6. When everyone has responded to the poll (or the poll times out), the meeting is successfully scheduled and put on the schedules of people who voted for the winning poll option.
6. Failure end conditions:
* No meeting time can be suggested if no time slot working for strictly more than 50% of the group can be found.
7. Extensions/variations of the scenario:
* If no meeting time can be suggested, a warning is shown in the UI telling the user they should adjust their schedule for the meeting.
* If there is a tie in the poll result, the person who requested the meeting makes the final decision.

### Scheduling a meeting with unanimous decision

1. Actors: user in a group
2. Preconditions: User must be in a group with at least 2 members
3. Triggers: A group member requests a meeting
4. minimal/success guarantees (end condition): All members accept the requested meeting.
5. the list of steps to the success scenario
    1. Each group member indicates when they are available in their own schedule (this was done on account creation).
    2. The user requests a meeting time in the app selecting the option to make a decision by unanimous votes.
    3. All group members accept the requested meeting time.
6. failure end conditions
* The meeting is not scheduled if anyone declines the meeting request.
7. extensions/variations of the scenario
* If no meeting time can be suggested, a warning is shown in the UI telling the user they should adjust their schedule for the meeting.




## Process Description
​
### Tool set
Just list languages/frameworks/data sources/version control/etc. (at least 5)
Git: it’s the version control system that GitHub depends on, and our project is required to be hosted on GitHub.
React Native
GitHub Issues for bug tracking: since our project is on GitHub it is convenient to use the built-in issue tracker directly. We are also able to refer to the Issue tickets in Git commit messages.
+ 1 sentence or a few bullets for why you chose it (include git - that's free)
​
### Group dynamics
Write at least 3-4 sentences on why you're structuring things how you are.
​
### Schedule/Timeline
At the least: list all your major features, say who will work on each of
these things, and when it will be complete by:
1. design
2. first working implementation
3. final working implementation
​
### Risk Summary
List at least 3 risks. For each, say:
1. what the risk is
2. what you'll do early on to reduce the risk
3. how you'll proceed if you can't overcome this risk (i.e. plan B)

