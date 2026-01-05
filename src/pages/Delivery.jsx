const Delivery = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Delivery & Return</h1>
        
        <div className="space-y-8">
          {/* Delivery Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Standard Delivery</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Timeframe:</strong> 5-7 business days
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Cost:</strong> Free for orders over 500 EE, otherwise 50 EE
                </p>
                <p className="text-gray-700">
                  Your order will be processed within 1-2 business days and shipped via our trusted courier partners.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Express Delivery</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Timeframe:</strong> 2-3 business days
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Cost:</strong> 100 EE
                </p>
                <p className="text-gray-700">
                  For urgent orders, choose express delivery for faster shipping.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Same-Day Delivery</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Timeframe:</strong> Same day (Cairo only)
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Cost:</strong> 150 EE
                </p>
                <p className="text-gray-700">
                  Available for orders placed before 12 PM in Cairo. Subject to availability.
                </p>
              </div>
            </div>
          </section>

          {/* Return Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">30-Day Return Policy</h3>
                <p className="text-gray-700 mb-4">
                  We offer a hassle-free 30-day return policy on all items. To be eligible for a return:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Items must be in their original condition</li>
                  <li>Tags must still be attached</li>
                  <li>Items must be unworn and unwashed</li>
                  <li>Original packaging should be included when possible</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">How to Return</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Log into your account and go to "My Orders"</li>
                  <li>Select the item(s) you want to return</li>
                  <li>Print the return label provided</li>
                  <li>Package the item(s) securely with the return label</li>
                  <li>Drop off at any authorized courier location</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Refund Process</h3>
                <p className="text-gray-700 mb-2">
                  Once we receive your returned item(s), we will:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Inspect the item(s) within 2-3 business days</li>
                  <li>Process your refund to the original payment method</li>
                  <li>Send you a confirmation email</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  <strong>Note:</strong> Refunds may take 5-10 business days to appear in your account.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-lg mb-2">Non-Returnable Items</h3>
                <p className="text-gray-700">
                  For hygiene reasons, the following items cannot be returned:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                  <li>Underwear and intimate apparel</li>
                  <li>Items that have been worn or washed</li>
                  <li>Items without original tags</li>
                  <li>Personalized or customized items</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Exchange Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Exchange Policy</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We're happy to exchange items for a different size or color, subject to availability. 
                Exchanges must be requested within 30 days of purchase.
              </p>
              <p className="text-gray-700">
                To request an exchange, please contact our customer service team or use the return process 
                and place a new order for the desired item.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Delivery;

