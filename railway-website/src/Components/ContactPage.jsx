function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">

          <p className="text-sm font-semibold uppercase tracking-wider text-red-100">
            West Central Railway
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Contact Us
          </h1>

          <p className="mt-3 text-red-100 max-w-2xl">
            Get in touch with West Central Railway for information and assistance.
          </p>

        </div>
      </div>


      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Contact Information */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Contact Information
            </h2>

            <div className="w-14 h-1 bg-red-700 rounded-full mt-3 mb-6"></div>

            <div className="space-y-6">

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-red-100 rounded-lg flex items-center justify-center text-xl shrink-0">
                  📍
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Address
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    West Central Railway Headquarters
                  </p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="w-11 h-11 bg-red-100 rounded-lg flex items-center justify-center text-xl shrink-0">
                  📞
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Phone
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Railway Helpline: 139
                  </p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="w-11 h-11 bg-red-100 rounded-lg flex items-center justify-center text-xl shrink-0">
                  ✉️
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Email
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Official Railway Communication
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">

            <h2 className="text-2xl font-bold text-gray-800">
              Send Us a Message
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Fill in the form below to send your enquiry.
            </p>


            <form className="mt-6 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-600"
                  />
                </div>


                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-600"
                  />
                </div>

              </div>


              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-600"
                />
              </div>


              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-600 resize-none"
                ></textarea>
              </div>


              <button
                type="button"
                className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ContactPage