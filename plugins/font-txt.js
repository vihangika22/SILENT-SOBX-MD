//CREATED BY NOTHING ✅
// BOT OWNER IS SILENT AND NOTHING 🎥
//WHATSAPP NUMBER +93744215959
const {cmd} = require('../command');
const axios = require('axios');

cmd({
    pattern: "font-txt",
    alias: ["font"],
    react: "✍️",
    desc: "Convert text into various fonts.",
    category: "tools",
    filename: __filename
}, async (conn, mek, m, {from, quoted, body, args, q, reply}) => {
    try {
        if (!q) return reply("Please provide text to convert into fonts.");
        
        let response = await axios.get(`https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(q)}`);
        let data = response.data;
        
        if (!data.status) {
            return reply("Error fetching fonts. Please try again later.");
        }

        let results = data.result.map(font => `*${font.name}:*\n${font.result}`).join("\n\n");
        reply(`Here are the styled fonts for your text:\n\n${results}`);
    } catch (error) {
        console.error(error);
        reply("An error occurred while fetching fonts.");
    }
});
