// We use an IIFE /IFY/ :), so our controllers run on page load.
// IIFE - Immediately Invoked Function Expression

// The app controller bootstraps all our controllers
// We will be initialising everything from the app controller
// All our event listeners and other triggers will be fired/initialised from the app controller

// Storage Controller

// Item Controller
const ItemCtrl = (function() {
  // We need an item constructor here, so we can easily create an item and easily add
  // it to the state / data structure
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // State / Data Structure
  const data = {
    items: [
      { id: 0, name: 'Fried Rice', calories: 1000 },
      { id: 1, name: 'Bread and eggs', calories: 700 },
      { id: 2, name: 'Eba and egusi', calories: 1200 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  // Public methods
  return {};
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Public methods
  return {
    init: function() {
      console.log('Initializing App...');
    }
  };
})(ItemCtrl, UICtrl);

// Initialising the app
App.init();
