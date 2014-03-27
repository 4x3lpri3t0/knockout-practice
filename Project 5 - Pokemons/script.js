var Pokemon = function() {
  var self = this;
  
  self.type = ko.observable();
  self.pokemon = ko.observable();
  self.quantity = ko.observable(1);
  self.subtotal = ko.computed(function() {
    return self.pokemon() ? self.pokemon().power * parseInt("0" + self.quantity(), 10) : 0;
  });

  // Whenever the type changes, reset the pokemon selection
  self.type.subscribe(function() {
    self.pokemon(undefined);
  });
};

var Pokedex = function() {
  var self = this;

  self.pokemonLines = ko.observableArray([new Pokemon()]); // Put one line in by default
  self.grandTotal = ko.computed(function() {
    var total = 0;
    $.each(self.pokemonLines(), function() { total += this.subtotal() })
    return total;
  });

  // Operations
  self.addPokemon = function() { self.pokemonLines.push(new Pokemon()) };
  self.removePokemon = function(line) { self.pokemonLines.remove(line) };
  self.save = function() {
    var dataToSave = $.map(self.pokemonLines(), function(line) {
      return line.pokemon() ? {
        pokemonName: line.pokemon().name,
        quantity: line.quantity()
      } : undefined
    });
    alert("Could now send this to server: " + JSON.stringify(dataToSave));
  };
};

$(document).ready(function() {
  ko.applyBindings(new Pokedex());
});