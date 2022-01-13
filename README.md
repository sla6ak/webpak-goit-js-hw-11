# viktor-created
# npm install
# npm run start
# npm run build
# npm run deploy
# http-server
 web-pack settings

 для виндовса по мануалу https://habr.com/ru/post/524260/
*************************************************************
создаем папку(директорию для нашего проэкта) название сами даем. терминал -
mkdir viktor-created
переходим внутрь папки для дальнейшей работы над проэктом
cd viktor-created
далее создаем внутри фаил настроек вебпака.json
npm init -y
******************************************
должно получиться вот это
{
  "name": "webpack-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
*************************************************
переходим к скачиванию самих пакетов вебпака которые прописаны уже в файле настроек
npm i -D webpack webpack-cli 
все должно скачаться. около 2800 файлов и зависимости ноды.
webpack — сборщик модулей и ресурсов
webpack-cli — интерфейс командной строки для вебпака
****************************************************************
Собственно создаем директорию src для хранения файлов приложения. начну с создания простого файла index.js
**************************************
теперь собственно сама настройка!
Создаем файл «webpack.config.js» в корневой директории проекта.
внутри пропишем точки входа и выхода компилятора

// webpack.config.js
const path = require('path')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
}
**********************************
дополнительное исследование показало что необходимо указывать для чего сборка
https://webpack.js.org/configuration/mode/
module.exports = {
  mode: 'development',
};
******************************************
дописываем в 
// package.json
"scripts": {
    "build": "webpack"
}
 и запускаем наш сборщик командой
# npm run build
****************************************************
В директории «dist» создается файл «index.bundle.js». Файл не изменился, но мы успешно осуществили сборку проекта.

взято из туториала https://habr.com/ru/post/524260/
***************************************
1й плагин для создания html файла на основе шаблона
npm i -D html-webpack-plugin
Создаем файл «template.html» в директории «src». 
Мы можем добавить в шаблон переменные и другую информацию.
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // ...

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/template.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
    ],
}
******************************************
крутой локальный сервер позволяет запускать из терминала и открывать в браузере ваши папки
https://github.com/http-party/http-server
npm install --global http-server
Он будет установлен http-serverглобально,
 так что его можно будет запускать из командной строки где угодно.
и Как зависимость в вашем npmпакете:
npm install http-server
для запуска сервера в консоль пишем -
# http-server
***********************************************
https://github.com/johnagan/clean-webpack-plugin
плагин позволяет автоматически чистить папку дист при каждой сборке проэкта.
// webpack.config.js
const HtmlWebpackPlugin = require('html=webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // ...

    plugins: [
        // ...
        new CleanWebpackPlugin(),
    ],
}
важно установить нпм пакеты в вашу сборку или настроить файл json/
 # npm install --save-dev clean-webpack-plugin
*******************************************************
далее идет сложная часть с вавилонским погрузчиком - Babel
https://webpack.js.org/loaders/babel-loader/
тут мы читаем о каждой состовляющей погрузчика - 
https://www.npmjs.com/package/@babel/core
https://babeljs.io/docs/en/babel-preset-env
https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties
пакеты добавлены теперь собственно настройка
// webpack.config.js
module.exports = {
    // ...

    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    }
}
Если вы настраиваете TypeScript-проект, 
то вместо babel-loader следует использовать typescript-loader для всех JavaScript-файлов, 
нуждающихся в транспиляции. 
Вы проверяете файлы с расширением «ts» и используете ts-loader.
************************************************************************
изображения. Мы хотим импортировать изображения в JavaScript-файл, 
но JavaScript не умеет этого делать.
// webpack.config.js
module.exports = {
    // ...

    module: {
        rules: [
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
        ],
    },
}
****************************************************
сюда же через запятую добавим шрифты и свг
// webpack.config.js
module.exports = {
    // ...

    module: {
        rules: [
            // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
}
**********************************************************
теперь собераем sass в css 
# npm install -D sass-loader postcss-loader css-loader style-loader postcss-preset-env node-sass
Как и для Babel, для PostCSS требуется отдельный файл настроек:
// postcss.config.js
module.exports = {
    plugins: {
        'postcss-preset-env': {
            browsers: 'last 2 versions',
        },
    },
}
Импортируем этот файл в index.js и добавляем 4 загрузчика. 
Загрузчики используются вебпаком справа налево, 
так что последним должен быть sass-loader, 
затем PostCSS, затем CSS и, наконец, style-loader, 
который применяет скомпилированные стили к элементам DOM:

// index.js
import './styles/main.scss'

// ...
в строке выше была ошибка в расширении вместо css конечно scss!
// webpack.config.js
module.exports = {
    // ...

    module: {
        rules: [
            // CSS, PostCSS, Sass
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
}

После сборки вы заметите, что Sass и PostCSS применились к DOM.
Обратите внимание, что мы установили настройки для режима разработки. 
Для продакшна следует использовать MiniCssExtractPlugin вместо style-loader, 
который экспортирует минифицированный CSS.
************************************************
Разработка

Каждый раз набирать команду yarn build (npm run build) при необходимости повторной сборки проекта 
может быть утомительным. Чем больше проект, тем дольше он будет собираться. 
Поэтому необходимо иметь два файла настроек вебпака:

Настройки для продакшна, включающие минификацию, 
оптимизацию и удаление всех карт ресурсов (source maps)
Настройки для разработки, включая запуск сервера, 
обновление при каждом изменении и карты ресурсов
https://github.com/webpack/webpack-dev-server
npm install -D webpack-dev-server

// webpack.config.js
const webpack = require('webpack')

module.exports = {
    // ...
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        // ...
        // применять изменения только при горячей перезагрузке
        new webpack.HotModuleReplacementPlugin(),
    ],
}
вносим команду запуска
// package.json
"scripts": {
    "start": "webpack serve"
}
для запуска используем инициализацию в терминале -
# npm run start

https://survivejs.com/webpack/techniques/deploying/
npm add gh-pages --develop
После постройки ( npm run build) и развертывание ( npm run deploy), у вас должно быть приложение от dist/каталог, размещенный на страницах GitHub. Вы должны найти его в https://<name>.github.io/<project>при условии, что все прошло нормально. 