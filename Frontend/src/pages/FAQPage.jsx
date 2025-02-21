import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    { 
      question: "How can I track my order after it has been placed, and what should I do if I don’t receive tracking updates?", 
      answer: "Once your order is placed, you will receive a tracking number via email. You can also track your order from the 'My Orders' section in your account. If there are no updates after 48 hours, please reach out to our support team for assistance." 
    },
    { 
      question: "What is your return and refund policy, and are there any specific conditions that apply to returned products?", 
      answer: "We offer a 30-day return policy from the date of delivery. The product must be unused, in its original packaging, and include all accessories. Refunds will be processed within 5-7 business days once the item is received and inspected. Some products, such as personalized or hygiene-related items, may not be eligible for returns." 
    },
    { 
      question: "Do you offer international shipping, and what are the estimated delivery times for different regions?", 
      answer: "Yes, we offer international shipping to most countries. Standard shipping typically takes 10-15 business days, while express shipping takes 3-7 business days. Delivery times vary based on customs clearance and local courier services." 
    },
    { 
      question: "How do I contact customer support, and what are your service hours for handling queries and complaints?", 
      answer: "You can contact our customer support team via live chat, email at support@example.com, or by calling our toll-free number. Our support hours are Monday to Friday, 9 AM - 7 PM (EST). We aim to respond to all inquiries within 24 hours." 
    },
    { 
      question: "Can I cancel my order after it has been placed, and what happens if my order has already been shipped?", 
      answer: "Orders can be canceled within 12 hours of placement. If your order has already been shipped, cancellation is not possible, but you can return it once delivered for a refund." 
    },
    { 
      question: "Are there any hidden fees, taxes, or additional charges that I should be aware of before placing an order?", 
      answer: "No, all costs, including taxes and shipping fees, are clearly mentioned at checkout. However, international orders may be subject to customs duties, which are the responsibility of the customer." 
    },
    { 
      question: "Is it possible to change my shipping address after I have placed an order, and if so, how do I do it?", 
      answer: "Shipping address changes are only possible within 12 hours of order placement. To request a change, please contact customer support immediately." 
    },
    { 
      question: "What payment methods do you accept, and are there any additional security measures in place for online transactions?", 
      answer: "We accept Visa, Mastercard, PayPal, Apple Pay, and more. Our website uses encrypted payment gateways to ensure the highest level of security for transactions." 
    },
    { 
      question: "How can I apply a discount code to my order, and what should I do if my discount code isn’t working?", 
      answer: "To apply a discount code, enter it at checkout in the 'Promo Code' section. If it doesn’t work, ensure it hasn’t expired and meets the order conditions. Contact support for further help." 
    },
    { 
      question: "How do I report a defective or damaged product, and what is the process for getting a replacement or refund?", 
      answer: "If you receive a defective item, take clear photos and contact our support team within 7 days of delivery. We will arrange a replacement or issue a refund depending on the condition." 
    },
    { 
      question: "Do you have a loyalty or rewards program, and how can I earn and redeem points for discounts on future purchases?", 
      answer: "Yes! Our loyalty program lets you earn points for every purchase. You can redeem points at checkout for discounts on future orders." 
    },
    { 
      question: "How can I subscribe to the newsletter, and what kind of updates and promotions will I receive?", 
      answer: "You can subscribe by entering your email in the footer section. Subscribers receive exclusive deals, new product launches, and special discount codes." 
    },
    { 
      question: "Can I purchase gift cards for your store, and are there any restrictions on their use?", 
      answer: "Yes, we offer digital gift cards in various denominations. They can be used for any product on our website and do not expire." 
    },
    { 
      question: "How long does shipping take, and what are the options for expedited delivery?", 
      answer: "Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days. Delivery timelines may vary depending on location and carrier delays." 
    },
    { 
      question: "Do you offer in-store pickup, and how does the process work for collecting an online order?", 
      answer: "Yes, in-store pickup is available at select locations. After placing your order, you’ll receive a confirmation email when it’s ready for pickup." 
    }
  ];

function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className=" mx-auto p-8 bg-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-500 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
            <button
              className="w-full text-left p-5 bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-200">{faq.question}</span>
              <span className="text-gray-600 text-xl">{activeIndex === index ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="p-5 bg-white text-gray-700"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQPage;
