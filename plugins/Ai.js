/*
   CREATED BY SUHAID-BRO
 */
const {command, isPrivate, getJson} = require("../lib");

command({
  pattern: 'ai ?(.*)',	
  fromMe: isPrivate,
  type: 'misc',
}, 
async (message, match) => {
if (!match) return await message.sendMessage("_Example:Ai Who is afiya-md_");
var api = await getJson(`https://mfarels.my.id/api/openai?text=${match}`)

await message.reply(api.result);

});
