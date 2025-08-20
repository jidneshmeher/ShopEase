import { useRef } from "react";
import PromoVideo from "../../../assets/videos/promo.mp4";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const VideoSection = () => {
  const videoRef = useRef();
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.from(videoRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",  
        end: "+=1000",        
        scrub: true,         
        pin: true,            
        pinSpacing: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <video
        src={PromoVideo}
        muted
        autoPlay
        loop
        playsInline
        className="w-full h-full object-cover"
        ref={videoRef}
      />
    </section>
  );
};

export default VideoSection;
