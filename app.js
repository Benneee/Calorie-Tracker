// We use an IIFE /IFY/ :), so our controllers run on page load.
// IIFE - Immediately Invoked Function Expression

// The app controller bootstraps all our controllers
// We will be initialising everything from the app controller
// All our event listeners and other triggers will be fired/initialised from the app controller

// The UI Controller is responsible for manipulating our UI abd populating it with data

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
      // { id: 0, name: 'Fried Rice', calories: 1000 },
      // { id: 1, name: 'Bread and eggs', calories: 700 },
      // { id: 2, name: 'Eba and egusi', calories: 1200 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // Auto-increase id logic
      ID = data.items.length > 0 ? data.items[data.items.length - 1].id + 1 : 0;

      // Calories to number
      calories = parseInt(calories);

      // Remember we have a constructor for a new item above,
      // So we create an instance of the Item object to create a new item
      // Create a new Item
      newItem = new Item(ID, name, calories);
      data.items.push(newItem);

      return newItem;
    },

    geItemById: function(id) {
      let found = null;

      data.items.forEach(item => {
        item.id === id ? (found = item) : null;
      });
      return found;
    },

    updateItem: function(name, calories) {
      // Convert calories to number
      calories = parseInt(calories);

      let newItem = null;

      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          newItem = item;
        }
      });
      return newItem;
    },

    setCurrentItem: function(item) {
      data.currentItem = item;
    },

    getCurrentItem: function() {
      return data.currentItem;
    },

    getTotalCalories: function() {
      let total = 0;

      // Loop through the items and sum up the calories
      data.items.forEach(item => {
        total += item.calories;
      });

      // Then,
      data.items.totalCalories = total;

      // Return the totalCalories
      return data.items.totalCalories;
    },

    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  // All the sectors we will be calling from the DOM
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };
  // Public methods
  return {
    populateItemList: function(items) {
      // What we will do here
      // Loop through the items, make each of them a list item
      // Then insert into a UL
      // Why: We have a UL in the template waiting for us and it will be much easier
      // and neater to display list items :)
      let html = '';

      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong><em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>      
        `;
      });
      // Insert li into ul
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getInputItem: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      // Display list first before populating the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `Item-${item.id}`;

      // Add to HTML
      li.innerHTML = `
         <strong>${item.name}: </strong><em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
      `;
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    // Update the UI with updated item
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // The above gives us a nodelist which means we cannot use a forEach loop on it,
      // Hence, we need to convert it into an array
      let arrayOfListItems = Array.from(listItems);

      arrayOfListItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');

        // TODO
        // Fix Update Bug

        if (itemID === `#${item.id}`) {
          document.querySelector(`${itemID}`).innerHTML = `
          <strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>            
          `;
        }
      });
    },

    // Clear Fields
    clearInputFields: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

      UICtrl.showEditState();
    },

    // Hide List line when ul is empty
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    // Display total calories
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },

    setInitialState: function() {
      UICtrl.clearInputFields();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    getSelectors: function() {
      return UISelectors;
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Edit Item Icon Event Click
    // So because our item isn't generated immediately on pageload, there's nothing to target on the page
    // However, we can target the list once an item is generated, this method is event delegation

    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update Item Event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Disable 'enter' key - submit on enter
    document.addEventListener('keypress', deactivateEnter);

    function deactivateEnter(e) {
      e.keyCode === 13 || e.which === 13 ? e.preventDefault() : null;
    }
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // console.log('added new item');

    // Get form input from UI Controller
    const input = UICtrl.getInputItem();

    // console.log(input);

    // Next we want to show the items added to the world
    // First we want to ensure the input fields aren't empty
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add new item to the ul
      UICtrl.addListItem(newItem);

      // Get Total Calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Display total calories
      UICtrl.showTotalCalories(totalCalories);

      // Clear input fields
      UICtrl.clearInputFields();
    }

    e.preventDefault();
  };

  // Click to edit a list item
  const itemEditClick = function(e) {
    // We want to target the edit icon itself
    if (e.target.classList.contains('edit-item')) {
      // We now want to populate the input fields with the selected list item
      // Get the selected list item ID
      const listId = e.target.parentNode.parentNode.id;

      //Break the value into an id array and pick out the value of the id
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);

      // Get entire list item
      const itemToEdit = ItemCtrl.geItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add Item To Form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  // Update a list item
  const itemUpdateSubmit = function(e) {
    // console.log('update');
    // Get Item Input

    const input = UICtrl.getInputItem();

    // Update Item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Display updated Item
    UICtrl.updateListItem(updatedItem);

    e.preventDefault();
  };

  // Public methods
  return {
    init: function() {
      // Set initial state
      UICtrl.setInitialState();
      // Fetch Items from ItemCtrl / Data Structure
      const items = ItemCtrl.getItems();

      // Quickly, we need to check if UL is empty, then, we hide it, if it's not empty, we populate the list...
      items.length === 0 ? UICtrl.hideList() : UICtrl.populateItemList(items);
      // Hide List if empty    // Populate list with items

      // Get Total Calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Display total calories
      UICtrl.showTotalCalories(totalCalories);

      // Load events
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

// Initialising the app
App.init();
