/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FiMail, FiCheck } from "react-icons/fi";

import toast from "react-hot-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with your actual API endpoint when ready
      setTimeout(() => {
        setIsSubscribed(true);
        toast.success("Thank you for subscribing!");
        setEmail("");
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 my-8 bg-base-100 mx-4 px-4 rounded-lg">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
          <FiMail className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Stay Updated</h2>
        <p className="text-base-content/70 mb-8">
          Subscribe to our newsletter for curated content, exclusive articles,
          and latest updates.
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-center p-4 bg-success/20 text-success rounded-lg">
            <FiCheck className="mr-2" />
            <span>You've successfully subscribed to our newsletter!</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered flex-1 p-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        <p className="text-xs text-base-content/50 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;
