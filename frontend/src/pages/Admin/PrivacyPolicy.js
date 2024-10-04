import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Privacy Policy for Sahay 24x7</h1>
      <p className="text-base md:text-lg">
        Welcome to Sahay24x7, a service provided by Fix Wiser Construction and Development. We are committed to
        protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal
        information when you visit our website{' '}
        <a href="https://sahay24x7.com" className="text-blue-500 hover:underline">
          https://sahay24x7.com
        </a>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
      <p className="text-base md:text-lg">We may collect the following personal information from you:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Location Information: We collect your location data to provide location-based services.</li>
        <li>Contact Information: We collect your contact details such as name, email address, and phone number when you use our services or contact us.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
      <ul className="list-disc list-inside mt-2">
        <li>To Provide Services: We use your location and contact information to provide and manage our services, including booking and scheduling appointments.</li>
        <li>Communication: We may use your contact information to send you updates, promotional materials, and respond to your inquiries.</li>
        <li>Improvement: We analyze the collected information to improve our website and services.</li>
        <li>Legal Compliance: We may use your information to comply with legal obligations and protect our legal rights.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Sharing Your Information</h2>
      <p className="text-base md:text-lg">
        We do not sell, trade, or otherwise transfer your personal information to outside parties except when necessary
        to provide our services, comply with the law, or protect our rights.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Security</h2>
      <p className="text-base md:text-lg">
        We implement a variety of security measures to maintain the safety of your personal information. This includes
        encryption, access controls, and secure storage.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Third-Party Links</h2>
      <p className="text-base md:text-lg">
        Our website may contain links to third-party sites. We are not responsible for the privacy practices of these
        sites. We encourage you to review their privacy policies.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">No Refund Policy</h2>
      <p className="text-base md:text-lg">We do not offer refunds for any services provided through Sahay24x7.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Shipping Not Applicable</h2>
      <p className="text-base md:text-lg">Shipping is not applicable to the services provided by Sahay24x7.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">No Cancellation Policy</h2>
      <p className="text-base md:text-lg">Once a service is booked and confirmed through Sahay24x7, it cannot be canceled.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
      <p className="text-base md:text-lg">We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
      <p className="text-base md:text-lg">
        If you have any questions about this Privacy Policy, please contact us at{' '}
        <a href="mailto:support@sahay24x7.com" className="text-blue-500 hover:underline">support@sahay24x7.com</a>.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
