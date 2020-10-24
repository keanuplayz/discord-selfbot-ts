import * as Discord from "discord.js";

module.exports.run = async (client: any, message: any, args: any) => {
    const uMention = message.mentions.users.first()
    const embed = new Discord.RichEmbed();
    if (uMention) {
        /// @ts-ignore
        embed.setAuthor(uMention.tag, uMention.avatarURL)
        embed.addField("User ID", uMention.id, true)
        message.delete()
        message.channel.send(embed)
    }
    else {
        embed.setAuthor(message.author.tag, message.author.avatarURL)
        embed.addField("User ID", message.author.id, true)
        message.delete()
        message.channel.send(embed)
    }
};

module.exports.config = {
  name: "userinfo",
  noalias: "No aliases",
  aliases: [],
  usage: ".userinfo <mention>",
  description: "Shows info about a user.",
  accessibleby: "Members",
};
