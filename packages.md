root:
npm i express mongoose
npm i -D nodemon concurrently
npm i config
npm i bcryptjs
npm i express-validator
npm i jsonwebtoken
npx create-react-app client

npm i shortid
npm i -D cross-env

client:
npm i materialize-css@next
npm i react-router-dom@5.1.2

В package.json после свойства "eslintConfig" добавить новое свойство:
"proxy": "http://localhost:5000",

На хостинг-сервере:
sudo apt update
sudo apt install git
git clone https://github.com/treger78/cyber-insurance-diploma-project.git
cd cyber-insurance-diploma-project

sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt -y install nodejs

npm install
npm run client:install
npm run client:build

sudo npm install -g pm2
После установки:
pm2 start npm -- start

//Для остановки сервера:
//pm2 stop 0