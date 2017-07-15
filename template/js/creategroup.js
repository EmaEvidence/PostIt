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
});
