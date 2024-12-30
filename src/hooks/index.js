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

    function getPixelColor(ray) {
        const intersections = [];
        const a = 1;

        for (const sphere of spheres) {    
            const ray2sphere = camera.pos.minus(sphere.pos);                                        
            const b = 2 * ray2sphere.dot(ray.scale(1 / (ray.length())));
            const c = ray2sphere.length() ** 2 - sphere.radius ** 2;

            const discr = b ** 2 - 4 * a * c;

            if (discr === 0) {
                const t = -b / (2 * a);
                if (t < 0) 
                    continue;

                intersections.push({t, color: {
                    r: sphere.r * 255,
                    g: sphere.g * 255, 
                    b: sphere.b * 255
                }});   
            } else if (discr > 0) {
                const discrSqr = Math.sqrt(discr);
                const t1 = (-b + discrSqr) / (2 * a);
                const t2 = (-b - discrSqr) / (2 * a);

                if (t1 > 0) {
                    intersections.push({t: t1, color: {
                        r: sphere.r * 255,
                        g: sphere.g * 255, 
                        b: sphere.b * 255
                    }});
                }

                if (t2 > 0) {
                    intersections.push({t: t2, color: {
                        r: sphere.r * 255,
                        g: sphere.g * 255, 
                        b: sphere.b * 255
                    }});
                }
            }
        }

        if (intersections.length === 0)
            return {r: 0, g: 0, b: 0};

        const nearest = intersections.reduce((closest, current) =>
            current.t < closest.t ? current : closest
        );

        console.log(intersections);
        return nearest.color;
    }

    function draw() {
        const pixels = contextRef.current.getImageData(0, 0, width, height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pos = getPosition(x, y);
                const ray = pos.minus(camera.pos);

                const color = getPixelColor(ray);
                putPixel(pixels, x, y, color);
            }
        }

        contextRef.current.putImageData(pixels, 0, 0);
    }

    useEffect(() => {
        setSpheres([
            // red
            new Sphere(0, 0, 20, 2, [1, 0, 0]), 
            // green
            new Sphere(0, 3, 13, 2, [0, 1, 0]), 
            // blue
            new Sphere(-3, 0, 5, 2, [0, 0, 1])
        ]);
    }, []);

    function setContext(context) {
        contextRef.current = context;
    }

    return [draw, setContext];
}