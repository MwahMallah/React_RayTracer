import Image from "./components/Image";
import Camera from "./logic/Camera";
import ImagePlane from "./logic/ImagePlane";

const WIDTH = 256;
const HEIGHT = 196;

function App() {
    const plane = new ImagePlane();
    const camera = new Camera(0, 0, -1);

    return (
        <Image width={WIDTH} height={HEIGHT} camera={camera} plane={plane}/>
    )
}

export default App
