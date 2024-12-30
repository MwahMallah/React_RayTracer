import { useEffect, useRef, useState } from "react";
import Sphere from "../logic/Sphere";

export function useDraw({plane, camera, width, height}) {
    const contextRef = useRef(null);
    const [spheres, setSpheres] = useState([]);

    function putPixel(pixels, x, y, color) {
        const offset = Math.floor((y * width + x) * 4);
        pixels.data[offset] = Math.floor(color.r);
        pixels.data[offset + 1] = Math.floor(color.g);
        pixels.data[offset + 2] = Math.floor(color.b);
        pixels.data[offset + 3] = 255;
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

        contextRef.current.putImageData(pixels, 0, 0);
    }

    useEffect(() => {
        setSpheres([
            new Sphere(0, 0, -3, 2, [1, 0, 0]), 
            new Sphere(0, 1, -2, 0.5, [0, 1, 0]), 
            new Sphere(-1, 0, -3, 1, [0, 0, 1])
        ]);
    }, []);

    function setContext(context) {
        contextRef.current = context;
    }

    return [draw, setContext];
}