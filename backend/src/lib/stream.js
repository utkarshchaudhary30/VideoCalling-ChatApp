import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// Create or update a user in Stream
export const createStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error creating Stream user:", error.message);
    return null;
  }
};

// Generate a Stream Chat token for a given user ID
export const generateStreamToken = async (userId) => {
  try {
    const token = streamClient.createToken(userId);
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error.message);
    return null;
  }
};
