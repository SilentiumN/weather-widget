# weather-widget Vue.js

## Connecting a widget to your project
### Connection as Vue.js component


- Download weather-widget
- Import weather-widget in your project as WeatherWidget
- Use <WeatherWidget/> in your component


### Connecting as an external script

- Download build.js from /dist folder
- Add script to the end of the body tag, but before the tag <weather-widget/>
```
<path_to_build.js> can be either local or external (if you uploaded the file to the server)
```
```
<script defer="defer" type="text/javascript" src="<path_to_build.js>"></script>`
```
```
<weather-widget/>
```
- **IMPORTANT!!! Don't forget defer="defer" to add to your script**


### Connecting as an external script (example)
```
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Vue App</title>
    
  </head>
  <body>
    <script defer="defer" type="text/javascript" src="./build.js"></script>
    <weather-widget/>
  </body>
</html>
```

## API-key for OpenWeatherAPI (for developments)

- You need open .env in root folder and replace <YOUR_API_KEY> with your API_KEY from https://openweathermap.org
```
VUE_APP_OPEN_WEATHER_API_KEY="<YOUR_API_KEY>"
```

## Run project
### Install dependencies 
```
npm install
```
### Run dev server
```
npm run serve
```
### Generate build.js (Dont't forget unistall folder /dist)
```
npm run prod
```


## Example image

![This is an image](https://github.com/SilentiumN/weather-widget/blob/38ae5dac692b156ab2831ccc1b9ced677ac0acd8/ReadmeIMG/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-08-15%20%D0%B2%2015.49.52.png)
![This is an image](https://github.com/SilentiumN/weather-widget/blob/38ae5dac692b156ab2831ccc1b9ced677ac0acd8/ReadmeIMG/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-08-15%20%D0%B2%2015.50.09.png)
![This is an image](https://github.com/SilentiumN/weather-widget/blob/38ae5dac692b156ab2831ccc1b9ced677ac0acd8/ReadmeIMG/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-08-15%20%D0%B2%2016.08.07.png)
![This is an image](https://github.com/SilentiumN/weather-widget/blob/38ae5dac692b156ab2831ccc1b9ced677ac0acd8/ReadmeIMG/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-08-15%20%D0%B2%2016.08.28.png)
![This is an image](https://github.com/SilentiumN/weather-widget/blob/38ae5dac692b156ab2831ccc1b9ced677ac0acd8/ReadmeIMG/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-08-15%20%D0%B2%2016.08.44.png)
![This is an image](https://github.com/SilentiumN/weather-widget/blob/38ae5dac692b156ab2831ccc1b9ced677ac0acd8/ReadmeIMG/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-08-15%20%D0%B2%2016.08.57.png)
![This is an image](https://github.com/SilentiumN/weather-widget/blob/38ae5dac692b156ab2831ccc1b9ced677ac0acd8/ReadmeIMG/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-08-15%20%D0%B2%2016.09.03.png)




