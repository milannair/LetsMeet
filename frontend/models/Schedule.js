function Schedule(scheduleId = '',
                  user = '',
                  timeslots = [],
                  meetings = [], // meetings or events?
                  // default = false,
                  name = '',
                  createDate = null) {
  this.scheduleId = scheduleId;
  this.user = user;
  this.timeslots = timeslots;
  this.meetings = meetings;
  this.name = name;
  this.createDate = createDate;
}

export default Schedule;