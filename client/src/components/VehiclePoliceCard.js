import React from "react";

export const VehiclePoliceCard = ({ police }) => {
  return (
    <>
      <h3 className="center-align">Страховой полис</h3>

      <table className="responsive-table">
        <tbody>
          <tr>
            <td>Номер страхового полиса</td>
            <td>{ police.policeID }</td>
          </tr>
          <tr>
            <td>Дата заключения</td>
            <td>{ new Date(police.conclusionDate).toLocaleDateString() }</td>
          </tr>
          <tr>
            <td>Дата истечения</td>
            <td>{ new Date(police.expirationDate).toLocaleDateString() }</td>
          </tr>
          <tr>
            <td>Регистрационный знак (Гос. номер)</td>
            <td>{ police.registerSign }</td>
          </tr>
          <tr>
            <td>VIN</td>
            <td>{ police.VIN }</td>
          </tr>
          <tr>
            <td>Категория ТС</td>
            <td>{ police.vehicleCategory }</td>
          </tr>
          <tr>
            <td>Марка</td>
            <td>{ police.marka }</td>
          </tr>
          <tr>
            <td>Модель</td>
            <td>{ police.model }</td>
          </tr>
          <tr>
            <td>Мощность двигателя</td>
            <td>{ police.enginePower }</td>
          </tr>
          <tr>
            <td>Дата выпуска ТС</td>
            <td>{ new Date(police.releaseDate).toLocaleDateString() }</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
