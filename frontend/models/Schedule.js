function Schedule(scheduleId = '',
                  user = '',
                  timeSlots = [],
                  meetings = [], // meetings or events?
                  // default = false,
                  name = '',
                  createDate = null) {
  this.scheduleId = scheduleId;
  this.user = user;
  this.timeSlots = timeSlots;
  this.meetings = meetings;
  this.name = name;
  this.createDate = createDate;
}

export default Schedule;