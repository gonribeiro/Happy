import React, { useState } from 'react';
import api from '../services/api';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

interface OrphanageParams {
    id: string;
}

export default function Sidebar() {
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
                {params.id &&
                    <>
                        <Link to={`/orphanages/edit/${params.id}`}>
                            <BiEdit size={24} color="#FFF" />
                        </Link>
                        {!confirmDelete ?
                            <button type="button" onClick={handleDelete} >
                                <FiTrash2 size={24} color="#FFF" />
                            </button>
                            : <button type="button" onClick={handleDelete} id="confirmDelete" title='Confirmar'>
                                <AiFillCheckCircle size={24} color="#FFF" />
                            </button>
                        }
                    </>
                }
                <Link to={`/app`}>
                    <AiOutlineHome size={24} color="#FFF" />
                </Link>
            </footer>
        </aside >
    );
}