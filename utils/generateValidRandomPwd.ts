export async function generateRandomPwd(): Promise<string> {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
  
    // Generate a random string of length between 5 and 10
    const pwdLength = Math.floor(Math.random() * (10 - 5 + 1)) + 8;
    let pwd = '';
  
    for (let i = 0; i < pwdLength; i++) {
      pwd += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return `${pwd}`;
  }