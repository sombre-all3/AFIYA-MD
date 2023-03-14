const config = require("../config");
const { command, isPrivate, errorMessage } = require("../lib/");
const { isAdmin, parsedJid, isUrl, isPublic } = require("../lib");
const { cron, saveSchedule } = require("../lib/scheduler");
command(
  {
    pattern: "add ?(.*)",
    fromMe: true,
    desc: "Adds a person to group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to add");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_I'm not admin_");
    let jid = parsedJid(match);
    await message.add(jid);
    return await message.reply(`@${jid[0].split("@")[0]} added`, {
      mentions: jid,
    });
  }
)

command(
  {
    pattern: "kick",
    fromMe: true,
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("```This command is for group only```");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("𝙈𝙀𝙉𝙏𝙄𝙊𝙉 𝙐𝙎𝙀𝙍 𝙏𝙊 𝙆𝙄𝘾𝙆");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("I𝙈 𝙉𝙊𝙏 𝘼𝙉 𝘼𝘿𝙈𝙄𝙉");
    let jid = parsedJid(match);
    await message.kick(jid);
    return await message.reply(`@${jid[0].split("@")[0]} 𝘠𝘖𝘜 𝘏𝘈𝘝𝘌 𝘉𝘌𝘌𝘕 𝘒𝘐𝘊𝘒𝘌𝘋 𝘖𝘜𝘛𝘌𝘙 𝘋𝘈 𝘎𝘙𝘖𝘜𝘗`, {
      mentions: jid,
    });
  }
);

command(
  { 
    pattern: "invite", 
    fromMe: true, 


    type: "group",
  },
  async (message, client) => {
    if (!message.client.isCreator) { global.catchError = true; return await client.sendMessage( message.from, { text: errorMessage(config.reply.owner) }, { quoted: message } ); };
    if (!message.isGroup) { global.catchError = true; return await client.sendMessage( message.from, { text: errorMessage(config.reply.group) }, { quoted: message } ); };
    try {
        const code = await client.groupInviteCode(message.from);
        await client.sendMessage( message.from, { text: `🔗 Group Link: https://chat.whatsapp.com/${code}` }, { quoted: message } );
        global.catchError = false;
    }  catch (err) {
        global.catchError = true
        await client.sendErrorMessage( message.from, err, message.key, message );
    };
    }
  );

command(
  {
    pattern: "promote",
    fromMe: true,
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("𝙏𝙃𝙄𝙎 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙄𝙎 𝙁𝙊𝙍 𝙂𝙍𝙊𝙐𝙋 𝙊𝙉𝙇𝙔");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("𝙈𝙀𝙉𝙏𝙄𝙊𝙉 𝙐𝙎𝙀𝙍 𝙏𝙊 𝙋𝙍𝙊𝙈𝙊𝙏𝙀");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("𝙄𝙈 𝙉𝙊𝙏 𝘼𝙉 𝘼𝘿𝙈𝙄𝙉");
    let jid = parsedJid(match);
    await message.promote(jid);
    return await message.reply(`@${jid[0].split("@")[0]} 𝘗𝘙𝘖𝘔𝘖𝘛𝘌𝘋 𝘈𝘚 𝘈𝘕 𝘈𝘋𝘔𝘐𝘕`, {
      mentions: jid,
    });
  }
);

command(
  {
    pattern: "demote",
    fromMe: true,
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("𝙏𝙃𝙄𝙎 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙄𝙎 𝙁𝙊𝙍 𝙂𝙍𝙊𝙐𝙋 𝙊𝙉𝙇𝙔");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("𝙈𝙀𝙉𝙏𝙄𝙊𝙉 𝙐𝙎𝙀𝙍 𝙏𝙊 𝘿𝙀𝙈𝙊𝙏𝙀");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("I𝙈 𝙉𝙊𝙏 𝘼𝙉 𝘼𝘿𝙈𝙄𝙉");
    let jid = parsedJid(match);
    await message.demote(jid);
    return await message.reply(`@${jid[0].split("@")[0]} 𝘋𝘌𝘔𝘖𝘛𝘌𝘋 𝘈𝘚 𝘈𝘕 𝘈𝘋𝘔𝘐𝘕`, {
      mentions: jid,
    });
  }
);

command(
  {
    pattern: "mute",
    fromMe: true,
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("𝙏𝙃𝙄𝙎 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙄𝙎 𝙁𝙊𝙍 𝙂𝙍𝙊𝙐𝙋 𝙊𝙉𝙇𝙔");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("𝙄𝙈 𝙉𝙊𝙏 𝘼𝙉 𝘼𝘿𝙈𝙄𝙉");
    await message.reply("_Muting_");
    return await client.groupSettingUpdate(message.jid, "announcement");
  }
);

command(
  {
    pattern: "unmute",
    fromMe: true,
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("𝙏𝙃𝙄𝙎 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙄𝙎 𝙁𝙊𝙍 𝙂𝙍𝙊𝙐𝙋 𝙊𝙉𝙇𝙔");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("𝙄𝙈 𝙉𝙊𝙏 𝘼𝙉 𝘼𝘿𝙈𝙄𝙉");
    await message.reply("_Unmuting_");
    return await client.groupSettingUpdate(message.jid, "not_announcement");
  }
);

command(
  {
    pattern: "tagall ?(.*)",
    fromMe: true,
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return;
    const { participants } = await message.client.groupMetadata(message.jid);
    let teks = 
``;
    let count= `│×:`;
    for (let mem of participants) {
      teks += ` ${count} @${mem.id.split("@")[0]}\n`;
    }
       teks += ``;
    message.sendMessage(teks.trim(), {
      mentions: participants.map((a) => a.id),
    });
  }
);

command(
  {
    on: "text",
    fromMe: false,
  },
  async (message, match) => {
    if (!message.isGroup) return;
    if (config.ANTILINK)
      if (isUrl(match)) {
        await message.reply("𝙇𝙄𝙉𝙆 𝘿𝙀𝙏𝙀𝘾𝙏𝙀𝘿");
        let botadmin = await isAdmin(message.jid, message.user, message.client);
        let senderadmin = await isAdmin(
          message.jid,
          message.participant,
          message.client
        );
        if (botadmin) {
          if (!senderadmin) {
            await message.reply(
              `_Commencing Specified Action :${config.ANTILINK_ACTION}_`
            );
            return await message[config.ANTILINK_ACTION]([message.participant]);
          }
        } else {
          return await message.reply("𝙄𝙈 𝙉𝙊𝙏 𝘼𝙉 𝘼𝘿𝙈𝙄𝙉");
        }
      }
   }
)
