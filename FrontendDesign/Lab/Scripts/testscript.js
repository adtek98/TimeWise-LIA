(function() {
  var previousContainer;
  dragula([].slice.apply(document.querySelectorAll('.draggablecontent')), {
    direction: 'vertical',
    direction: 'horizontal',
  }).on('drag', function (el) {
    previousContainer = el.parentElement;

  }).on('drop', function (el) {
    
    if(el.parentElement.className == 'draggablecontent childcontainer row justify-content-center'){
      el.parentElement.parentElement.className = 'item parent';
    }
    if(previousContainer.className == 'draggablecontent childcontainer row justify-content-center' && previousContainer.childElementCount == 0){
      previousContainer.parentElement.className = 'item';
    }
  })
})();