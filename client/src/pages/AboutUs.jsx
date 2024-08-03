import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AboutUs()
{

    return(
        <>
        <NavBar/>
        <div className = "">
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Welcome to DeviceHub, your premier destination for top-tier electronics. Established in 2023, DeviceHub has been committed to offering a curated selection of high-quality devices, including watches, phones, laptops, and headphones. We're passionate about providing our customers with the latest technology and exceptional shopping experiences. With years of expertise in the electronics industry, DeviceHub is your trusted source for cutting-edge gadgets. Join us on this tech journey, and elevate your digital lifestyle.</p>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
                </div>
            </div>

            <div className="w-full flex flex-col justify-center ">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">DeviceHub's journey is a testament to the relentless pursuit of innovation in the ever-evolving world of technology. Established in 2023, we embarked on this remarkable voyage with a singular vision: to be your premier destination for top-tier electronics. Our commitment to excellence has been unwavering from the very beginning.From the inception of DeviceHub, we've been driven by a deep passion for all things tech. We understood that technology isn't just a tool; it's an integral part of modern life. It keeps us connected, informed, and entertained, enriching our daily experiences. In this digital age, we wanted to ensure that everyone could access the latest and most exceptional devices effortlessly.Our journey was marked by the pursuit of quality, precision, and curation. We believe that offering a wide range of electronics isn't enough; they must meet the highest standards of excellence. That's why we painstakingly handpick every product in our collection, including watches, phones, laptops, and headphones. Each device showcased at DeviceHub is a testament to our commitment to providing you with the best.DeviceHub has evolved beyond being just an online electronics store. It's a community, a hub for tech enthusiasts, and a trusted source for staying at the forefront of innovation. We're not just keeping up with technology; we're shaping its course. Our team of experts, fueled by passion and expertise, is here to guide you through the ever-changing landscape of electronics.</p><br/>    
                    <p className="font-normal text-base leading-6 text-gray-600 ">In the heart of our journey is the belief that technology should simplify and enhance your life. It should be accessible, reliable, and transformative. We're here to ensure that technology empowers you, whether you're staying connected, exploring new possibilities, or pursuing your passions.As DeviceHub continues to grow, our mission remains the same: to be your trusted partner in this exciting tech-driven world. Join us on this extraordinary adventure, and let's shape the future of technology together.</p>
                </div>

                <div className="flex flex-col lg:flex-row justify-between gap-8 my-20">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">How Do We Help You?</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">At DeviceHub, our mission is to simplify your technology shopping experience. We've meticulously curated a selection of top-tier electronic devices, including watches, phones, laptops, and headphones, to ensure you have access to the finest products available. Our team of tech experts is here to provide guidance and recommendations, helping you make informed decisions. Stay in the know with the latest tech trends, and count on our exceptional customer service every step of the way. Since 2023, DeviceHub has been your trusted source for cutting-edge gadgets, making us the perfect partner to elevate your digital lifestyle.</p>
            </div>
            <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VydmljZSUyMGRlc2t8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="A group of People" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12 my-20">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Team</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Behind the scenes at DeviceHub, there's a dynamic and talented team of individuals who are deeply passionate about technology. We're a diverse group, each bringing our unique skills and experiences to the table, united by a shared love for innovation. From our tech wizards who tirelessly test and curate the latest gadgets to our customer service heroes who ensure you have a seamless shopping experience, every member of our team plays a vital role in making DeviceHub your go-to destination for cutting-edge electronics. We're not just coworkers; we're a family fueled by a common goal — to elevate your digital lifestyle. Together, we're constantly exploring emerging trends, staying ahead of the curve, and dedicating ourselves to providing you with the best devices that technology has to offer. DeviceHub is not just a store; it's a community of tech enthusiasts committed to helping you unlock the incredible potential of modern technology.</p>
                </div>
                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Alexa</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Olivia</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Liam</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured img" />
                            <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Elijah</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
        </>
    );
}