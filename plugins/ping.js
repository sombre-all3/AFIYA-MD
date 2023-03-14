const { command ,isPrivate} = require("../lib/");

/* Copyright (C) 2022 SUHAID-BRO.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Afiya-md
*/

command(
  {
    pattern: "ping",
    fromMe: isPrivate,
    desc: "To check ping",
    type: "user",
  },
  async (message, match) => {
    const start = new Date().getTime();
    await message.sendMessage("```PING```!");
    const end = new Date().getTime();
    return await message.sendMessage(
      "```PONG!``` " + (end - start) + " ᴍs"
    );
  }
);
