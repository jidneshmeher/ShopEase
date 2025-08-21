import DeviceGroupImg from "../assets/images/about/device-group.png";
import ServiceDeskImg from "../assets/images/about/service-desk.jpg";
import AlexaImg from "../assets/images/about/alexa.png";
import AlexaImgMini from "../assets/images/about/alexa-mini.png";
import OliviaImg from "../assets/images/about/olivia.png";
import OliviaImgMini from "../assets/images/about/olivia-mini.png";
import LiamImg from "../assets/images/about/liam.png";
import LiamImgMini from "../assets/images/about/liam-mini.png";
import ElijahImg from "../assets/images/about/elijah.png";  
import ElijahImgMini from "../assets/images/about/elijah-mini.png";  

export default function AboutUs() {
  return (
    <>
      <div>
        <div className="sm:px-16 lg:py-16 md:py-12 py-9 px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About ShopEase</h1>
              <p className="font-normal text-base leading-6 text-gray-600">
                Welcome to ShopEase, your ultimate destination for seamless online shopping. Founded in 2023, ShopEase is dedicated to offering a wide variety of high-quality products, ranging from electronics and fashion to home essentials. We aim to provide not only a comprehensive product selection but also a shopping experience that is smooth, secure, and enjoyable for all our customers. With years of experience in e-commerce, our team ensures every purchase is effortless and reliable, empowering our users to explore the world of online shopping with confidence and convenience. ShopEase is more than a store; it is your trusted partner in fulfilling your daily needs and aspirations, ensuring that quality and service go hand in hand. Join us on this journey and discover a smarter way to shop.
              </p>
            </div>
            <div className="w-full lg:w-8/12">
              <img className="w-full h-full" src={DeviceGroupImg} alt="A group of people" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center mt-12">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
            <p className="font-normal text-base leading-6 text-gray-600">
              ShopEase was born from a vision to redefine online shopping. Since our inception in 2023, we have focused on creating an online marketplace that combines convenience, variety, and reliability. Our commitment to excellence is unwavering, and it drives every aspect of our operations—from curating the finest products to ensuring the highest standards of customer service. At ShopEase, we understand that shopping online should not only meet your needs but also enhance your lifestyle. Our story is built on innovation, trust, and a passion for connecting people with products that improve their daily lives.
            </p>
            <br />
            <p className="font-normal text-base leading-6 text-gray-600">
              Behind ShopEase is a team of dedicated professionals who believe in the transformative power of e-commerce. We continuously innovate to provide features that make shopping effortless, secure, and personalized. We value feedback, embrace technology, and strive to create a platform that adapts to the evolving needs of our users. ShopEase is not just about transactions; it is about building lasting relationships with our customers, helping them discover the products they love and ensuring a seamless experience from browsing to delivery. Our journey has only just begun, and we are committed to growing alongside our users, making online shopping smarter and more enjoyable every day.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-8 my-20">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">How Do We Help You?</h1>
              <p className="font-normal text-base leading-6 text-gray-600">
                At ShopEase, our mission is to simplify your online shopping experience. We carefully select products that meet the highest standards of quality and usability, ensuring that you get exactly what you need without hassle. Our team of experts is always ready to provide guidance, recommendations, and support throughout your shopping journey. Whether you are searching for the latest gadgets, fashion trends, or everyday essentials, we aim to make your experience smooth, informed, and enjoyable. Since 2023, ShopEase has been your trusted companion in discovering products that enhance your lifestyle and bring convenience to your daily routine.
              </p>
            </div>
            <div className="w-full lg:w-8/12">
              <img className="w-full h-full object-cover" src={ServiceDeskImg} alt="Service Desk" />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12 my-20">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Team</h1>
              <p className="font-normal text-base leading-6 text-gray-600">
                Behind ShopEase is a talented and passionate team of individuals committed to excellence in e-commerce. Each member brings unique skills and expertise to ensure the highest quality in our services. From product curators and tech experts to customer support heroes, our team works tirelessly to deliver a seamless shopping experience. ShopEase is more than a platform; it is a community driven by a shared goal—to make online shopping enjoyable, reliable, and empowering for everyone. Together, we embrace innovation, stay ahead of trends, and dedicate ourselves to exceeding customer expectations every step of the way.
              </p>
            </div>
            <div className="w-full lg:w-8/12 lg:pt-8">
              <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                {[{img: [AlexaImg, AlexaImgMini], name: "Alexa"}, {img: [OliviaImg, OliviaImgMini], name: "Olivia"}, {img: [LiamImg,LiamImgMini], name: "Liam"}, {img: [ElijahImg, ElijahImgMini], name: "Elijah"}].map((member, idx) => (
                  <div key={idx} className="p-4 pb-6 flex justify-center flex-col items-center">
                    <img className="md:block hidden" src={member.img[0]} alt={member.name} />
                    <img className="md:hidden block" src={member.img[1]} alt={member.name} />
                    <p className="font-medium text-xl leading-5 text-gray-800 mt-4">{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
