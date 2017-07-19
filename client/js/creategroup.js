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

  $('input.autocomplete').autocomplete({
    data: {
      'Cohort 1': null,
      'Family': null,
      'Developers': null,
      'Campers': null,
      'TTLs': null,
      'STCs': null,
      "Google": 'https://placehold.it/250x250'
    },
    limit: 20,
    onAutocomplete: function(val) {
    },
    minLength: 1,
  });
});

  $(document).ready(function() {
      $('.modal').modal();
  });
