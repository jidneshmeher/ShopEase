export default function Paymentwithcard({Close, visible} )
{

    if(!visible) return null;

    return(
        <>
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
        <div class="max-w-sm mx-auto mt-20 bg-white rounded-md shadow-md overflow-hidden">
    <div class="px-6 py-4 bg-gray-900 text-white flex justify-between ">
        <h1 class="text-lg font-bold ">Credit Card</h1>
        <button type="button" class="bg-white rounded-md p-2  text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() => {Close()}} >
              <span class="sr-only">Close menu</span>
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
    </div>
    <div class="px-6 py-4">

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="card-number">
                Card Number
            </label>
            <input
                class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="card-number" type="text" placeholder="**** **** **** ****" />
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="expiration-date">
                Expiration Date
            </label>
            <input
                class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="expiration-date" type="text" placeholder="MM/YY"/>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="cvv">
                CVV
            </label>
            <input
                class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cvv" type="text" placeholder="***"/>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="cvv">
                Cardholder Name
            </label>
            <input
                class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" placeholder="Full Name"/>
        </div>
        <center>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full " onClick={() => Close()}>
            Place Order
        </button>
        </center>
    </div>
</div>
</div>
        </>
    )
}