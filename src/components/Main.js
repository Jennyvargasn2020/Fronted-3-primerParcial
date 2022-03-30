import React from "react";
import Botones from "./EscogerOpcion";
import data from "./data.json";
import Swal from "sweetalert2";
import Historial from "./Historia";

const ESTADO_INICIAL = {
  contador: 1,
  opcionA: data[0].opciones.a,
  opcionB: data[0].opciones.b,
  historia: data[0].historia,
  historia: [],
  opcionAnterior: "",
};

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = ESTADO_INICIAL;
  }

  componentDidUpdate(_, prevState) {
    if (!(prevState === null)) {
      this.state.historia.push(this.state.opcionAnterior);
      console.log(this.state.historia);
    }
  }
  componentDidMount() {
    console.log("se ejecuto componentdidmount");
  }

  componentWillUnmount() {
    console.log("se ejeucto componentWillUnmount");
  }

  mostrarModal = () => {
    Swal.fire({
      title: "Fin de la historia!",
      text: "Hace click para reiniciar",
      icon: "success",
      confirmButtonText: "REINICIAR",
    }).then(() => {
      this.reiniciarHistoria();
    });
  };

  reiniciarHistoria = () => {
    // ESTADO_INICIAL.historial = [];
    this.setState({ ...ESTADO_INICIAL, historial: [] });
    console.log("se ejecuto reiniciar historia");
    console.log("- state: " + JSON.stringify(this.state));
    console.log("_estadoinicial: " + JSON.stringify(ESTADO_INICIAL));
  };

  seleccionarOpcion = (boton) => {
    if (this.state.contador >= 5) {
      this.mostrarModal();
    } else {
      const opcion = boton.target.id;
      const identificador = `${this.state.contador + 1}${opcion}`;
      const siguiente = data.find((historia) => historia.id === identificador);
      this.setState({
        contador: this.state.contador + 1,
        opcionA: siguiente.opciones.a,
        opcionB: siguiente.opciones.b,
        historia: siguiente.historia,
        opcionAnterior: opcion,
      });
    }
  };

  render() {
    return (
      <div className="layout">
        <h1 className="historia"> {this.state.historia}</h1>
        <div className="opciones">
          <Botones
            evento={this.seleccionarOpcion}
            opcionA={this.state.opcionA}
            opcionB={this.state.opcionB}
          />
        </div>
        <Historia
          historia={this.state.historia}
          opcionAnterior={this.state.opcionAnterior}
        />
      </div>
    );
  }
}
