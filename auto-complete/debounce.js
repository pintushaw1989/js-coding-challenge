// getting all required element
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

// If user press any key and release
const getSuggestion = () => {
  console.log("clicked");
  let inputData = inputBox.value;
  let suggData = [];

  if (inputData) {
    suggData = suggestions.filter((item) => {
      return item.toLocaleLowerCase().startsWith(inputData.toLocaleLowerCase());
    });

    suggData = suggData.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
    // Show suggestion box
    searchWrapper.classList.add("active");
  } else {
    // hide suggestion box
    searchWrapper.classList.remove("active");
  }

  // console.log(suggData);
  showSuggestions(suggData);
};

// Creating the list items to attach in suggBox
function showSuggestions(list) {
  let listData;
  if (list.length) {
    listData = list.join("");
  } else {
    userValue = inputBox.value;
    listData = "<li>" + userValue + "</li>";
  }
  suggBox.innerHTML = listData;

  // Arraching onSelect method to all the list items
  let allList = suggBox.querySelectorAll("li");
  allList.forEach((list) => {
    list.setAttribute("onclick", "onSelect(this)");
  });
}

function onSelect(element) {
  let selectedData = element.textContent;
  // passing user selected data to input field
  inputBox.value = selectedData;
  searchWrapper.classList.remove("active");
}


// Craeting debounce function to get the result after user stopped typing
const debounce = (callback, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
};

const betterFunction = debounce(getSuggestion, 300);
