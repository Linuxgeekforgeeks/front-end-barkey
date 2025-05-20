"use client"
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    id: 'faq1',
    question: 'What are your opening hours?',
    answer: 'We are open daily from 7:00 AM to 8:00 PM. Our fresh bread and pastries are usually ready by 7:30 AM.',
  },
  {
    id: 'faq2',
    question: 'Do you offer delivery services?',
    answer: 'Yes, we deliver across Zanzibar. Orders placed before 11 AM can be delivered the same day. There is a small delivery fee based on your location.',
  },
  {
    id: 'faq3',
    question: 'Can I place a custom order for a special occasion?',
    answer: 'Absolutely! We love creating custom cakes and pastries for special occasions. Please place your order at least 48 hours in advance for custom items.',
  },
  {
    id: 'faq4',
    question: 'Do you cater for events?',
    answer: 'Yes, we offer catering services for events of all sizes. Contact us for a personalized quote based on your event needs.',
  },
  {
    id: 'faq5',
    question: 'Do you offer gluten-free or vegan options?',
    answer: 'We do offer a selection of gluten-free and vegan products. These items are prepared in a facility that also processes wheat and dairy, so there may be traces of these allergens.',
  },
  {
    id: 'faq6',
    question: 'How can I pay for my order?',
    answer: 'We accept cash, credit cards, mobile money transfers, and online payments through our website.',
  },
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Frequently Asked Questions</h2>
          <p style={styles.subtitle}>
            Got questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
          </p>
        </div>
        
        <div style={styles.accordionContainer}>
          {faqs.map((faq) => (
            <div key={faq.id} style={styles.accordionItem}>
              <button
                style={styles.accordionTrigger}
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={activeId === faq.id}
              >
                <span>{faq.question}</span>
                {activeId === faq.id ? (
                  <Minus size={24} style={styles.icon} />
                ) : (
                  <Plus size={24} style={styles.icon} />
                )}
              </button>
              <div
                style={{
                  ...styles.accordionContent,
                  maxHeight: activeId === faq.id ? '200px' : '0',
                  opacity: activeId === faq.id ? 1 : 0,
                  visibility: activeId === faq.id ? 'visible' : 'hidden',
                }}
              >
                <p style={styles.accordionText}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '4rem 0',
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#6b7280',
    maxWidth: '32rem',
    margin: '0 auto',
  },
  accordionContainer: {
    maxWidth: '48rem',
    margin: '0 auto',
  },
  accordionItem: {
    borderBottom: '1px solid #e5e7eb',
  },
  accordionTrigger: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '1rem 0',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'left',
    cursor: 'pointer',
  },
  icon: {
    transition: 'transform 0.3s ease',
  },
  accordionContent: {
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  accordionText: {
    padding: '1rem 0',
    color: '#4b5563',
  },
};

export default FAQ;