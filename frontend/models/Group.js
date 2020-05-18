function Group(groupId = '',
               image = '',
               members = [],
               meetingRequests = [],
               memberRequests = [],
              //  schedule = 
               owner = '') {
  this.groupId = groupId;
  this.image = image;
  this.members = members;
  this.meetingRequests = meetingRequests;
  this.memberRequests - memberRequests;
  this.owner = owner;
}

export default Group;