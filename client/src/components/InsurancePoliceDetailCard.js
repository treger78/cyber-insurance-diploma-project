import React from "react";

export const InsurancePoliceDetailCard = ({ insurancePolice }) => {
  return (
    <>
      <h3 className="center-align">Страховой полис</h3>

      <table className="responsive-table">
        <tbody>
          <tr>
            <td>Номер страхового полиса</td>
            <td>{ insurancePolice.policeID }</td>
          </tr>
          <tr>
            <td>Дата заключения</td>
            <td>{ new Date(insurancePolice.conclusionDate).toLocaleDateString() }</td>
          </tr>
          <tr>
            <td>Дата истечения</td>
            <td>{ new Date(insurancePolice.expirationDate).toLocaleDateString() }</td>
          </tr>

          {
            insurancePolice.registerSign &&
            <tr>
              <td>Регистрационный знак (Гос. номер)</td>
              <td>{ insurancePolice.registerSign }</td>
            </tr>
          }

          {
            insurancePolice.VIN &&
            <tr>
              <td>VIN</td>
              <td>{ insurancePolice.VIN }</td>
            </tr>
          }

          {
            insurancePolice.vehicleCategory &&
            <tr>
              <td>Категория ТС</td>
              <td>{ insurancePolice.vehicleCategory }</td>
            </tr>
          }

          {
            insurancePolice.marka &&
            <tr>
              <td>Марка</td>
              <td>{ insurancePolice.marka }</td>
            </tr>
          }

          {
            insurancePolice.model &&
            <tr>
              <td>Модель</td>
              <td>{ insurancePolice.model }</td>
            </tr>
          }

          {
            insurancePolice.enginePower &&
            <tr>
              <td>Мощность двигателя</td>
              <td>{ insurancePolice.enginePower }</td>
            </tr>
          }

          {
            insurancePolice.releaseDate &&
            <tr>
              <td>Дата выпуска ТС</td>
              <td>{ new Date(insurancePolice.releaseDate).toLocaleDateString() }</td>
            </tr>
          }

          {
            insurancePolice.tripCountry &&
            <tr>
              <td>Страна поездки</td>
              <td>{ insurancePolice.tripCountry }</td>
            </tr>
          }

          {
            insurancePolice.startDateOfTrip &&
            <tr>
              <td>Дата начала поездки</td>
              <td>{ new Date(insurancePolice.startDateOfTrip).toLocaleDateString() }</td>
            </tr>
          }

          {
            insurancePolice.numberOfDays &&
            <tr>
              <td>Длительность поездки (дней)</td>
              <td>{ insurancePolice.numberOfDays }</td>
            </tr>
          }
          
          {
            insurancePolice.insuranceCity &&
            <tr>
              <td>Город страхования</td>
              <td>{ insurancePolice.insuranceCity }</td>
            </tr>
          }

          {
            insurancePolice.age &&
            <tr>
              <td>Возраст (полных лет)</td>
              <td>{ insurancePolice.age }</td>
            </tr>
          }

          {
            insurancePolice.objectAddress &&
            <tr>
              <td>Адрес объекта</td>
              <td>{ insurancePolice.objectAddress }</td>
            </tr>
          }

          {
            insurancePolice.objectArea &&
            <tr>
              <td>Площадь объекта, кв. м.</td>
              <td>{ insurancePolice.objectArea }</td>
            </tr>
          }

        </tbody>
      </table>
    </>
  );
}
