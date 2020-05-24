function MeetingRequest(meetingRequestId = '',
                        author = '',
                        deadline = null,
                        name = '',
                        groupId = '',
                        status = 0) {
  this.meetingRequestId = meetingRequestId;
  this.author = author;
  this.deadline = deadline;
  this.name = name;
  this.groupId = groupId;
  this.status = status;
}

export default MeetingRequest;