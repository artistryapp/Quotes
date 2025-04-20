
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

interface ParticlesBackgroundProps {
  gradientIndex: number;
}

const gradients = [
  ["#FF6B6B", "#6B5BFF"],
  ["#9B87F5", "#33C3F0"],
  ["#1EAEDB", "#8B5CF6"],
  ["#6E59A5", "#D946EF"],
  ["#0EA5E9", "#7E69AB"],
  ["#F97316", "#9B87F5"],
];

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ gradientIndex }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const colors = gradients[gradientIndex % gradients.length];

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 -z-10"
      options={{
        background: {
          color: {
            value: colors[0],
          },
        },
        particles: {
          color: {
            value: colors[1],
          },
          move: {
            enable: true,
            direction: "none",
            speed: 0.3,
          },
          number: {
            value: 160,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          size: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.1,
              sync: false,
            },
          },
          opacity: {
            value: 0.25,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: colors[1],
            opacity: 0.1,
            width: 1,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.15,
              },
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

export default ParticlesBackground;
