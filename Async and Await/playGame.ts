const flipCoin = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const flip = Math.random() < 0.5 ? "Heads" : "Tails";
    if (flip === "Heads") {
      resolve(true); 
    } else {
      resolve(false); 
    }
  });
};


const getAdvice = async (): Promise<void> => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data =  await response.json();
    console.log(` Advice for you: ${data.slip.advice}`);
  } catch (error) {
    console.error("Error fetching advice:", error);
  }
};


const playGame = async (): Promise<void> => {
  try {
    console.log("Flipping the coin...");

    const win = await flipCoin();

    if (win) {
      console.log("You won! Fetching advice for you...");
      await getAdvice();
    } else {
      console.log("Better luck next time!");
    }
  } catch (error) {
    console.error("Something went wrong in the game:", error);
  }
};


playGame();