export default function CustomerReviews()
{
    return(
        <>
        <div class="mx-auto text-center md:max-w-xl lg:max-w-3xl ">
          <h3
            class="mb-6 text-4xl font-bold text-[black] dark:text-neutral-200">
            Customer Reviews
          </h3>
        </div>

        {/* <!-- Container for the Testimonials --> */}
        <div class="grid gap-6 text-center md:grid-cols-3 lg:gap-12 m-20">
          {/* <!-- First Testimonial --> */}
          <div class="mb-12 md:mb-0">
            <div class="mb-6 flex justify-center">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg"
                class="w-32 rounded-full shadow-lg dark:shadow-black/30" />
            </div>
            <h5 class="mb-4 text-xl font-semibold">Maria Smantha</h5>
            <p class="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="inline-block h-7 w-7 pr-2"
                viewBox="0 0 24 24">
                <path
                  d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
              </svg>
              I recently purchased a stunning watch from DeviceHub, and I couldn't be happier with my choice. The quality and design exceeded my expectations. The best part was the seamless shopping experience. DeviceHub's customer service is exceptional, and the delivery was prompt. I highly recommend them.
            </p>
          </div>

          {/* <!-- Second Testimonial --> */}
          <div class="mb-12 md:mb-0">
            <div class="mb-6 flex justify-center">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).jpg"
                class="w-32 rounded-full shadow-lg dark:shadow-black/30" />
            </div>
            <h5 class="mb-4 text-xl font-semibold">Lisa Cudrow</h5>
            <p class="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="inline-block h-7 w-7 pr-2"
                viewBox="0 0 24 24">
                <path
                  d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
              </svg>
              I bought a pair of high-quality headphones from DeviceHub. The sound quality is fantastic, and they are incredibly comfortable to wear for extended periods. I'm satisfied with my purchase.
            </p>
          </div>

            {/* <!-- Third Testimonial --> */}
            <div class="mb-0">
              <div class="mb-6 flex justify-center">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg"
                  class="w-32 rounded-full shadow-lg dark:shadow-black/30" />
              </div>
              <h5 class="mb-4 text-xl font-semibold">John Smith</h5>
              <p class="mb-4 text-black dark:text-neutral-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="inline-block h-7 w-7 pr-2"
                  viewBox="0 0 24 24">
                  <path
                    d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
                DeviceHub has become my go-to destination for all things electronic. Their range of laptops is impressive, and the customer support is outstanding. I recently upgraded to a new laptop, and the DeviceHub team helped me choose the perfect one for my needs. I'm extremely happy with my purchase and the guidance I received.
              </p>
            </div>
        </div>
        </>
    );
}