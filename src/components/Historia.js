import React from "react";

export default class Historia extends React.Component {
  render() {
    return (
      <div className="recordatorio">
        <h3>Selección anterior: {this.props.opcionAnterior}</h3>
        <ul>
          {this.props.historia.map((opcion, index) => (
            <li key={index}>{opcion}</li>
          ))}
        </ul>
      </div>
    );
  }
}
