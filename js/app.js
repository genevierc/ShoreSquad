(function(){
  'use strict';

  // Small interactive/app shell for ShoreSquad.
  document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('year').textContent = new Date().getFullYear();
    initUI();
    // Defer heavy map loading until user action or idle time for performance.
    // lazyLoadMap(); // call when ready
  });

  function initUI(){
    const locateBtn = document.getElementById('locate-btn');
    const createEventBtn = document.getElementById('create-event');

    locateBtn.addEventListener('click', function(){
      locateBtn.disabled = true;
      locateBtn.textContent = 'Locating...';
      geolocateUser().then(pos => {
        locateBtn.textContent = 'Located';
        // TODO: initialize map and center on pos
        // load map lazily when user requests it
        lazyLoadMap(pos);
        fetchWeather(pos.coords.latitude, pos.coords.longitude).then(updateWeatherUI);
      }).catch(err => {
        locateBtn.disabled = false;
        locateBtn.textContent = 'Use My Location';
        alert('Unable to get location: ' + err.message);
      });
    });

    createEventBtn.addEventListener('click', function(){
      // Simple accessible prompt; replace with a proper modal in full app.
      const title = prompt('Event title (e.g. "Sunset Beach Cleanup")');
      if(title){
        addEventToList({title, date: new Date().toLocaleString()});
      }
    });
  }

  function addEventToList(event){
    const list = document.getElementById('events-list');
    const li = document.createElement('li');
    li.textContent = event.title + ' — ' + event.date;
    list.prepend(li);
  }

  function geolocateUser(){
    return new Promise(function(resolve,reject){
      if(!navigator.geolocation) return reject(new Error('Geolocation not supported')); 
      navigator.geolocation.getCurrentPosition(resolve, reject, {timeout:10000});
    });
  }

  function updateWeatherUI(data){
    const el = document.getElementById('weather');
    if(!data){ el.textContent = 'Weather: unavailable'; return }
    el.textContent = `Weather: ${data.summary}, ${data.temp}°`;
  }

  async function fetchWeather(lat, lon){
    // NOTE: This is a stub. Use a real weather API (OpenWeatherMap, Meteo, etc.)
    // Example with OpenWeatherMap (requires API key):
    // const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    // const json = await resp.json();
    // return { summary: json.weather[0].main, temp: Math.round(json.main.temp) };

    // For now, return fake data to demonstrate UI.
    return new Promise(res => setTimeout(()=>res({summary:'Sunny', temp:24}), 400));
  }

  function lazyLoadMap(initialPos){
    // Performance: only load heavy map libs when needed. Use requestIdleCallback if available.
    const doLoad = () => {
      if(window.SHORE_SQUAD_MAP_LOADED) return;
      // Example placeholder: in production, load Leaflet/Mapbox script and init map.
      const mapEl = document.getElementById('map');
      mapEl.innerHTML = '';
      const box = document.createElement('div');
      box.textContent = 'Map loaded (placeholder)';
      box.style.padding = '1rem';
      mapEl.appendChild(box);
      window.SHORE_SQUAD_MAP_LOADED = true;
      if(initialPos){
        // center map on initialPos
      }
    };

    if('requestIdleCallback' in window){
      requestIdleCallback(doLoad, {timeout:2000});
    } else {
      setTimeout(doLoad, 500);
    }
  }

    // Utility: debounce for search or resize handlers.
    function debounce(fn, wait){
      let t;
      return function(...args){
        clearTimeout(t);
        t = setTimeout(()=>fn.apply(this,args), wait);
      };
    }

  })();