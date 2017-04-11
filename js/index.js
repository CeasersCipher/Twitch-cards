var channels = ['esl_csgo','summit1g', 'riotgames', 'syndicate','nightblue3','bennyfits'];

function getChannelInfo() {
  channels.forEach(function(channel) {
    function makeURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };
    $.getJSON(makeURL("streams", channel), function(data) {
      var game,
          status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      
      
      $.getJSON(makeURL("channels", channel), function(data) {
        var logo = data.logo != null ? data.logo : "https://dummyimage.com/250x330/C5919/000000&text=TsavWasHere",
          name = data.display_name != null ? data.display_name : channel,
          description = status === "online" ? ': ' + data.status : "";
          html = '<div class="info-card ' + 
          status + '"><div class="front"><img src="' + 
          logo + '" class="logo"><p>Currently: ' + status + '</div><div class="back col" id="name"></br> '+'<a href="' + 
          data.url + '" target="_blank">' + 
          name + '</a><div class="col-xs-3" id="streaming">'+ 
          description + '</hr></span></div></div></div>';
        status === "online" ? $("#streamerCards").prepend(html) : $("#streamerCards").append(html);
      });
    });
  });
};

$(document).ready(function() {
  getChannelInfo();
  
  
});