import { useState, useEffect } from 'react';

import axios from 'axios';

function App() {

  // Initiate Object quotes with useState.
  const [quotes, setQuote] = useState({
    qoutes: '',
    author: '',
  });

  // Using quotable.io to get random qoutes api.
  // http://api.quotable.io/random

  // Method to get random qoute also change background and card color.
  const randomQuote = () => {
    axios
      .get('http://api.quotable.io/random')
      .then(response => {
        randomColor('background');
        randomColor('card');
        setQuote({
          quote: response.data.content,
          author: response.data.author
        })

      })
      .catch(error => {
        console.log(error)
      });
  };

  // useEffect, when web rendered, do method randomQuote.
  useEffect(() => {
    randomQuote()
  }, []);

  // Array with ASCHII code for value in Hex(0-9 and A-F).
  const hexNum = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70];

  // Initiate css for background.
  const [styleBackground, setStyleBackground] = useState({
    backgroundColor: `#551F00`
  });


  // Also initaite css for card.
  const [styleCard, setStyleCard] = useState({
    backgroundColor: `#1FFA11`
  });

  // Method to randomizing background color value of background and card with 6(six) Hex value.
  const randomColor = (value) => {
    const arr = [];
    while (arr.length < 6) {
      arr.push(String.fromCharCode(hexNum[Math.floor(Math.random() * hexNum.length)]))
    }
    
    if(value === 'background'){
      setStyleBackground({
        backgroundColor: `#${arr.join("")}`
      });
    } else {
      setStyleCard({
        backgroundColor: `#${arr.join("")}`
      });
    }
  };

  return (
    <>
      <div className='bg-gray-200 h-full flex justify-center items-center' style={styleBackground}>
        <div className='bg-slate-900 rounded-xl w-1/2 h-1/2 flex flex-col p-4 items-center border-t-stone-200 border-4' style={styleCard}>
          <div className='basis-11/12 w-full p-6 text-zinc-900'>
            <p className='h-5/6 text-2xl font-extrabold text-center'>{quotes.quote}</p>
            <h1 className='text-end text-lg font-bold italic underline'>{quotes.author}</h1>
          </div>
          <button className='rounded-lg bg-white p-2 w-fit justify-self-end text-cyan-800 font-semibold border-2 border-gray-600' onClick={randomQuote}>
            Randomize
          </button>
        </div>
      </div>
    </>
  )
}

export default App