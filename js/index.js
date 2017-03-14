
TrelloPowerUp.initialize({
  'card-buttons': function (t, options){
    return [{
      icon: './assets/logo.png',
      text: 'Accurat Agile',
      callback: function(t){
        return t.popup({
          title: 'Project Roles and Times',
          url: './settings.html',
          height: 184
        })
      }
    }]
  }
})
