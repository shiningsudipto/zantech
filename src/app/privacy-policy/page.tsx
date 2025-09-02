type PolicySection = {
  title: string;
  content: string[];
};

const privacyPolicy: PolicySection[] = [
  {
    title: "Information We Collect",
    content: [
      "Personal Information: When you place an order or register an account with us, we may collect personal information such as your name, email address, shipping address, phone number, and payment information.",
      "Usage Information: We may collect information about how you interact with our website, including your IP address, browser type, device information, pages visited, and referring website.",
      "Cookies: We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of our website.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use your personal information to process and fulfill orders, communicate with you about your orders, provide customer support, and improve our products and services.",
      "We may use usage information to analyze trends, administer our website, and gather demographic information for aggregate use.",
      "We may use cookies to remember your preferences, personalize content and advertisements, and track your interactions with our website.",
    ],
  },
  {
    title: "Information Sharing and Disclosure",
    content: [
      "We do not sell, trade, or rent your personal information to third parties for marketing purposes. However, we may share your information with trusted service providers who assist us in operating our website, conducting business, or servicing you.",
      "We may also disclose your information when required by law or to protect our rights, property, or safety, or that of others.",
      "If Zan Tech is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any such change in ownership or control of your personal information.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.",
      "Despite our efforts to safeguard your information, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security of your information.",
    ],
  },
];

const page = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Privacy Policy
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        At Zan Tech, we are committed to protecting your privacy and personal
        information. This privacy policy outlines how we collect, use, and
        disclose your information when you use our website or services. By
        accessing our website or purchasing products from us, you consent to the
        collection, use, and disclosure of your information as described in this
        policy.
      </p>

      {/* Sections */}
      <div className="space-y-8 text-lg leading-relaxed text-gray-700">
        {privacyPolicy.map((section, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
            <ul className="list-disc list-inside space-y-2">
              {section.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-12 text-gray-700">
        If you have any questions or concerns about this privacy policy, please
        contact us. Thank you for choosing Zan Tech.
      </p>
    </main>
  );
};

export default page;
