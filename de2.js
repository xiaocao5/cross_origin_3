const http = require("http");
const url = require("url");
http.createServer(function (req, res) {
    let personInfoList = [{
      name: 'Ted',
      profession: 'programmer',
      nationality: 'China'
    }, {
      name: 'Trump',
      profession: 'president',
      nationality: 'America'
    }, {
      name: 'Galileo',
      profession: 'scientist',
      nationality: 'Italy'
    }];
    const query = url.parse(req.url, true).query;
    const name = query.value;
    const callback = query.callback;
    let data = personInfoList.find(function(item, index, array) {
      return item.name === name;
    });
    data = data === undefined ? { status: 0 } : ({ ...data, status: 1  });
    console.log(data);
    res.writeHead(200);
    res.end(`${callback}(${JSON.stringify(data)})`);
  })
  .listen(8081);
