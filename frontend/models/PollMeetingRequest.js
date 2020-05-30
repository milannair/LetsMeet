import MeetingRequest from './MeetingRequest';

function PollMeetingRequest(meetingRequestId,
                            author,
                            deadline,
                            name,
                            groupId,
                            status,
                            options = []) {
  MeetingRequest.call(this, 
    meetingRequestId,
    author,
    deadline,
    name,
    groupId,
    status
  );
  this.options = options;
}

export default PollMeetingRequest;