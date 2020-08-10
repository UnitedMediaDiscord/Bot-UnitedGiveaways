const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const web2hook = new Discord.WebhookClient(process.env.WEBHOOK1, process.env.WEBHOOK2);

var express = require('express');
var app = express();

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

//console.log ping recieved from Uptimebot (used to keep project online even after 5 minutes of innactivity)
const http = require('http');
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

client.on('ready', () => {
    console.log(`United Giveaways Online`);
    client.user.setActivity(`Giveaways | ${config.prefix}help`, { type: "WATCHING" });
});

client.on('guildCreate', guild => {
	client.channels.get('456344354596847618').send(`**Server Join Message**
     **Server Name:** \`${guild.name}\`
     **Member Count:** ${guild.memberCount} users`);
	
});

client.on('guildDelete', guild => {
    client.channels.get('456344354596847618').send(`**Server Leave Message**
     **Server Name:** \`${guild.name}\`
     **Member Count:** ${guild.memberCount} users`);
	
});

function uptime() {
    var date = new Date(client.uptime);
    var strDate = '';
    strDate += date.getUTCDate() - 1 + " days, ";
    strDate += date.getUTCHours() + " hours, ";
    strDate += date.getUTCMinutes() + " minutes";
    return strDate;
}

client.on('message', message => {
    var args = message.content.split(/[ ]/);
    var command = args[0].slice(config.prefix.length).toLowerCase();
  
    if(!message.content.startsWith(config.prefix)) return;
//      commands below

      if(command === "help"){
          message.channel.send(`
          Hey There, Im United Giveaways Bot, I help u get connected to the network!

          ${config.prefix}setup - This command will run you through the setup wizard,
          
          ${config.prefix}support - This command will DM you an invite to our support server
          ${config.prefix}invite - This command will DM you a link to add me to your server

          `)
      }

      if(command === "invite"){
        message.channel.send(`I have sent you a DM with a link to invite me to your server`)
        message.author.send(`Invite me to your server with this link: https://discordapp.com/oauth2/authorize?client_id=456128211378503710&scope=bot&permissions=536923136`)
    }

      if(command === "support"){
          message.channel.send(`I have sent you a DM with an invite to my support server`)
          message.author.send(`Invite to United Giveaways Support Server: https://discord.gg/tvdUa3W `)
      }


      if(command === "setup") {
          message.channel.send(`Welcome to the United Giveaways Setup Wizard!
You first need to pick a channel where to send the giveaway messages, usually people make a channel named Giveaways
          
Then in that channel make sure the United Giveaways bot has perms to talk in the channel and create & modify webhooks

In that channel, use the command \`ug!setup-start\` and the bot will connect you to the network **You require the Administrator permission to run this command*
          
If you ever need the channel changed or you want to remove United Giveaways please contact the bot developer DamonOnYT#5465 or ask us on our support server which can be found by using the command \`ug!support\``)
      }


      if(command === "setup-start") {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
          return message.reply('Sorry, You require the Administrator permission to run the setup');
        } else {
          message.channel.send(`Adding your server to the network!`)
          message.channel.createWebhook("United_Giveaways", "https://i.imgur.com/YPwxY1c.jpg")
          .then(webhook => webhook.edit("United_Giveaways", "https://i.imgur.com/YPwxY1c.jpg")
          .then(wb => web2hook.send(`<@&458231574228369409> **New United Giveaways Server**
          **Server Name:** ${message.guild.name}
          **Server ID:** ${message.guild.id}
          **Server Membercount (Includes Bots):** ${message.guild.memberCount}

          **Server Owner:** ${message.guild.owner}
          **Server Owner ID:** ${message.guild.ownerID}

          **Webhook Link:** https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`)).catch(console.error))
          message.channel.send(`Completed! Your server is now connected to the United Giveaways Network! All giveaway messages will be sent to this channel! `)
        }
    }

    if(command === "restart") {
        if(message.author.id !== config.owner && message.author.id !== config.damon)
        return message.channel.send('Sorry, Only United Giveaways Developers have permission to run this command');
        message.reply('Restarting').then(() => process.exit(0));
    }
  
    if(command === "credits") {
      message.channel.send("I have been coded by 2 amazing devs. They are - <@200511039622742016> (who coded the front end, i.e. all the bot commands) and <@201320090535329792> (who coded the back-end, i.e. the code that tells me how to find and share giveaways). If you want to support us, please consider joining my support server by sending `ug!support` command.\nP.S. I am a part of the United group of bots.");
    }
  
      if(command === "info") {
		    var embed = new Discord.RichEmbed()
          .setAuthor("Bot Info")
          .setDescription("I send giveaways to your discord server :D")
          .addField("Library", "Discord.js", true)
          .addField("Ping", `${client.ping}ms`, true)
          .addField("Servers", `${client.guilds.size}`, true)
          .addField("Uptime", `${uptime()}`, true)
          .addField("Prefix", "ug!", true)
		      .addField("Support Server", `[Click here](https://discord.gg/tvdUa3W)`, true)
			    .addField("Invite Me", "[Click here](https://discordapp.com/oauth2/authorize?client_id=456128211378503710&scope=bot&permissions=536923136)", true)
		      .setFooter("Made with love by DamonOnYT#5465 and Master Adit ᵛᵉʳᶦᶠᶦᵉᵈ#8368. Send `ug!credits` for more info.")
          .setColor("#1E90FF");
          message.channel.send({embed});
      };
  
  //please change the indentation. I can't do it here because I am using mobile.
  if(command === "check") {
   message.channel.send("checking!");
    if(message.guild.me.hasPermission("MANAGE_WEBHOOKS" === true)) {
      message.channel.send("Yep!");
    } else {
      message.channel.send("nope");
    }
  }
  //Trying to check if the bot has embed perms.
  //doesn't work
  
    if(command === "test") {
    // Create a new role with data
message.guild.createRole({
  name: 'Super Cool People',
  color: 'BLUE',
})
  .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
  .catch(console.error)
  }


});
client.login(config.token);