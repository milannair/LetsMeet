function User(userId = '',
              email = '', 
              password = '', 
              username = '', 
              displayName = '',
              phone = '',
              meetings = [],
              requests = [],
              groups = [],
              schedule = [], // array of { startTime: Date, endTime: Date }
              createDate = null) {
  this.userId = userId;
  this.email = email;
  this.password = password;
  this.username = username;
  this.displayName = displayName;
  this.phone = phone;
  this.createDate = createDate;
  this.meetings = meetings;
  this.requests = requests;
  this.groups = groups;
  this.schedule = schedule;
}

export default User;