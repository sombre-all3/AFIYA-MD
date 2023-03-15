const { command } = require('../lib');
const {
   translate
} = require('@vitalets/google-translate-api');
const defaultLang = 'en'

     command(
      {
      pattern: "trt",
      fromMe: true,
      desc: "Chat Gpt Chat feture",
      dontAddCommandList: true,
      type: "misc",
      },
   async (message, match, m) => {

      // if (!match || !m.quoted.text) return await message.sendMessage(`📌 *Example:*\n\n*trt* <lang> [text]\n*trt* ar Hello World`)

      let args = match.split(' ')
      let lang = args[0]
      let text = args.slice(1).join(' ')
      if ((args[0] || '').length !== 2) {
         lang = defaultLang
         text = args.join(' ')
      }
      if (!text && m.quoted && m.quoted.text) text = m.quoted.text

      let result = await translate(text, {
         to: lang,
         autoCorrect: true
      }).catch(_ => null)
      message.sendMessage(result.text)

   })
