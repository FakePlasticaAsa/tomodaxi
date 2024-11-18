import React, { useState, useEffect } from 'react';

export function Tamagotchi() {
    const getRandomValue = () => Math.floor(Math.random() * (100 - 70 + 1)) + 70; // Random number between 20 and 100

    const [level, setLevel] = useState(1);
    const [experience, setExperience] = useState(0);
    const [experienceGoal, setExperienceGoal] = useState(100);
    const [breakfast, setBreakfast] = useState(0);
    const [game, setGame] = useState(0);
    const [coffee, setCoffee] = useState(0);
    const [deodorant, setDeodorant] = useState(0);
    const [energyBar, setEnergyBar] = useState(0);
    

    const [isSpecialColor, setIsSpecialColor] = useState(false);
    const [isSpecialColorHappiness, setIsSpecialColorHappiness] = useState(false);


    const [coins, setCoins] = useState(0);

    const [hunger, setHunger] = useState(getRandomValue());
    const [feedCount, setFeedCount] = useState(0);

    const [happiness, setHappiness] = useState(getRandomValue());
    const [happinessCount, setHappinessCount] = useState(0);

    const [health, setHealth] = useState(getRandomValue());
    const [healthCount, setHealthCount] = useState(0);

    const [hygiene, setHygiene] = useState(getRandomValue());
    const [hygieneCount, setHygieneCount] = useState(0);

    const [energy, setEnergy] = useState(getRandomValue());
    const [energyCount, setEnergyCount] = useState(0);


    const [gameOver, setGameOver] = useState(false);


    const itemPrices = {
        breakfast: 100,
        game: 50,
        coffee: 30,
        deodorant: 70,
        energyBar: 80,
    };
    
    const buyItem = (item) => {
        if (coins >= itemPrices[item]) {
            setCoins(coins - itemPrices[item]); // Deduct the price from coins
            if (item === "breakfast") setBreakfast(breakfast + 1);
            if (item === "game") setGame(game + 1);
            if (item === "coffee") setCoffee(coffee + 1);
            if (item === "deodorant") setDeodorant(deodorant + 1);
            if (item === "energyBar") setEnergyBar(energyBar + 1);
        }
    };
    
    const useItem = (item) => {
        if (item === "breakfast" && breakfast > 0) {
            setBreakfast(breakfast - 1);
            setHunger((prev) => Math.min(prev + 100, 100));
        } else if (item === "game" && game > 0) {
            setGame(game - 1);
            setHappiness((prev) => Math.min(prev + 100, 100)); // Increase happiness
        } else if (item === "coffee" && coffee > 0) {
            setCoffee(coffee - 1);
            setEnergy((prev) => Math.min(prev + 100, 100)); // Increase energy
        } else if (item === "deodorant" && deodorant > 0) {
            setDeodorant(deodorant - 1);
            setHygiene((prev) => Math.min(prev + 100, 100)); // Increase hygiene
        } else if (item === "energyBar" && energyBar > 0) {
            setEnergyBar(energyBar - 1);
            setEnergy((prev) => Math.min(prev + 200, 100)); // Increase energy
        } else {
            alert("You don't have enough of this item!");
        }
    };
    
    
    // Function to feed the Tamagotchi
    const feed = () => {
        // Increase hunger and energy
        setHunger((prev) => Math.min(prev + 20, 100));
        setEnergy((prev) => Math.min(prev + 2, 100));
        setExperience((prev) => Math.min(prev + 20, experienceGoal));

        // Increment the feed count
        setFeedCount((prev) => prev + 1);
    };

    // Function to play with the Tamagotchi
    const play = () => {
        setHappiness((prev) => Math.min(prev + 20, 100)); // Increases happiness up to a max of 100
        setHunger((prev) => Math.max(prev - 5, 0)); // Reduces hunger to a minimum of 0
        setHealth((prev) => Math.max(prev - 5, 0)); // Reduces health to a minimum of 0
    
        setHappinessCount((prev) => prev + 1);
    };

    // Function to let the Tamagotchi sleep
    const sleep = () => {
        setHealth((prev) => Math.min(prev + 10, 100)); // Increases health up to a max of 100
        setHunger((prev) => Math.max(prev - 5, 0)); // Reduces happiness to a minimum of 0
    };

    // Function to let the Tamagotchi sleep
    const shower = () => {
        setHygiene((prev) => Math.min(prev + 10, 100)); // Increases health up to a max of 100
    };

    // Function to let the Tamagotchi sleep
    const exercise = () => {
        setEnergy((prev) => Math.min(prev + 10, 300)); // Increases health up to a max of 100
        setEnergy((prev) => Math.max(prev - 5, 0)); // Reduces happiness to a minimum of 0
    };

    
    
    useEffect(() => {
        const timer = setInterval(() => {
            setHunger((prev) => Math.max(prev - 0.01, 0));
            setHappiness((prev) => Math.max(prev - 0.01, 0));
            setHealth((prev) => Math.max(prev - 0.01, 0));
            setHygiene((prev) => Math.max(prev - 0.01, 0));
            setEnergy((prev) => Math.max(prev - 0.05, 0));
    
            if (feedCount == 3) {
                setIsSpecialColor(true);
            }
    
            if (happinessCount == 3) {
                setIsSpecialColorHappiness(true);
            }
    
            if (feedCount > 3) {
                setFeedCount(0);
                setHunger((prev) => Math.min(prev - 60, 100));
                setHealth((prev) => Math.min(prev - 40, 100));
                setIsSpecialColor(false);
            }
        }, 10);
    
        const resetFeedCountTimer = setTimeout(() => {
            setFeedCount(0);
            setIsSpecialColor(false);
        }, 10000);
    
        return () => {
            clearInterval(timer);
            clearTimeout(resetFeedCountTimer);
        };
    }, [feedCount, happinessCount]); // Combine dependencies here
    
    useEffect(() => {
      if (hunger <= 0 || happiness <= 0 || health <= 0 || hygiene <= 0 || energy <= 0) {
          setGameOver(true);
      }
  }, [hunger, happiness, health, hygiene, energy]);

    useEffect(() => {
        const timer2 = setInterval(() => {
            if (level >= 3) {
                setHunger((prev) => Math.max(prev - 5, 0));
                setHappiness((prev) => Math.max(prev - 5, 0));
                setHealth((prev) => Math.max(prev - 5, 0));
                setHygiene((prev) => Math.max(prev - 10, 0));
                setEnergy((prev) => Math.max(prev - 30, 0));
            }
            if (level >= 6) {
                if (Math.random() < 0.2) {
                    setHunger((prev) => Math.max(prev - 5, 0));
                    setHappiness((prev) => Math.max(prev - 5, 0));
                    setHealth((prev) => Math.max(prev - 5, 0));
                    setHygiene((prev) => Math.max(prev - 10, 0));
                    setEnergy((prev) => Math.max(prev - 50, 0));
                }
            }
            
        }, 15000); // Executes every 15 seconds

        // Cleanup function to clear the interval
        return () => clearInterval(timer2);
    }, [level]); // Dependency array


    useEffect(() => {
      const fastExperienceUpdate = setInterval(() => {
          if (hunger <= 0 || happiness <= 0 || health <= 0 || hygiene <= 0 || energy <= 0) {
              setGameOver(true); // Properly update the gameOver state
              return; // Stop further updates once game over is set
          }
  
          if (gameOver) return; // Prevent experience update if the game is over
  
          setExperience((prevExperience) => {
              if (prevExperience >= experienceGoal) {
                  let newExperienceGoal = Math.round(experienceGoal * 1.55);
                  if (newExperienceGoal > 1000) {
                      newExperienceGoal = 1000;
                  }
                  setExperienceGoal(newExperienceGoal);
                  setLevel((prevLevel) => prevLevel + 1);
                  setCoins((prevCoins) => prevCoins + (level * 60));
                  return 0;
              }
              return Math.min(prevExperience + 1, experienceGoal);
          });
      }, 250);
  
      return () => clearInterval(fastExperienceUpdate);
  }, [experienceGoal, gameOver, hunger, happiness, health, hygiene, energy]); // Include dependencies to trigger effect correctly
  
    const getProgressColor = (value) => {
        if (value > 60) return "bg-green-500"; // Verde si el valor es alto
        if (value > 20) return "bg-yellow-500"; //Amarill si el valor es medio
        return "bg-red-500"; // Rojo si el valor es bajo
    };

    const getStatusMessage = () => {
        if (hunger < 20) return "¡Tengo hambre! 😟😟";
        if (happiness < 20) return "Estoy triste 😢😢";
        if (health < 20) return "No me siento bien 😷😷";
        if (hygiene < 20) return "Estoy sucio 😷😷";
        if (energy < 20) return "Estoy agotado 😷😷";
        return "¡Estoy feliz! 😊😊";
    };

    return (
        
      <>

{!gameOver && (
  
<div className="p-4 bg-white rounded-lg shadow-md w-full flex justify-between"> {/* Flex container with space-between */}
  {/* Tamagotchi Section */}
  <div className="w-1/2 mr-8"> {/* Added margin-right to create space */}
    <h1 className="text-2xl font-bold text-center mb-4">🐱Tamagotchi🐱</h1>
    <h1 className="text-2xl font-bold text-center mb-4 bg-blue-400 rounded-lg p-4">Nivel: {level}</h1>
    <h1 className="text-2xl font-bold text-center mb-4">Experiencia:</h1>
    <h1 className="text-2xl font-bold text-center mb-4 bg-pink-400 rounded-lg p-4">
      {Math.floor(experience)} / {experienceGoal}
    </h1>
    <h1 className="text-2xl font-bold text-center mb-4">Coins:</h1>
    <h1 className="text-2xl font-bold text-center mb-4 bg-yellow-300 rounded-lg p-4">{coins}</h1>

    {/* Mensaje de estado */}
    <p className="text-center text-lg font-semibold mb4">{getStatusMessage()}</p>

    {/* Progress Bars */}
    <div className="mb-4">
      <label className="block font-medium mb-1">Hambre:</label>
      <div className="bg-gray-300 h-4 rounded overflow-hidden">
        <div className={`${getProgressColor(hunger)} h-full`} style={{ width: `${hunger}%` }} />
      </div>
    </div>
    <div className="mb-4">
      <label className="block font-medium mb-1">Felicidad:</label>
      <div className="bg-gray-300 h-4 rounded overflow-hidden">
        <div className={`${getProgressColor(happiness)} h-full`} style={{ width: `${happiness}%` }} />
      </div>
    </div>
    <div className="mb-4">
      <label className="block font-medium mb-1">Salud:</label>
      <div className="bg-gray-300 h-4 rounded overflow-hidden">
        <div className={`${getProgressColor(health)} h-full`} style={{ width: `${health}%` }} />
      </div>
    </div>
    <div className="mb-4">
      <label className="block font-medium mb-1">Higiene:</label>
      <div className="bg-gray-300 h-4 rounded overflow-hidden">
        <div className={`${getProgressColor(hygiene)} h-full`} style={{ width: `${hygiene}%` }} />
      </div>
    </div>
    <div className="mb-4">
      <label className="block font-medium mb-1">Energia:</label>
      <div className="bg-gray-300 h-4 rounded overflow-hidden">
        <div className={`${getProgressColor(energy)} h-full`} style={{ width: `${energy}%` }} />
      </div>
    </div>

    {/* Interaction Buttons */}
    <div className="flex space-x-2 m-4 flex-col">
      <div className="flex justify-around m-2">
        <button
          onClick={feed}
          className={`px-4 py-2 rounded transition text-black ${
            isSpecialColor ? 'bg-neutral-500 hover:bg-neutral-600' : 'bg-orange-500 hover:bg-yellow-600'
          } text-white`}
        >
          Feed
        </button>
        <button
          onClick={play}
          className={`px-4 py-2 rounded transition text-black ${isSpecialColorHappiness ? 'bg-neutral-500 hover:bg-neutral-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          Play
        </button>
        <button
          onClick={sleep}
          className="px-4 py-2 rounded transition text-black bg-purple-500 hover:bg-purple-600"
        >
          Sleep
        </button>
      </div>
      <div className="flex justify-around m-2">
        <button
          onClick={shower}
          className="px-4 py-2 rounded transition text-black bg-blue-500 hover:bg-blue-600"
        >
          Shower
        </button>
        <button
          onClick={exercise}
          className="px-4 py-2 rounded transition text-black bg-red-500 hover:bg-red-600"
        >
          Ejercicio
        </button>
      </div>
    </div>
  </div>

  {/* Shop Section */}
  <div className="w-1/2">
    <h1 className="text-2xl font-bold mb-4">Tamagotchi Shop</h1>

    {/* Shop Items */}
    <div className="shop-item mb-6">
      <h2 className="text-xl font-semibold">Breakfast</h2>
      <p className="text-lg">Price: {itemPrices.breakfast} coins</p>
      <button
        onClick={() => buyItem("breakfast")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Buy Breakfast
      </button>
      <button
        onClick={() => useItem("breakfast")}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mt-2"
      >
        Use Breakfast
      </button>
      <p className="mt-2">Owned: {breakfast}</p>
    </div>

    <div className="shop-item mb-6">
      <h2 className="text-xl font-semibold">Game</h2>
      <p className="text-lg">Price: {itemPrices.game} coins</p>
      <button
        onClick={() => buyItem("game")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Buy Game
      </button>
      <button
        onClick={() => useItem("game")}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mt-2"
      >
        Play Game
      </button>
      <p className="mt-2">Owned: {game}</p>
    </div>

    <div className="shop-item mb-6">
      <h2 className="text-xl font-semibold">Coffee</h2>
      <p className="text-lg">Price: {itemPrices.coffee} coins</p>
      <button
        onClick={() => buyItem("coffee")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Buy Coffee
      </button>
      <button
        onClick={() => useItem("coffee")}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mt-2"
      >
        Use Coffee
      </button>
      <p className="mt-2">Owned: {coffee}</p>
    </div>

    <div className="shop-item mb-6">
      <h2 className="text-xl font-semibold">Deodorant</h2>
      <p className="text-lg">Price: {itemPrices.deodorant} coins</p>
      <button
        onClick={() => buyItem("deodorant")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Buy Deodorant
      </button>
      <button
        onClick={() => useItem("deodorant")}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mt-2"
      >
        Use Deodorant
      </button>
      <p className="mt-2">Owned: {deodorant}</p>
    </div>

    <div className="shop-item mb-6">
      <h2 className="text-xl font-semibold">Energy Bar</h2>
      <p className="text-lg">Price: {itemPrices.energyBar} coins</p>
      <button
        onClick={() => buyItem("energyBar")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Buy Energy Bar
      </button>
      <button
        onClick={() => useItem("energyBar")}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mt-2"
      >
        Use Energy Bar
      </button>
      <p className="mt-2">Owned: {energyBar}</p>
    </div>
  </div>
</div>
)}

{gameOver ? (

<h1 className="text-4xl font-bold text-red-600 text-center mb-4">Game Over</h1>

) : (
            <h1 className="text-2xl font-bold text-center">🐱 Tamagotchi 🐱</h1>
        )}
  </>

  
);


}