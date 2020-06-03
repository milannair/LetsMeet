/*
 * An invitation to join a group.
 */
function GroupInvitation(
  /* The object ID of the group */
  groupId,

  /* The group's name */
  groupName,
) {
  this.groupId = groupId;
  this.groupName = groupName;
}

export default GroupInvitation;
