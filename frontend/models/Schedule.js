function Schedule(scheduleId = '',
                  user = '',
                  availability = [],
                  // default = false,
                  name = '',
                  createDate = null) {
  this.scheduleId = scheduleId;
  this.user = user;
  this.availability = availability;
  this.name = name;
  this.createDate = createDate;
}

export default Schedule;