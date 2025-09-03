type PolicySection = {
  title: string;
  description?: string;
  points?: string[];
};

const returnPolicy: PolicySection[] = [
  {
    title: "Eligibility",
    points: [
      "The product must be unused, in its original packaging, and in the same condition as when you received it.",
      "Certain products, such as software, downloadable products, and gift cards, are not eligible for return or refund.",
    ],
  },
  {
    title: "Return Process",
    points: [
      "Contact our customer service team within 3 days of receiving the product(s) to obtain a Return Merchandise Authorization (RMA) number.",
      "Clearly mark the RMA number on the outside of the package when returning.",
      "You are responsible for return shipping unless the product is defective or damaged.",
      "Use a trackable shipping method to ensure safe return.",
    ],
  },
  {
    title: "Refunds and Exchanges",
    points: [
      "Refunds will be issued to the original payment method, minus applicable fees.",
      "Exchanges will be shipped promptly, subject to availability.",
    ],
  },
  {
    title: "Restocking Fees",
    points: [
      "A restocking fee may apply to certain returns, especially those requiring testing, refurbishing, or repackaging.",
    ],
  },
  {
    title: "Damaged or Defective Products",
    points: [
      "Contact customer service immediately if a product is defective or damaged.",
      "We may require photographic evidence for faster resolution.",
    ],
  },
  {
    title: "Non-Returnable Items",
    points: [
      "Software, downloadable products, and gift cards.",
      "Customized or personalized products unless defective or damaged.",
    ],
  },
  {
    title: "Cancellations",
    points: [
      "Orders may be cancelled for a full refund before shipping. Once shipped, the standard return policy applies.",
    ],
  },
  {
    title: "Changes to This Return Policy",
    points: [
      "We reserve the right to update or modify this policy at any time. Changes are effective immediately upon posting.",
    ],
  },
];

const page = () => {
  return (
    <div className="section-gap py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Return Policy
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        At Zan Tech, we want you to be completely satisfied with your purchase.
        If you are not satisfied, you may return products within 3 days subject
        to the following terms:
      </p>

      <div className="grid gap-6">
        {returnPolicy.map((section, index) => (
          <div key={index} className="">
            <div className="">
              <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
              {section.description && (
                <p className="text-gray-700 mb-2">{section.description}</p>
              )}
              {section.points && (
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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
