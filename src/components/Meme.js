import React, { useEffect, useState } from "react";

export default function Meme() {
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`https://api.imgflip.com/get_memes`);
      const memesData = await data.json();
      setMemeImages(memesData);
    }
    fetchData();
  }, []);

  const [allMemeImages, setMemeImages] = useState([]);

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/30b1gx.jpg",
  });

  const getRandomImage = (e) => {
    e.preventDefault();
    const number = Math.floor(Math.random() * 100);
    const memes = allMemeImages.data.memes;
    setMeme((meme) => ({ ...meme, randomImage: memes[number].url }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  };

  return (
    <main>
      <form className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          onChange={handleChange}
        />
        <button className="form--button" onClick={getRandomImage}>
          Get a new meme image 🖼
        </button>
      </form>

      <div className="meme">
        <img src={meme.randomImage} alt="Meme" className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
