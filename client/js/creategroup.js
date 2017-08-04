const usersData = {};
const groupsData = {};
$.get('http://localhost:3300/api/user/all', function (res) {
  const users = res.data;
  users.forEach(function(user) {
    const selectedUser = user.username;
    usersData[selectedUser] = null;
  });
});
// const id = 1;
// $.get('http://localhost:3300/api/group/all', { id }, function (res) {
//   const groups = res.data;
//   groups.forEach(function(group) {
//     const selectedUser = group.username;
//     groupsData[selectedUser] = null;
//   });
// });

$(document).ready(function() {
  $('.chips-autocomplete').material_chip({
    placeholder: 'Enter a username',
    secondaryPlaceholder: 'e.g. emmanuel',
    autocompleteOptions: {
      data: usersData,
      limit: Infinity,
      minLength: 1
    }
  });
  var members = [];
  $('.chips').on('chip.add', function(e, chip){
    members.push(chip.tag);
    document.getElementById('members').value = members;
  });

  $('.chips').on('chip.delete', function(e, chip){
    var index = members[chip.tag];
    members = members.splice(index, 1);
    document.getElementById('members').value = members;
  });

  $('input.autocomplete').autocomplete({
    // data: groupsData,
    limit: 20,
    onAutocomplete: function(val) {
    },
    minLength: 1,
  });
});

  $(document).ready(function() {
      $('.modal').modal();
  });
