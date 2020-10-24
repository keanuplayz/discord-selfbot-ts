var d = function d() {
    return new Date();
}
import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";
import { Client, Collection } from "discord.js";
import fs from 'fs';
const config = require("./config.json")
const os = require('os')
const PREFIX = "%";

var client = new Client();

function botstartupmode() {
    try {
        var TOKEN = config.token;
        client.login(TOKEN)
    } catch (err) {
        console.log("Error logging in: " + err)
    }
}

/// @ts-ignore
client.commands = new Collection()
/// @ts-ignore
client.aliases = new Collection()

fs.readdir("./dist/commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    return console.log("[LOGS] Couldn't find commands!");
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    /// @ts-ignore
    client.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach((alias: any) => {
      /// @ts-ignore
      client.aliases.set(alias, pull.config.name);
    });
  });
});

client.on("ready", async function () {
    console.log(" ")
    console.log("*---------------------*")
    console.log("Started selfbot for " + client.user?.tag)
    console.log(`Prefix is: ${PREFIX}`)
    if (os.platform == "linux") console.log("I'm running on Linux...")
    if (os.platform == "win32") console.log("I'm running on Windows...")
    console.log("Time: " + d())
    client.user?.setStatus("online");
});

/// @ts-ignore
client.on('message', async (message) => {
    if (message.author.tag !== client.user?.tag) return;

    let prefix = ".";
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift()?.toLowerCase();
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let commandfile =
      /// @ts-ignore
      client.commands.get(cmd.slice(prefix.length)) ||
      /// @ts-ignore
      client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) commandfile.run(client, message, args);

});

botstartupmode();