const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

var previousContainer;

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
    previousContainer = draggable.parentElement;
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');

    if(draggable.parentElement.classList[0] == 'container'){
      draggable.firstElementChild.classList.add('menuitemSm');
      draggable.firstElementChild.classList.add('mx-1');
      draggable.firstElementChild.firstElementChild.classList.remove('mt-3');
    }

    if(previousContainer.childElementCount == 1){
      previousContainer.remove()
    }
  })
})


containers.forEach(container => {

  container.addEventListener('dragover', e => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    container.appendChild(draggable);
  })

  container.addEventListener('dragend', () => {
    
    container.parentElement.firstElementChild.removeAttribute('draggable');
    //container.parentElement.firstElementChild.firstElementChild.removeAttribute('draggable');
    container.parentElement.firstElementChild.classList.remove('draggable');
    container.parentElement.firstElementChild.firstElementChild.classList.add('undraggable');
    console.log(container.parentElement.firstElementChild.firstElementChild)
  })
})

