import React from "react"
import "./style.css";

function DotsLoader(props) {
    return (
        <div className="loadContainer">
            <div className="mainDotContainer">
                <div className="dotContainer">
                    <div className="dot dot-1"></div>
                    <div className="dot dot-2"></div>
                    <div className="dot dot-3"></div>
                </div>
            </div>
        </div>
    )
}

export default DotsLoader