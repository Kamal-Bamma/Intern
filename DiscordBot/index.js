const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config(); // Load environment variables from a .env file

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Log message content when a message is created
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  message
    .reply({
      content: "Hi From Bot",
    })
    .catch(console.error); // Catch and log any errors
});

// Handle interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong..!");
  }
});

// Login to Discord using the token stored in the environment variable
client.login(process.env.DISCORD_BOT_TOKEN).catch(console.error); // Catch and log any login errors
