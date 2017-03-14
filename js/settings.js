var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var areas = [{
  id: 'internal',
  text: 'Internal'
},{
  id: 'usa',
  text: 'USA'
},{
  id: 'ita',
  text: 'ITA'
},{
  id: 'eu',
  text: 'EU'
}]
var DATE_FORMAT= 'YYYY-MM-DD'
var PROJECT_OWNER_SELECTOR = '#project-owner'
var AREA_SELECTOR = '#area'
var selectedDate = null
var picker = null

t.render(function(){
  return Promise.all([
    t.get('card', 'shared', 'projectOwner'),
    t.get('card', 'shared', 'area'),
    t.get('card', 'shared', 'startDate'),
    t.board('members')
  ])
  .spread(function(savedPo, savedArea, savedStartDate, existingMembers){
    console.log(savedPo, savedArea, savedStartDate, existingMembers)
    renderOptions(existingMembers.members, PROJECT_OWNER_SELECTOR,savedPo,'id','fullName')
    renderOptions(areas, AREA_SELECTOR,savedArea,'id','text')
    selectedDate = savedStartDate
    picker = renderDatePicker(selectedDate, function(d){
      selectedDate = d
    })
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});


function renderOptions(list, id, selected, valueProperty, textProperty) {
  var defaultValue = {}
  defaultValue[valueProperty] = ''
  defaultValue[textProperty] = '---'
  list.unshift(defaultValue)
  var selector = d3.select(id)

  selector.selectAll('option')
    .data(list)
    .enter()
    .append('option')
    .property('value', function(d){
      return d[valueProperty]
    })
    .text(function(d){
      return d[textProperty]
    })
  selector.property('value', selected || '')
}

function renderDatePicker(defaultDate, callback){
  return new Pikaday({
    field: document.getElementById('datepicker'),
    format: DATE_FORMAT,
    position: 'bottom right',
    defaultDate: moment(defaultDate, DATE_FORMAT).toDate(),
    setDefaultDate: true,
    onSelect: function() {
      callback(this.getMoment().format(DATE_FORMAT))
    }});
}



d3.select('#save')
  .on('click', function() {
    var selectedPO = d3.select(PROJECT_OWNER_SELECTOR).property('value')
    var selectedArea = d3.select(AREA_SELECTOR).property('value')
    console.log(selectedDate)
    console.log(selectedPO)
    console.log(selectedArea)
    return t.set('card', 'shared', 'projectOwner',selectedPO)
      .then(function(){
        return t.set('card', 'shared', 'startDate',selectedDate)
      })
      .then(function(){
        return t.set('card', 'shared', 'area',selectedArea)
      })
      .then(function(){
        t.closePopup()
      })
})
