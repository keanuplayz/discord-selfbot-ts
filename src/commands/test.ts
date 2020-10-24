module.exports.run = async (client: any, message: any, args: any) => {
  message.reply(message.author.avatarURL);
};

module.exports.config = {
  name: "avatar",
  noalias: "No aliases",
  aliases: [],
  usage: ".avatar",
  description: "Gives you your avatar.",
  accessibleby: "Members",
};
