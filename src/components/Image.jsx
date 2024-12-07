import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import Camera from "../logic/Camera";
import ImagePlane from "../logic/ImagePlane"

function Image({width, height, camera, plane, ...rest}) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        initCanvas();
        draw();
    }, []);

    function initCanvas() {
        const context = canvasRef.current.getContext("2d");
        contextRef.current = context;
    }

    function getPosition(x, y) {
        const alpha = x / width;
        const betha = y / height;

        const t = plane.x1.scale(1 - alpha).add(plane.x2.scale(alpha));
        const b = plane.x3.scale(1 - alpha).add(plane.x4.scale(alpha));
        const p = t.scale(1 - betha).add(b.scale(betha));
        return p;
    }

    function draw() {
        const pixels = contextRef.current.getImageData(0, 0, width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pos = getPosition(x, y);
                const ray = pos.minus(camera.pos);
                putPixel(
                    pixels, x, y, {
                        r: (ray.x + 1) * 128,
                        g: (ray.y + 1) * 128,
                        b: 128
                    }
                );
            }
        }

        console.log(getPosition(255, 0));
        contextRef.current.putImageData(pixels, 0, 0);
    }

    function putPixel(pixels, x, y, color) {
        const offset = Math.floor((y * width + x) * 4);
        pixels.data[offset] = Math.floor(color.r);
        pixels.data[offset + 1] = Math.floor(color.g);
        pixels.data[offset + 2] = Math.floor(color.b);
        pixels.data[offset + 3] = 255;
    }

    return (
        <canvas
            width={width}
            height={height}
            ref={canvasRef}
            {...rest}>
        </canvas>
    )
}

Image.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    camera: PropTypes.instanceOf(Camera).isRequired,
    plane: PropTypes.instanceOf(ImagePlane).isRequired
}

export default Image
