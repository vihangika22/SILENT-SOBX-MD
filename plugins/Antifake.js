const config = require('../config');

// Auto-block unknown numbers
client.on('message', async (message) => {
  try {
    // Get the sender's number
    const senderNumber = message.from;

    // Check if antifake is enabled in config
    if (config.ANTI_FAKE) {
      // Check if the sender's number is from Pakistan (+92)
      if (!senderNumber.startsWith('+92')) {
        // Block the sender's number
        await client.blockContact(senderNumber);
        console.log(`Unknown number ${senderNumber} blocked!`);
      }
    }
  } catch (error) {
    console.error(error);
  }
});   
