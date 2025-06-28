const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0w1R25iQWFRc1RQM3g4OWRxdUZHUi9oQXp2eW4wV1I5eitLSmlQZzRWdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjB5RWlZUWFBRWZ2bU1ZS3dLbTJ2bUIrdzNtNnZpajFpanh5NXRRcWxVZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTTU5QXNDMFFqb0lKVHg0SFdkTmZEemN1STN1QjY5TDMzd0tzZDFwS0hJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHUVhXRUxlSHIyN1dqU2JQUXVBMzkwRTlRc2JYSWFDSlZVNmtKRkNkcjBZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdDeExYZzlVKzVxVHNZT0xRN1NnTldoQmUvcWV4WG5rSDlpU1VDbERBRjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFUQlR0V1pCSlJPRWlRYlZjeEI0eWFZckNRajFob2hWT3JYaitVOHVkbVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05qWjdENDViWGFWcmRzTEVKM0lBemNjRUVOT2Y0Q2xXaDRKMkI1S0NGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTdtRkVvdEgwMHIzZjErM2cybE1xTEtIMUlJQzlHU2F6SW1ibUhrdEdVVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im4wVkhDMGtkNldWaXBJclJiY0JROU56QjY3RG9nWXg2QjFWcjhOYWJYa1VRYWxDVXpqZjZmL0FEOFVPNTI0b2ZYbm00aVBuRlJ5amFsb0F5bWt0WWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiJHbWppeURQMkdWcFI5QXprVmhhTi9MRjgzR3hNcDA3MTUrVWVqRGJwVEpRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJiSzlKS3dxWVEwcTFTT1pEalhPd1ZRIiwicGhvbmVJZCI6ImJkMjJjYWI0LTNjMmMtNDM5Mi1hYTI4LTdiZGMzODFlMTkzNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvUkRQeTNPSjZFVnFpZlJkKzRrZkl1YUdsR2M9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1c0SmRaME8rYWwyL21yUDAvTDkrU3VoVWV3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFCQ0QxMjM0IiwibWUiOnsiaWQiOiI1MDkzNTk0NzMwNzo5QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTgyNzg1NjA0MDgzODUxOjlAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLVE1qamNRbEpPQXd3WVlCQ0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI0dVhCWlNxRzljcC91Qit2c0lQV1FCMXdhUTEzMEtMQU5oRlJ1NVR2Rm53PSIsImFjY291bnRTaWduYXR1cmUiOiI4TGRxb3M5cTNvOElTK1lpOWpucVN4MHRDY1c4aVlQdFVESTZiR1JtMXg2cHZ1ZTNTU2IzWmJibGNhNFJuVUh3QUhLaHFmbzE0MVFvaHFuRmZCK0dDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNDZpaEllVlQvOG5NMFQ3K2dMeEh5OHg3eDJFeVVDVlJCa3RLZ0pIMkdmUHR2L0ovSjUwSjBIdktYV0dxT1M3alNHQkMwcWsrZC80alViYWNTdmpNaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDkzNTk0NzMwNzo5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVMbHdXVXFodlhLZjdnZnI3Q0Qxa0FkY0drTmQ5Q2l3RFlSVWJ1VTd4WjgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTEyNDM4NSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEK3IifQ==',
    PREFIXE: process.env.PREFIX || "🧛",
    OWNER_NAME: process.env.OWNER_NAME || "𝐖𝐎𝐋𝐕𝐄𝐒 ＬＯＲＥＮＺＯ🧛",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "50935947307",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
