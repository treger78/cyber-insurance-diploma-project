import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { InsurancePoliceDetailCard } from '../components/InsurancePoliceDetailCard';

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [ insurancePolice, setInsurancePolice ] = useState(null);
  const policeId = useParams().id;

  const getPolice = useCallback(async () => {
    try {
      const fetchedvehiclePolice = await request(`/api/personal/vehiclePolice/${policeId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      const fetchedTripPolice = await request(`/api/personal/tripPolice/${policeId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      const fetchedEstatePolice = await request(`/api/personal/estatePolice/${policeId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      const fetchedHealthPolice = await request(`/api/personal/healthPolice/${policeId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setInsurancePolice(
        fetchedvehiclePolice || fetchedTripPolice || fetchedEstatePolice || fetchedHealthPolice
      );
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
      { !loading && insurancePolice && <InsurancePoliceDetailCard insurancePolice={ insurancePolice } /> }
    </>
  );
}
