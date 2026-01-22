import React from 'react'
import MacWindow from './MacWindow'
function Spotify({windowname, windowBox, setwindowBox}) {
  return (
    <MacWindow width={300} windowname={windowname} windowBox={windowBox} setwindowBox={setwindowBox}>
        <div className="spotify-window">
            <iframe  data-testid="embed-iframe"  src="https://open.spotify.com/embed/artist/6QoCrBHsojKnOrsGNfRcTN?utm_source=generator"
             width="100%" height="352" 
              allowFullScreen=""
               allow="autoplay; clipboard-write; 
               encrypted-media; fullscreen; 
               picture-in-picture" loading="lazy"></iframe>
        </div>
    </MacWindow>
  )
}

export default Spotify
