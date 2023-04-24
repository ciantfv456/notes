import './Home.css'
import React from 'react';

function Home() {
    let root = document.querySelector('body')
    root.classList = []
    root.classList.add('home')
  return (
    <div className='home'>
        <h1>Home</h1>
    </div>
  )
}

export default Home