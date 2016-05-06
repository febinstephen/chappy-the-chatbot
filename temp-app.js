
var restify = require('restify');
var builder = require('botbuilder');
//var helloBot = new builder.TextBot();
var helloBot = new builder.BotConnectorBot();
var server = new restify.createServer();

helloBot.add('/', new builder.CommandDialog()
    .matches('^set name', builder.DialogAction.beginDialog('/profile'))
    .matches('^quit', builder.DialogAction.endDialog())
    .onDefault(function (session) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            session.send('Hello %s!', session.userData.name);
        }
    }));

helloBot.add('/profile', [
    function(session) {
        if (session.userData.name) {
            builder.Prompts.text(session, 'what would you like to change it to?')
        } else {
            builder.Prompts.text(session, 'Hi, whats your name?')
        }
    },
    function(session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);


server.use(helloBot.verifyBotFramework({ appid: 'you id', appsecret: 'your secret'}));
server.post('/v1/messages', helloBot.listen());

server.listen(8080, function (){
    console.log('%s listening %s', server.name, server.url);
});

//helloBot.listenStdin();
