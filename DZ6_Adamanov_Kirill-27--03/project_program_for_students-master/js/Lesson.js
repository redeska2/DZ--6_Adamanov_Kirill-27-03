const tabContent = document.querySelectorAll('.tab_content_block');
const tabsParent = document.querySelector('.tab_content_items');
const tabs = document.querySelectorAll('.tab_content_item');

let currentTabIndex = 0;
let intervalId;

const hideTabContent = () => {
  tabContent.forEach((element) => {
    element.style.display = 'none';
  });
  tabs.forEach((element) => {
    element.classList.remove('tab_content_item_active');
  });
};

const showTabContent = (index) => {
  tabContent[index].style.display = 'block';
  tabs[index].classList.add('tab_content_item_active');
};

const switchTab = (index) => {
  hideTabContent();
  currentTabIndex = index;
  showTabContent(currentTabIndex);
};

const autoSwitchTab = () => {
  const nextTabIndex = (currentTabIndex + 1) % tabs.length;
  switchTab(nextTabIndex);
};

const startAutoSwitch = () => {
  clearInterval(intervalId);
  intervalId = setInterval(autoSwitchTab, 3000);
};

const stopAutoSwitch = () => {
  clearInterval(intervalId);
};

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    switchTab(index);
    intervalId = setInterval(autoSwitchTab, 3000);
  });
});

hideTabContent();
showTabContent(currentTabIndex);
startAutoSwitch();

const tabSlider = document.querySelector('.tab_slider');
tabSlider.addEventListener('mouseenter', stopAutoSwitch);
tabSlider.addEventListener('mouseleave', startAutoSwitch);
window.addEventListener('blur', stopAutoSwitch);
window.addEventListener('focus', startAutoSwitch);
 


// CARD SWITCHER
const card = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
let count = 1;

const fetchCardById = (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => response.json());
};

const fetchPosts = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json());
};

const updateCard = (cardData) => {
  const completedStatus = cardData.completed ? 'true' : 'false';
  const highlightClass = cardData.completed ? 'highlight-true' : 'highlight-false';
  const borderClass = cardData.completed ? 'completed-true' : 'completed-false';

  // Update the card content based on the fetched data
  card.innerHTML = `
    <h2>${count}</h2>
    <p>${cardData.title}</p>
    <p><span class="${highlightClass}">${completedStatus}</span></p>
  `;
  card.className = `card ${borderClass}`;
};

const prevCard = () => {
  if (count === 1) {
    count = 200;
  } else {
    count--;
  }
  fetchCardById(count)
    .then(data => updateCard(data));
};

const nextCard = () => {
  if (count === 200) {
    count = 1;
  } else {
    count++;
  }
  fetchCardById(count)
    .then(data => updateCard(data));
};

const fetchAndLogPosts = () => {
  fetchPosts()
    .then(posts => console.log(posts))
    .catch(error => console.error('Ошибка при получении данных:', error));
};

// Initial load
fetchCardById(count)
  .then(data => updateCard(data));

// Event listeners for prev and next buttons
btnPrev.addEventListener('click', prevCard);
btnNext.addEventListener('click', nextCard);

// Fetch and log posts
fetchAndLogPosts();