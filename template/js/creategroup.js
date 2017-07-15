$(document).ready(function() {
  $('.chips-autocomplete').material_chip({
    placeholder: 'Enter a username',
    secondaryPlaceholder: 'e.g. emmanuel',
    autocompleteOptions: {
    data: {
      'Steven': null,
      'Busayo': null,
      'Google': null,
      'Dunni': null,
      'Lanre': null,
      'Sholape': null
    },
    limit: Infinity,
    minLength: 1
  }
  });
  $('.chips-autocompletegroup').material_chip({
    placeholder: 'Enter a group name',
    secondaryPlaceholder: 'e.g. Cohort 1',
    autocompleteOptions: {
    data: {
      'Cohort 1': null,
      'Family': null,
      'Developers': null,
      'Campers': null,
      'TTLs': null,
      'STCs': null
    },
    limit: Infinity,
    minLength: 1
  }
  });
});
