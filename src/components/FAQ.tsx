import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "How much storage do I get with the free plan?",
      answer:
        "The free plan includes 1GB of storage, which is perfect for small families just getting started. You can upgrade to our Standard plan for 50GB or Premium plan for 500GB anytime.",
    },
    {
      question: "Can I invite family members from different locations?",
      answer:
        "Absolutely! FamilyHub is designed for families spread across the globe. Simply send invitation links to your family members, and they can join from anywhere with an internet connection.",
    },
    {
      question: "Is my family's data secure and private?",
      answer:
        "Yes, security and privacy are our top priorities. All data is encrypted in transit and at rest. We never share your personal information with third parties, and you have full control over who can access your family content.",
    },
    {
      question: "What file types can I upload?",
      answer:
        "You can upload photos (JPG, PNG, GIF), documents (PDF, DOC, DOCX, TXT), and other common file formats. Each file can be up to 10MB on the free plan, with larger limits on paid plans.",
    },
    {
      question: "Can I organize content into categories?",
      answer:
        "Yes! You can organize documents into categories like Family, Legal, Medical, Financial, and Other. Photos can be tagged and organized in albums, and messages can be filtered by family member.",
    },
    {
      question: "How do I upgrade or downgrade my plan?",
      answer:
        "You can change your plan anytime from your account settings. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle.",
    },
    {
      question: "Can I download all my data?",
      answer:
        "Yes, you can bulk download your photos and documents at any time. We believe your family memories belong to you, and you should always have access to them.",
    },
    {
      question: "What happens if I cancel my subscription?",
      answer:
        "If you cancel, you'll have access to all premium features until the end of your billing period. After that, your account will revert to the free plan with 1GB storage. Your data remains safe and accessible.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="faq"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers. Can't find what you're looking
            for?
            <a
              href="mailto:support@familyhub.com"
              className="text-rose-500 hover:text-rose-600 ml-1"
            >
              Contact our support team
            </a>
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-rose-100 mb-6">
              Our friendly support team is here to help you get the most out of
              FamilyHub
            </p>
            <button className="bg-white text-rose-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
