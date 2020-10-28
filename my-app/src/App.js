import React , {useState} from 'react'
const api = {
  key:'1982f67aa49115c73ee017621b112a4c',
  base:'https://api.openweathermap.org/data/2.5/'
}

function App() {
 const [query , setQuery ] = useState('');
 const [weather , setWeather] = useState({});

 const search = evt => {
   if (evt.key === "Enter"){
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(res => res.json())
     .then(result =>{
       setWeather(result);
       setQuery('');
       console.log(result)
     });
     

   }
 }



 const dateBuilder = (d) => {
   let months  = [
     "January","Fabruary","March","April","June","July","Augest","Septembver","Octuber","November","December"
   ]
   let days = [
     "Monday" , "Tuesday" , "Wednesday" ,"Thursday" , "Friday" , "Saturday" , "Sunday"
   ]

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
 }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.weather[0].main === "Clear" ) ? 'app warm'  : 'app rain') : 'app'}>
     <main>
     <div className="search-box">
       <input
       type="text"
       placeholder="Search Weather.."
       className="search-bar"
       value={query}
       onKeyPress={search}
       onChange={e => setQuery(e.target.value)}
       />
     </div>
     { (typeof weather.main != "undefined" ) ? (
     <div>
       <div className="location-name">
     <div className="location">{weather.name} , {weather.sys.country}</div>
  <div className="date"> {dateBuilder(new Date())}</div>
     </div>
     <div className="weather-box">
     <div className="temp"><h3>{Math.round(weather.main.temp)}&#8451;</h3></div>
     <div className="weather"><h5>{weather.weather[0].main}</h5></div>
     </div>
     </div>
     ) : ('')}
     </main>
    </div>
  );
}


export default App;
