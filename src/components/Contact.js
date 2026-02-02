const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Contact Us</h1>
                <p className="text-xl text-center text-gray-700 mb-12 leading-relaxed">
                    Thankyou for reaching out to FoodVilla! We value your feedback and inquiries. Please feel free to contact us through any of the following methods or send us a message using the form below.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                        <div className="text-4xl mb-4 text-indigo-600">📧</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Email</h2>
                        <p className="text-gray-600 text-lg">shreyashp098@gmail.com</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                        <div className="text-4xl mb-4 text-blue-600">📞</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Phone</h2>
                        <p className="text-gray-600 text-lg">+91 91986617</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                        <div className="text-4xl mb-4 text-red-600">📍</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Address</h2>
                        <p className="text-gray-600 text-lg">Naka,Parkiramamarg</p>
                    </div>
                </div>
                <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Send us a message</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">Name</label>
                            <input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-2">Message</label>
                            <textarea id="message" name="message" rows="5" className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-red-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Contact;
