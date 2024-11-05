export async function generateRandomEmail(): Promise<string> {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const domain = 'example.com';
  
    // Generate a random username of length between 5 and 10
    const usernameLength = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    let username = '';
  
    for (let i = 0; i < usernameLength; i++) {
      username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return `${username}@${domain}`;
  }