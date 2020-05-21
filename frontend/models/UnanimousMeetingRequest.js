import MeetingRequest from './MeetingRequest';

function UnanimousMeetingRequest(meetingRequestId,
                                 author,
                                 deadline,
                                 name,
                                 groupId,
                                 status,
                                 option = null) {
  MeetingRequest.call(this, 
    meetingRequestId,
    author,
    deadline,
    name,
    groupId,
    status
  );
  this.option = option;
}

export default UnanimousMeetingRequest;