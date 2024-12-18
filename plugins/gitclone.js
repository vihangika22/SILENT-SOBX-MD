//CREATED BY NOTHING ✅😜
//NUMBER  +93744215959
const {cmd} = require('../command');
const axios = require('axios');
const fetch = require('node-fetch');

cmd({
    pattern: "gitclone",
    alias: ["git"],
    desc: "Download GitHub repository as a zip file.",
    react: "📦",
    category: "downloader",
    filename: __filename
},
async (conn, mek, m, { from, quoted, args, reply }) => {
    if (!args[0]) {
        return reply(`Where is the GitHub link?\n\nExample:\n.gitclone https://github.com/TraderAn-King/BEN_BOT-V1`);
    }

    if (!/^(https:\/\/)?github\.com\/.+/.test(args[0])) {
        return reply("⚠️ Invalid GitHub link.");
    }

    try {
        let regex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
        let [, user, repo] = args[0].match(regex) || [];
        if (!user || !repo) throw new Error("Invalid GitHub URL.");
        let apiUrl = `https://api.github.com/repos/${user}/${repo}/zipball`;
        let response = await fetch(apiUrl, { method: "HEAD" });
        let filename = response.headers
            .get("content-disposition")
            .match(/filename=(.*)/)[1];
        
        reply(`📥 Downloading repository...\n\nRepository: ${user}/${repo}\nFilename: ${filename}`);

        await conn.sendMessage(from, {
            document: { url: apiUrl },
            fileName: `${filename}.zip`,
            mimetype: "application/zip"
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply("❌ Failed to download the repository. Please try again later.");
    }
});
