import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log(output.text.split(/\r?\n/).filter(string => string !== ""))
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onTextChange = (event) => {
    setUserInput(event.target.value)
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | Cook Me Ideas</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title wrapper">
            <h1 >Cook me Ideas</h1>
          </div>
          <div className="header-subtitle">
            <h2>Don't have idea what to wear, what to text, what to cook ? <br /> Let me help you with getting some idea {";)"}</h2>
          </div>
          <div className="prompt-container">
            <textarea placeholder="Start typing here" className="prompt-box" onChange = {onTextChange} value = {userInput}/>
            <div className="prompt-buttons">
              <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}>
                <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>
            {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header ">
                  <h3>{isGenerating ? "Cooking Ideas" : "Here You Go !!"}</h3>
                  <div className="output-content">
                    <p>{apiOutput}</p>
                  </div>
                </div>
              </div>
            </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
