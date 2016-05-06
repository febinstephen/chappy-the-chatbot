//var restify = require('restify');
var builder = require('botbuilder');
var helloBot = new builder.TextBot();
var dialog = new builder.CommandDialog();
//var helloBot = new builder.BotConnectorBot();
//var server = new restify.createServer();

helloBot.add('/', dialog);

/* -------------------
English 101 -> Room 205
English 102 -> Room 309
Math 301 -> Room 705
Math 302 -> Room 704

And Timings:

English 101 -> Mon 8 AM, Tuesday 9 AM
English 102 -> Tues 8 Am, Wed 9 AM
Math 301 -> Wed 8 AM, Friday 9 AM
Math 302 -> Frday 8 AM, Thursday 1PM
--------------------------------- */
var dict = {'English 101?': 'Room 205', 'English 102?': 'Room 309',
 'Math 301': 'Room 705', 'Math 302': 'Room 704'};

var str = "";



dialog.matches('^When is English 101?', builder.DialogAction.send('At Mon 8 AM, Tuesday 9 AM'));
dialog.matches('^When is English 102?', builder.DialogAction.send('At Tues 8 Am, Wed 9 AM'));
dialog.matches('^When is Math 301?', builder.DialogAction.send('At Wed 8 AM, Friday 9 AM'));
dialog.matches('^When is Math 302?', builder.DialogAction.send('At Frday 8 AM, Thursday 1PM'));

/*
dialog.matches('^Where is English 101?', builder.DialogAction.send('In Room 205'));
dialog.matches('^Where is English 102?', builder.DialogAction.send('In Room 309'));
dialog.matches('^Where is Math 301?', builder.DialogAction.send('In Room 705'));
dialog.matches('^Where is Math 302?', builder.DialogAction.send('In Room 704'));
*/

dialog.matches(str = process.stdin.read(), builder.DialogAction.send(dict[str.slice(9)]));
//console.log(str.slice(9));
//str = "";
dialog.matches('^Where is Math 302?', builder.DialogAction.send('In Room 704'));


dialog.onDefault(builder.DialogAction.send("I'm sorry. I didn't understand."));


//server.use(helloBot.verifyBotFramework({ appid: 'you id', appsecret: 'your secret'}));
//server.post('/v1/messages', helloBot.listen());

//server.listen(8080, function (){
//    console.log('%s listening %s', server.name, server.url);
//}); */

helloBot.listenStdin();
//console.log(str);
