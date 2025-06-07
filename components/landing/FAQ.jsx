"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "./FAQ.css";

const faqs = [
  {
    id: "faq1",
    question: "What are your opening hours?",
    answer:
      "We are open daily from 7:00 AM to 8:00 PM. Our fresh bread and pastries are usually ready by 7:30 AM.",
  },
  {
    id: "faq2",
    question: "Do you offer delivery services?",
    answer:
      "Yes, we deliver across Zanzibar. Orders placed before 11 AM can be delivered the same day. There is a small delivery fee based on your location.",
  },
  {
    id: "faq3",
    question: "Can I place a custom order for a special occasion?",
    answer:
      "Absolutely! We love creating custom cakes and pastries for special occasions. Please place your order at least 48 hours in advance for custom items.",
  },
  {
    id: "faq4",
    question: "Do you cater for events?",
    answer:
      "Yes, we offer catering services for events of all sizes. Contact us for a personalized quote based on your event needs.",
  },
  {
    id: "faq5",
    question: "Do you offer gluten-free or vegan options?",
    answer:
      "We do offer a selection of gluten-free and vegan products. These items are prepared in a facility that also processes wheat and dairy, so there may be traces of these allergens.",
  },
  {
    id: "faq6",
    question: "How can I pay for my order?",
    answer:
      "We accept cash, credit cards, mobile money transfers, and online payments through our website.",
  },
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faqs" className="faq-section">
      <h2>❓ Frequently Asked Questions</h2>
      {faqs.map((faq) => (
        <div key={faq.id} className="faq-item">
          <div
            className="faq-question"
            onClick={() => toggleAccordion(faq.id)}
            role="button"
            aria-expanded={activeId === faq.id}
            aria-controls={faq.id}
          >
            <span>{faq.question}</span>
            <span className="faq-toggle">
              {activeId === faq.id ? <Minus size={24} /> : <Plus size={24} />}
            </span>
          </div>
          <div
            className={`faq-answer ${activeId === faq.id ? "active" : ""}`}
            id={faq.id}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FAQ;