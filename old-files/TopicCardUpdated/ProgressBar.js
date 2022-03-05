import React from 'react';

function ProgressBar(props){
  const { completed } = props;

  const containerStyles = {
    width: "100%",
    height: "2px",
    backgroundColor: "rgb(63, 63, 63)",
    borderRadius: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: "rgb(151, 151, 151)",
    borderRadius: 'inherit',
    textAlign: 'right',
    position: "relative",
    top: "-12px",
    left: "2px",
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  const beginningCircleStyles = {
    border: "2px solid rgb(151, 151, 151)",
    borderRadius: "100%",
    height: "4px",
    width: "4px",
    position: "relative",
    left: "0%",
    top: "-9px",
    backgroundColor: "rgb(151, 151, 151)",
  }

  const progressCircleStyles = {
    border: "2px solid rgb(151, 151, 151)",
    borderRadius: "100%",
    height: "4px",
    width: "4px",
    position: "relative",
    left: `${completed}%`,
    top: "-5px",
    backgroundColor: "rgb(151, 151, 151)",
  }

  const endCircleStyles = {
    border: "2px solid rgb(63, 63, 63)",
    borderRadius: "99%",
    height: "4px",
    width: "4px",
    position: "relative",
    left: "98%",
    top: '-1px',
    backgroundColor: "rgb(63, 63, 63)",
  }

  return(
    <div style={containerStyles}>
      <div style={endCircleStyles} />
      <div style={progressCircleStyles} />
      <div style={beginningCircleStyles} />
      <div style={fillerStyles}>
        <span style={labelStyles}></span>
      </div>
    </div>
  )
}

export default ProgressBar;
