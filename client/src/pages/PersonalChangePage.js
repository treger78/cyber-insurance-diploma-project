import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { Loader } from '../components/Loader';

export const PersonalChangePage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();

  const [ user, setUser ] = useState([]);
  const [ newUserData, setNewUserData ] = useState([]);
  
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchUser = useCallback(async () => {
    try {
      const fetched = await request('/api/personal', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setUser(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const changeHandler = event => {
    setNewUserData({ ...newUserData, [event.target.name]: event.target.value });
  }

  const sendHandler = async () => {
    try {
      await request('/api/personal', 'POST', { ...newUserData }, {
        Authorization: `Bearer ${auth.token}`
      });

      message('Данные успешно изменены!');
    } catch (e) {}
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div>

      { !loading }

      <div className="row">
      <div className="container">
        <h3 className="center-align">Персональные данные</h3>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <div>
              <div>
                <div>Фамилия</div>
                <div>
                  <input
                    id="secondName"
                    type="text"
                    name="secondName"
                    defaultValue={ user.secondName || '' }
                    onChange={ changeHandler }
                  />
                </div>
              </div>
              <div>
                <div>Имя</div>
                <div>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    defaultValue={ user.firstName || '' }
                    onChange={ changeHandler }
                  />
                </div>
              </div>
              <div>
                <div>Отчество</div>
                <div>
                  <input
                    id="patronymic"
                    type="text"
                    name="patronymic"
                    defaultValue={ user.patronymic || '' }
                    onChange={ changeHandler }
                  />
                </div>
              </div>
              <div>
                <div>Дата рождения</div>
                <div>
                  <input
                    id="birthDate"
                    type="date"
                    name="birthDate"
                    defaultValue={ new Date(user.birthDate).toLocaleDateString() || '' }
                    onChange={ changeHandler }
                  />
                </div>
              </div>
              <div>
                <div>Мобильный телефон</div>
                <div>
                  <input
                    id="mobilePhone"
                    type="text"
                    name="mobilePhone"
                    defaultValue={ user.mobilePhone || '' }
                    onChange={ changeHandler }
                  />
                </div>
              </div>
              <div>
                <div>E-mail</div>
                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={ user.email || '' }
                    onChange={ changeHandler }
                  />
                </div>
              </div>

              <div className="actionButtons">
                <Link to="/personal">
                  <button
                    style={{ backgroundColor: "#f57f17", color: "white" }}
                    onClick={ sendHandler }
                    disabled={ loading }
                  >
                    Изменить персональные данные
                  </button>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

    </div>
  );
}
