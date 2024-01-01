import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  type Container,
  type ISourceOptions
} from "@tsparticles/engine";

const Stars = () => {

    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {};

    const options: ISourceOptions = useMemo(
        () => ({
            background: {},
            fpsLimit: 30,
            interactivity: {},
            particles: {
                number: {
                    value: 100,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "out",
                    },
                    random: true,
                    speed: 0.1,
                    straight: false,
                },
                opacity: {
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false,
                    },
                    value: { min: 0, max: 1 },
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
        />
    )
}

export default Stars;