type Term = {
  title: string;
  content: string;
};

const terms: Term[] = [
  {
    title: "Acceptance of Terms",
    content:
      "By using our website or services, you acknowledge that you have read, understood, and agree to comply with these terms and conditions. If you do not agree with any part of these terms, you must not use our website or services.",
  },
  {
    title: "Products and Pricing",
    content:
      "We strive to provide accurate descriptions and pricing information for all products listed on our website. However, we reserve the right to modify product specifications, prices, and availability without prior notice. All prices are in the local currency and are inclusive of applicable taxes, unless otherwise stated.",
  },
  {
    title: "Ordering and Payment",
    content:
      "When you place an order through our website, you agree to provide accurate and complete information. Payment must be made in full at the time of purchase, and we accept various payment methods as indicated on our website. Your order is subject to acceptance by us, and we reserve the right to refuse or cancel any order for any reason.",
  },
  {
    title: "Shipping and Delivery",
    content:
      "We aim to process and ship orders promptly, but delivery times may vary depending on your location and other factors beyond our control. Shipping costs and delivery options are provided during the checkout process. We are not responsible for any delays or damages caused during transit, but we will assist you in resolving any issues with the shipping carrier to the best of our ability.",
  },
  {
    title: "Returns and Exchanges",
    content:
      "We want you to be completely satisfied with your purchase. If you are not satisfied for any reason, you may return the product(s) within [X] days of receipt for a refund or exchange, subject to our returns policy. Returned products must be in their original condition and packaging, and you are responsible for return shipping costs unless the product is defective or damaged.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content, including but not limited to text, images, logos, and trademarks, on our website is the property of Zan Tech or its licensors and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content from our website without prior written permission.",
  },
  {
    title: "Privacy Policy",
    content:
      "We are committed to protecting your privacy and personal information. Our privacy policy outlines how we collect, use, and disclose your information when you use our website or services. By using our website or services, you consent to the collection, use, and disclosure of your information as described in our privacy policy.",
  },
  {
    title: "Limitation of Liability",
    content:
      "In no event shall Zan Tech or its affiliates be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services, including but not limited to lost profits, loss of data, or business interruption. Our total liability to you for any claim arising out of or related to these terms and conditions shall not exceed the amount paid by you for the products or services in question.",
  },
  {
    title: "Governing Law",
    content:
      "These terms and conditions shall be governed by and construed in accordance with the laws of Bangladesh. Any disputes arising out of or relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts of Bangladesh.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to update or modify these terms and conditions at any time without prior notice. Any changes will be effective immediately upon posting on our website. It is your responsibility to review these terms periodically for any updates or changes.",
  },
];

const page = () => {
  return (
    <div className="section-gap px-6 py-12">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Terms and Conditions
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        These terms and conditions govern your use of Zan Tech’s website and
        services. By accessing our website or purchasing products from us, you
        agree to be bound by these terms and conditions. Please read them
        carefully before proceeding.
      </p>

      {/* Map through terms */}
      <div className="space-y-8 text-lg leading-relaxed text-gray-700">
        {terms.map((term, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-3">{term.title}</h2>
            <p>{term.content}</p>
          </section>
        ))}
      </div>

      <p className="mt-12 text-gray-700">
        If you have any questions or concerns about these terms and conditions,
        please contact us. Thank you for choosing Zan Tech.
      </p>
    </div>
  );
};

export default page;
