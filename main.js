require.config({
  paths: {
    jquery: 'https://cdn.bootcss.com/jquery/3.4.1/jquery',
    Mustache: 'https://cdn.bootcss.com/mustache.js/3.1.0/mustache'
  },
  shim: {
    'Mustache': {
      exports: 'Mustache'
    }
  }
});
require(['jquery', 'Mustache'], function($, Mustache) {
  $(':button').on('click', function() {
    let value = $('select').val();
    $.ajax({
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'abc',
      url: 'http://127.0.0.1:8081/de2.js?value=' + value,
      success: function(res) {
        function emptyResult() {
          if (this.status === 1) {
            return function (text, render) {
              return render(text);
            };
          } else {
            return function (text, render) {
              return '<li>抱歉，查无此人</li>';
            };            
          }          
        }
        res = { ...res, emptyResult };
        $.get('./de3.html', function(templates) {
          let template = $(templates).html();
          let html = Mustache.render(template, res);
          $('#result').html(html);
        })
      }
    })
  })
})