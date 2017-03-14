var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
  t.board('members').then(function(d){
    console.log('members', d)
  })
t.render(function(){
  return Promise.all([
    t.get('card', 'shared', 'po'),
    t.board('members')
  ])
  .spread(function(savedPo, members){
    console.log('render inside members',members)

    d3.select('#project-owner')
      .selectAll('options')
      .data(members)
      .append('option')
      .property('value', function(d){return d.id})
      .text(function(d){
        return d.fullName
      })
      d3.select('#project-owner').property('value', savedPo || '')
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

d3.select('#save')
  .on('click', function() {
    t.set('card', 'shared', 'po', d3.select('#project-owner').property('value'))
      .then(function(){
        t.closePopup()
      })
})
