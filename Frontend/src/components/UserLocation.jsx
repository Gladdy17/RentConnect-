import React from "react";

function UserLocation ( { distance, setDistance } ) {

  return(

    <div>
      <h2>Properties in proximity to me</h2>
      <input 
        type="range"
        id="distance_slider"
        min={100}
        max={8000}
        step={150} 
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
    </div>

  )

}

export default UserLocation;