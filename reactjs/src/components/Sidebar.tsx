import React, { useState } from 'react';
import api from '../services/api';
import { useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';
import { title } from 'process';

interface OrphanageParams {
    id: string;
}

export default function Sidebar() {
    const { goBack } = useHistory();
    const history = useHistory();

    const params = useParams<OrphanageParams>();
    const [confirmDelete, setConfirmDelete] = useState(Boolean);

    async function handleDelete() {
        if (confirmDelete) {
            await api.delete(`orphanages/${params.id}`)
                .then(function (response) {
                    alert('Apagado com sucesso!')
                    history.push('/app');
                })
                .catch(function (error) {
                    alert(error.response.data)
                });
        }

        setConfirmDelete(!confirmDelete);
    }

    return (
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <BiEdit size={24} color="#FFF" />
                </button>
                {!confirmDelete ?
                    <button type="button" onClick={handleDelete} >
                        <MdDelete size={24} color="#FFF" />
                    </button>
                    : <button type="button" onClick={handleDelete} id="confirmDelete" title='Confirmar'>
                        <AiFillCheckCircle size={24} color="#FFF" />
                    </button>
                }
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside >
    );
}