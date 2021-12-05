import React from 'react';
import { NavLink } from "react-router-dom";
import car from '../assets/images/car.png';
import suitcase from '../assets/images/suitcase.png';
import safe from '../assets/images/safe.png';
import health from '../assets/images/health.png';

export const MainPage = () => {

  return (
		<div>
				<h3 className="center-align">Рассчитать стоимость страховки и купить онлайн</h3>

				<div className="row center-align" style={{marginTop: '4rem'}}>

					<div className="col s4">
						<NavLink to="/vehicle">
							<div>
								<img src={ car } alt="" />
								<h5>Транспортные средства</h5>
							</div>
						</NavLink>
					</div>
					<div className="col s4">
						<NavLink to="/trips">
							<div>
								<img src={ suitcase } alt="" />
								<h5>Путешествия</h5>
							</div>
						</NavLink>
					</div>
					<div className="col s4">
						<NavLink to="/estate">
							<div>
								<img src={ safe } alt="" />
								<h5>Имущество</h5>
							</div>
						</NavLink>
					</div>
					<div className="col s4">
						<NavLink to="/health">
							<div>
								<img src={ health } alt="" />
								<h5>Здоровье</h5>
							</div>
						</NavLink>
					</div>

				</div>

			<div className="yoursPolices">
				<h4>Мои полисы</h4>
				<div className="polices">
					<div>Продлить</div>
					<div>Активировать</div>
					<a href="buy.html"><div>Купить</div></a>
				</div>
			</div>
			<div className="ourServicesSection">
				<h4>Страховая компания «Cyber Insurance»</h4>
				<div className="ourServicesDescription">
					<p>«Cyber Insurance» — крупнейшая частная страховая компания с универсальным портфелем страховых услуг, включающим как комплексные программы защиты интересов бизнеса, так и широкий спектр страховых продуктов для частных лиц. Компания предлагает широкий спектр решений по всем ключевым видам страхования.</p>
					<p>Региональная сеть насчитывает 270 филиалов и отделений.</p>
					<p>Клиентами Группы «Cyber Insurance» уже являются более 30 млн человек и свыше 100 тыс. предприятий.</p>
					<p>Надежность и финансовую устойчивость компании подтверждают рейтинги ведущих международных рейтинговых агентств: «ВВ+» по шкале Fitch Ratings, «ВВ+» по шкале S&P.</p>
				</div>
				<div className="ourServicesList">
					<h5>Наши услуги</h5>
					<ul>
						<li>Автострахование</li>
						<li>Страхование недвижимости</li>
						<li>Страхование движимого имущества</li>
						<li>Страхование путешественников</li>
						<li>Страхование пассажиров</li>
						<li>Страхование здоровья</li>
					</ul>
				</div>
			</div>
		</div>
  );
}
