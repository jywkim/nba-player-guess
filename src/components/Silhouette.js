import React from 'react'

export const Silhouette = (props) => {
    const urlPlayerPic = props.urlPlayerPic;
    const silhouette = props.silhouette;
    const popupContent = props.popupContent;

    return (
      <div>
        <img 
          src={urlPlayerPic} 
          alt={"Image of " + popupContent[1]}
          className={silhouette ? "silhouette" : ""}
        ></img>
        <br/><br/>
        <div className="popupResult">
          <h1 className="popupH2">{popupContent[0]}</h1>
          <h1 className="popupH1">{popupContent[1].toUpperCase()}</h1>
          <h1 className="popupH2">{popupContent[2]}</h1>
        </div>
      </div>
    )
}