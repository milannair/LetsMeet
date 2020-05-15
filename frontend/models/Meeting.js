function Meeting(meetingId = '',
                 author = '',
                 confirmed = false,
                 groupId = '',
                 name = '',
                 dateTime = null) {
  this.meetingId = meetingId;
  this.author = author;
  this.confirmed = confirmed;
  this.groupId = groupId;
  this.name = name;
  this.dateTime = dateTime;
}

export default Meeting;