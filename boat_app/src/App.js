import logo from './image 1.png';
import logo2 from './image 2.png';
import './App.css';

function App() {
  return (
    <div className="App">
    <body>
    <div class="topbanner"></div>
    <div class="boatmonitor">Boat Monitor</div>
    <div class="camera"></div>
    <img src={logo} className="image1"/>
    <img src={logo2} className="image2"/>
    <div class="connection">No connection</div>
    <div class="rec1"></div>
    <div class="cabin">Cabin</div>
    <div class="srec1"></div>
    <div class="tempword1">Temperature:</div>
    <div class="degree1">--°C</div>
    <div class="srec2"></div>
    <div class="humidword1">Humidity:</div>
    <div class="percent1">--%</div>
    <div class="rec2"></div>
    <div class="engine">Engine</div>
    <div class="srec3"></div>
    <div class="tempword2">Temperature:</div>
    <div class="degree2">--°C</div>
    <div class="srec4"></div>
    <div class="humidword2">Humidity:</div>
    <div class="percent2">--%</div>
    </body>
    </div>
  );
}

export default App;
