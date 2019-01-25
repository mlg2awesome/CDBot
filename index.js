const Discord = require("discord.js");
const YTDL = require("ytdl-core");

var bot = new Discord.Client();
const search = require('random-puppy')



const TOKEN = "";
const PREFIX = "??";
let em = new Discord.RichEmbed()

var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "Fucc u not telling"
];

function play(connection, message) {
    var server = message.guild.id;

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly "}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();

    });
}

var servers = {};

bot.on("ready", function() {
    console.log("ready");
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").send(member.Tostring() + "welcome to this place");

    member.addRole(member.guild.roles.find("name", "awaiting verification"));


});
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    
    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case"ping":
            message.channel.send("Pong!");
            break;
        case"info":
            message.channel.send("I am super dope");
            break;
        case"8ball":
            if (args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.send("Can't read that boi"); 
        break; 
        case "about":
            var embed = new Discord.RichEmbed()
                .addField("About me", "Hello, I am CDBot. I was created by Qwerty#2416 and my purpose is to play music and play games. If you want to know about my commands please use ??cmds")
            message.channel.send(embed);
        break;
        case "kick":
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.reply(":x: " + "| You Need The \"ADMIN\" role to kick people").catch(console.error);
          }
          if (message.mentions.users.size === 0){
            return message.reply(":x: " + "| Please Mention A User To Kick Next Time").catch(console.error);
          }
          let kickmember = message.guild.member(message.mentions.users.first());
          if(!kickmember){
            message.reply(":x: " + "| That User Does Not Seem Valid!");
          }
          if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
            return message.reply(":x: " + "| i need the \"KICK_MEMBERS\" permission!").catch(console.error);
          }
          kickmember.kick().then(member => {
            message.reply(`${member.user.username} was succesfully kicked`).catch(console.error);
          }).catch(console.error)        
        break;        
        case "rules1":
        var rules1 = new Discord.RichEmbed()
        .addField("Rules (1/1):", "---------------------------------------------------------------------------------------\n" +
                                  "__**1.**__ Please act respectfully| This Server's intention is to act calm, and not start a drama. \n" +
                                  "__**2.**__ Confused on where to go?| Direct message Moderators/Staff if you don't know where to go. |\n" +
                                  "__**3.**__ adult (18+), explicit images etc, go to the NSFW channel \n" +
                                  "__**4.**__ Do not bring salt| Do not start drama. \n" +
                                  "__**5.**__ Post your things in the right category| Just so people understand where you're heading at. | \n" +
                                  "__**6.**__ No advertising other sites/discord servers without permission. \n" +
                                  "__**7.**__  But overall, have fun| We don't want any people with salt. Please. | ", true)

        .setColor("0xFF0000")
        .setFooter("as of 21/01/2019 the rules have been updated")
             message.channel.send(rules1);
        break;
        case "ban":
        const fs = require('fs')
const config = require('config.json')


    if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send("You don't have permission to ban people. If there's someone who needs to be banned, contact an administrator or a moderator.")
    let reason = args.slice(1).join(" ");
    let member = message.mentions.members.first();
    member.ban(reason).catch(console.error)
    let kill  = new Discord.RichEmbed()
    .setTitle("CDBot Banning System")
    .setDescription(`:wave: Successfully Banned ${member.displayName} :point_right:`)
    .setColor("RED")
    .setThumbnail(bot.user.avatarURL)
    config.banreason = reason;
    fs.writeFile('../config.json', JSON.stringify(reason), (err) => console.error)
    message.channel.send({kill})

        break;
        case "boobs":


    let em = new Discord.RichEmbed()
  .setTitle("CDBot Boobs")
  .setDescription("Here's a boob pic...")
  .setFooter(`Requested by ${message.author.username}`)
  .setTimestamp()
  let key = [
    "boobs",
    "tits",
    "breasts",
    "nipple",
    "bust"
  ]
  
  if (!message.channel.nsfw) return message.channel.send(":underage: You need to be in an NSFW channel to use this command.");
  
  let res = key[Math.floor(Math.random()*key.length)]
  search(res).then(url => {
    em.setImage(url)
    message.channel.send({embed: em})
  })

        break;
        case "sexual":


    let fuck = new Discord.RichEmbed()
  .setTitle("CDBot gives you fuel")
  .setDescription("Here's a fuck pic...")
  .setTimestamp()
  .setFooter("")
  
  if (!message.channel.nsfw) return message.channel.send(":underage: You need to be in an NSFW channel to use this command.")
  
  let keys = [
    "titfuck",
    "orgy",
    "orgasm",
    "fuck",
    "pussyfuck",
    "assfuck",
    "penetration",
    "penetrate",
    "sex",
    "sexy",
    "creampie"
  ]
  
{let res = keys[Math.floor(Math.random()*keys.length)]
    search(res).then(url => {
    fuck.setImage(url)
    message.channel.send({embed: fuck})
  })}
  try {
      
  } catch (error) {
      
  }
  
        break;
        case "hackban":
        let mid = args.join(' ');
        if (!message.member.hasPermission(["BAN_MEMBERS"], false, true, true)) return message.channel.send("You don't have permission to use this command.");
          bot.fetchUser(mid).then(id => {
            message.guild.ban(id).catch(err => {
              message.channel.send("Failed to ban user "+id)
              console.log(err)
            })
            message.channel.send(`Alright, I banned the user ${id}.`)
          }).catch(() => {
            message.channel.send(`There's no user with the ID of ${mid}, please try again. :face_palm:`)
          })
      
       
        break;
        
        
        default: 
            message.channel.send("Invaild command, please use a normal command provided. If you don't know any commands use ```??help```");    
    }       

});

bot.login(TOKEN);