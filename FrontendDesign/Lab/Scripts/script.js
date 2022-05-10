const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const childcontainers = document.querySelectorAll('.childcontainer');
//const typecontainers = document.querySelectorAll('.typecontainer')

var previousContainer;

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
    previousContainer = draggable.parentElement;
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');

    // Makes parent element undraggable if it has childrens
    MakeUndraggable(draggable);

    // Makes parent element draggable if it has no childrens
    MakeDraggable(previousContainer);

    // makes the icon smaller if its in a child container
    ConvertToChild(draggable)

    // makes the icon bigger if its in a parent container
    ConvertToParent(draggable);
  })
})


containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');

    if(container.childElementCount == 0){
      container.appendChild(draggable);
      //container.parentElement.querySelector('.childcontainer').classList.remove('childcontainer');
    }
  })
})

childcontainers.forEach(childcontainer => {
  childcontainer.addEventListener('dragover', e => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    if(childcontainer.parentElement.firstElementChild.childElementCount == 1 && previousContainer.parentElement.id != childcontainer.parentElement.id){
      childcontainer.appendChild(draggable);
    }
    
  })
})




function MakeUndraggable(draggable) {
  if(draggable.parentElement.childElementCount == 1 && draggable.parentElement.classList[0] == 'childcontainer'){
    draggable.parentElement.parentElement.firstElementChild.firstElementChild.classList.remove('draggable');
    draggable.parentElement.parentElement.firstElementChild.firstElementChild.classList.add('undraggable');
    draggable.parentElement.parentElement.firstElementChild.firstElementChild.removeAttribute('draggable')
  }
  else return;
}

function MakeDraggable(previousContainer){
  if(previousContainer.classList[0] == 'childcontainer' && previousContainer.childElementCount == 0){
    previousContainer.parentElement.firstElementChild.firstElementChild.classList.add('draggable');
    previousContainer.parentElement.firstElementChild.firstElementChild.classList.remove('undraggable');
    previousContainer.parentElement.firstElementChild.firstElementChild.setAttribute('draggable', 'true')
  }
  else return;
}

function ConvertToChild(draggable){
  if(draggable.parentElement.classList[0] == 'childcontainer'){ 
    draggable.firstElementChild.classList.add('menuitemSm');
    draggable.firstElementChild.classList.add('m-1');
    draggable.firstElementChild.firstElementChild.classList.remove('mt-3');
  }
  else return;
}

function ConvertToParent(draggable){
  if(draggable.parentElement.classList[0] == 'container' ){ 
    draggable.firstElementChild.classList.remove('menuitemSm');
    draggable.firstElementChild.classList.remove('m-1');
    draggable.firstElementChild.firstElementChild.classList.add('mt-3');
  }
}