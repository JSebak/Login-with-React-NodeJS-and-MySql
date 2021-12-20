import Loader from "react-loader-spinner";

import React from 'react'

export default function Spinner() {
    return (
    <div style={{height:"100vh",display:"flex",backgroundColor:"hsl(11, 23%, 19%)", justifyContent: "center",alignItems: "center"}}>
        <Loader
        type="Rings"
        color="#FC3005"
        height={100}
        width={100}
        timeout={3000}
      />
      </div>
    )
}

    