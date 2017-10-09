/**
 * UserId removes users from array of json objects to an array ofnumbers
 * @method UserId
 *
 * @param  {array} arrayOfIds array of json user objects
 *
 * @return {array} array of user ids
 */
export const userId = (arrayOfIds) => {
  const ids = [];
  arrayOfIds.forEach((idObject) => {
    ids.push(idObject.id);
  });
  return ids;
};

/**
 * converts an array of id objects to an array of ids
 * @method GroupId
 *
 * @param {array} arrayOfIds Array of JSON objects
 *
 * @return {array} Numeric array
 */
export const groupId = (arrayOfIds) => {
  const ids = [];
  arrayOfIds.forEach((idObject) => {
    ids.push(idObject.GroupId);
  });
  return ids;
};
