import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { VehiclePoliceCard } from '../components/VehiclePoliceCard';

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [ police, setPolice ] = useState(null);
  const policeId = useParams().id;

  const getPolice = useCallback(async () => {
    try {
      const fetched = await request(`/api/personal/vehiclePolice/${policeId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setPolice(fetched);
    } catch (e) {}
  }, [token, policeId, request]);

  useEffect(() => {
    getPolice();
  }, [getPolice]);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && police && <VehiclePoliceCard police={ police } /> }
    </>
  );
}
