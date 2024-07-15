import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>Welcome to Sahay24x7's privacy policy ("Privacy Policy" or "Policy").</p>
      <p className="mt-4">
        We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App"). By using the App, you agree to the collection and use of information in accordance with this policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
      <h3 className="text-xl font-semibold mt-4">a. Personal Data</h3>
      <p>When you use our App, we may collect the following personal information from you:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Location Data: We collect precise or approximate location data from your mobile device to provide location-based services.</li>
        <li>Contacts List: We access your contacts list to facilitate the core functionalities of the App, such as managing and organizing your contacts for better service delivery.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">b. Service Usage Data</h3>
      <p>We collect information about the services you request and use through the App, including:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Types of services requested (e.g., cleaning, carpentry, washing, etc.)</li>
        <li>Appointment details, such as date, time, and location.</li>
        <li>Service feedback and ratings.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
      <p>We use the information we collect for various purposes, including:</p>
      <ul className="list-disc list-inside mt-2">
        <li>To Provide and Manage Services: We use your information to facilitate the services you request, manage appointments, and ensure quality service delivery.</li>
        <li>To Improve the App: We analyze usage data to understand how the App is used and to make improvements.</li>
        <li>To Communicate with You: We may use your contact information to send updates, notifications, and respond to your inquiries.</li>
        <li>For Marketing and Promotions: With your consent, we may send you promotional materials and offers related to our services.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Share Your Information</h2>
      <p>We may share your information with third parties only as described in this Privacy Policy:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Service Providers: We share your information with service providers who perform tasks on our behalf, such as cleaning professionals, carpenters, and other household service providers.</li>
        <li>Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">4. Your Rights and Choices</h2>
      <p>You have the following rights regarding your personal information:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Access and Update: You can access and update your personal information through the App settings.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">5. Security of Your Information</h2>
      <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">6. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">7. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <p>Sahay24x7 Support Team</p>
      <p>Email: <a href="mailto:support@sahay24x7.com" className="text-blue-500">support@sahay24x7.com</a></p>
    </div>
  );
}

export default PrivacyPolicy;
