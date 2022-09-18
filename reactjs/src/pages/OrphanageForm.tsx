import React, { useState, FormEvent, useEffect } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory, useParams } from "react-router-dom";
import api from "../services/api";
import { LeafletMouseEvent } from 'leaflet';

import '../styles/pages/orphanage-form.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

interface OrphanageParams {
  id: string;
}

export default function OrphanageForm() {
  const history = useHistory();

  const params = useParams<OrphanageParams>();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [photos, setPhotos] = useState('');

  useEffect(() => {
    if (params.id) {
      api.get(`orphanages/${params.id}`)
        .then(response => {
          setName(response.data.name)
          setPosition({ latitude: response.data.latitude, longitude: response.data.longitude })
          setAbout(response.data.about)
          setInstructions(response.data.instructions)
          setOpeningHours(response.data.openingHours)
          setOpenOnWeekends(response.data.openOnWeekends)
          setPhotos(response.data.photos[0].path)
        })
        .catch(error => {
          alert(error.response.data);
          history.push('/app');
        })
    }
  }, [params.id]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    if (params.id) {
      await api.put(`orphanages/${params.id}`, {
        name,
        latitude,
        longitude,
        about,
        instructions,
        openingHours,
        openOnWeekends,
        'photos': [{
          'path': photos
        }]
      })
        .then(function (response) {
          alert('Atualizado realizado com sucesso!')
          history.push(`/orphanages/show/${params.id}`);
        })
        .catch(function (error) {
          alert(error.response.data)
        });
    } else {
      if (latitude === 0 && longitude === 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        alert('Marque a localização no mapa');

      } else {
        await api.post('orphanages', {
          name,
          about,
          latitude,
          longitude,
          instructions,
          openingHours,
          openOnWeekends,
          'photos': [{
            'path': photos
          }]
        })
          .then(function (response) {
            alert('Cadastro realizado com sucesso!')
            history.push('/app');
          })
          .catch(function (error) {
            alert(error.response.data)
          });
      }
    }
  }

  return (
    <div id="page-orphanage-form">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label htmlFor="location">Marque a localização no mapa*</label>
              <Map
                center={[-22.856839986003425, -43.228841]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[
                      position.latitude,
                      position.longitude
                    ]}
                  />
                )}
              </Map>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome*</label>
              <input
                id="name"
                maxLength={255}
                value={name}
                onChange={event => setName(event.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre* <span>Máximo de 255 caracteres</span></label>
              <textarea
                id="about"
                maxLength={255}
                value={about}
                onChange={event => setAbout(event.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="photos">Foto* <span>Informe uma URL</span></label>
              <input
                id="photos"
                maxLength={255}
                value={photos}
                onChange={event => setPhotos(event.target.value)}
                required
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções*</label>
              <textarea
                id="instructions"
                maxLength={255}
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="openingHours">Horário de funcionamento*</label>
              <input
                id="openingHours"
                maxLength={255}
                value={openingHours}
                onChange={event => setOpeningHours(event.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="openOnWeekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
