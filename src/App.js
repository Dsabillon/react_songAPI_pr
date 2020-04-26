import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

//Componentes
import Formulario from "./Components/Formulario";
import Cancion from "./Components/Cancion";
import Info from "./Components/Info";
import Error from "./Components/Error";

function App() {
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [info, guardarInfo] = useState({});
  const [error, guardarError] = useState(false);

  const { artista, cancion } = busquedaletra;

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarAPI = async () => {
      try {
        const { artista, cancion } = busquedaletra;
        const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`; //lyric.ovh
        const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`; //theaudiobd.com
        const [letra, informacion] = await Promise.all([
          axios(url),
          axios(url2),
        ]);

        guardarLetra(letra.data.lyrics);
        guardarInfo(informacion.data.artists[0]);
      } catch (error) {
        guardarError(true);
      }
    };

    consultarAPI();
  }, [busquedaletra, info]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

      <div className="container mt-5">
        {error ? (
          <Error />
        ) : (
          <div className="row">
            <div className="col-md-6">
              <Info info={info} artista={artista} />
            </div>
            <div className="col-md-6">
              <Cancion letra={letra} cancion={cancion} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default App;
