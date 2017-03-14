var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var fruitSelector = document.getElementById('fruit');
var vegetableSelector = document.getElementById('vegetable');
t.board('members').then(function(data){
  console.log(data)
})
t.render(function(){

  return Promise.all([
    t.get('board', 'shared', 'fruit'),
    t.get('board', 'private', 'vegetable'),
  ])
  .spread(function(savedFruit, savedVegetable){
    if(savedFruit && /[a-z]+/.test(savedFruit)){
      fruitSelector.value = savedFruit;
    }
    if(savedVegetable && /[a-z]+/.test(savedVegetable)){
      vegetableSelector.value = savedVegetable;
    }
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

document.getElementById('save').addEventListener('click', function(){
  return t.set('board', 'private', 'vegetable', vegetableSelector.value)
  .then(function(){
    return t.set('board', 'shared', 'fruit', fruitSelector.value);
  })
  .then(function(){
    t.closePopup();
  })
})
