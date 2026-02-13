import React from 'react'
import MacWindow from './MacWindow'

function Spotify({ windowname }) {
  return (
    <MacWindow width={400} height={500} windowname={windowname} >
      <div className="spotify-window" style={{ height: '100%' }}>
        <iframe data-testid="embed-iframe" src="https://open.spotify.com/embed/artist/6QoCrBHsojKnOrsGNfRcTN?utm_source=generator"
          width="100%" height="100%"
          allowFullScreen=""
          title="Spotify Embed"
          allow="autoplay; clipboard-write; 
               encrypted-media; fullscreen; 
               picture-in-picture" loading="lazy"></iframe>
      </div>
    </MacWindow>
  )
}

export default Spotify
