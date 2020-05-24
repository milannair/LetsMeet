function Meeting(meetingId = '',
                 author = '',
                 confirmed = false,
                 groupId = '',
                 name = '',
                 start = null,
                 end = null) {
  this.meetingId = meetingId;
  this.author = author;
  this.confirmed = confirmed;
  this.groupId = groupId;
  this.name = name;
  this.start = start;
  this.end = end;
}

export default Meeting;