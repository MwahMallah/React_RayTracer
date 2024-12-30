import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import Camera from "../logic/Camera";
import ImagePlane from "../logic/ImagePlane";
import { useDraw } from "../hooks";

function Image({width, height, camera, plane, ...rest}) {
    const canvasRef = useRef(null);
    const [draw, setContext] = useDraw({width, height, plane, camera});

    useEffect(() => {
        setContext(getContext());
        draw();
    }, [draw, setContext]);

    function getContext() {
        return canvasRef.current.getContext("2d");
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
