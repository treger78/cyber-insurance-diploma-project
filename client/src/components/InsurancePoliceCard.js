import React from "react";
import { Link } from "react-router-dom";

export const InsurancePoliceCard = ({ insurancePolice }) => {

  return (
    <table className="responsive-table">
      <tbody>
        <tr className="personalPoliceThead">
          <td>№ п/п</td>
          <td>Номер полиса</td>
          <td>Дата заключения</td>
          <td>Дата окончания</td>
          <td>Подробная информация</td>
        </tr>
        {
          insurancePolice.map((police, index) => {
            return (
              <tr key={ police._id }>
                <td>{ index + 1 }</td>
                <td>{ police.policeID }</td>
                <td>{ new Date(police.conclusionDate).toLocaleDateString() }</td>
                <td>{ new Date(police.expirationDate).toLocaleDateString() }</td>
                <td>
                  <Link to={`/detail/${police._id}`}>Просмотр</Link>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}
