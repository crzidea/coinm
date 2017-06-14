const API_ROOT = 'https://coinm.crzidea.com'
let render
fetch(`${API_ROOT}/coinm.json`)
.then(response => response.json())
.then((data) => {
  console.log(data);
  data.leader = data.bots[0]
  data.leader.statistics.info.funds.freezed.cny =
    Number(data.leader.statistics.info.funds.freezed.cny).toFixed(2)
  data.leader.statistics.info.funds.free.cny =
    Number(data.leader.statistics.info.funds.free.cny).toFixed(2)
  data.prediction = (
    Number(data.leader.statistics.info.funds.free.cny)
    + data.bots.reduce((sum, bot) => sum + bot.allocated, 0)
  ).toFixed(2)
  for (const bot of data.bots) {
    shiftField('free')
    shiftField('freezed')
    bot.reserved  = bot.reserved.toFixed(2)
    bot.allocated = bot.allocated.toFixed(2)
    bot.available = bot.available.toFixed(2)
    bot.total     = bot.total.toFixed(2)
    function shiftField(field) {
      bot[field] =
        Number(bot.statistics.info.funds[field][bot.options.token])
        .toFixed(3)
    }
  }

  data.date = new Date(data.date).toLocaleString()
  $(window.container).html(render(data));
})
const source = $("#entry-template").html();
render = Handlebars.compile(source);
