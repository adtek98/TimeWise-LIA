const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const childcontainers = document.querySelectorAll('.childcontainer');




draggables.forEach(draggable => {
  var previousContainer;
  var childContainerHolder
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
    previousContainer = draggable.parentElement;

    // Deletes the childcontainer if there is no parent
    if(previousContainer.classList[0] == 'container' && previousContainer.parentElement.querySelector('.childcontainer').childElementCount == 0){
      childContainerHolder = previousContainer.parentElement.querySelector('.childcontainer');
      previousContainer.parentElement.querySelector('.childcontainer').remove();
    }

    if(draggable.parentElement.classList[0] == 'childcontainer'){
      document.querySelector('.invisible').classList.remove('invisible');
    }
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');

    // Adds childcontainer if parent exists
    if(draggable.parentElement.classList[0] == 'container'){
      draggable.parentElement.parentElement.appendChild(childContainerHolder);
    }

    if(previousContainer.classList[0] == 'container' && draggable.parentElement.classList){
      previousContainer.parentElement.classList.add('invisible');
    }

    // Makes parent element undraggable if it has childrens
    MakeUndraggable(draggable);

    // Makes parent element draggable if it has no childrens
    MakeDraggable(previousContainer);

    // makes the icon smaller if its in a child container // makes the icon bigger if its in a parent container
    ConvertToChildOrParent(draggable)

  })
})


containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');

    if(container.childElementCount == 0){
      container.appendChild(draggable);
    }
  })
})

childcontainers.forEach(childcontainer => {
  childcontainer.addEventListener('dragover', e => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');

    childcontainer.appendChild(draggable);

  })
})

// Makes parent element undraggable if it has childrens
function MakeUndraggable(draggable) {
  if(draggable.parentElement.childElementCount == 1 && draggable.parentElement.classList[0] == 'childcontainer'){
    draggable.parentElement.parentElement.firstElementChild.firstElementChild.classList.remove('draggable');
    draggable.parentElement.parentElement.firstElementChild.firstElementChild.classList.add('undraggable');
    draggable.parentElement.parentElement.firstElementChild.firstElementChild.removeAttribute('draggable')
  }
  else return;
}

// Makes parent element draggable if it has no childrens
function MakeDraggable(previousContainer){
  if(previousContainer.classList[0] == 'childcontainer' && previousContainer.childElementCount == 0){
    previousContainer.parentElement.firstElementChild.firstElementChild.classList.add('draggable');
    previousContainer.parentElement.firstElementChild.firstElementChild.classList.remove('undraggable');
    previousContainer.parentElement.firstElementChild.firstElementChild.setAttribute('draggable', 'true')
  }
  else return;
}

// makes the icon smaller if its in a child container // makes the icon bigger if its in a parent container
function ConvertToChildOrParent(draggable){
  if(draggable.parentElement.classList[0] == 'childcontainer'){ 
    draggable.firstElementChild.classList.add('menuitemSm');
    draggable.firstElementChild.classList.add('m-1');
    draggable.firstElementChild.firstElementChild.classList.remove('mt-3');
  }
  
  if(draggable.parentElement.classList[0] == 'container' ){ 
    draggable.firstElementChild.classList.remove('menuitemSm');
    draggable.firstElementChild.classList.remove('m-1');
    draggable.firstElementChild.firstElementChild.classList.add('mt-3');
  }
}
