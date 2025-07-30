import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaCreditCard, FaShieldAlt, FaTruck } from 'react-icons/fa';
import Image from 'next/image';
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-neutral to-neutral-focus text-neutral-content relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <div className="bg-primary/10 border-b border-neutral-content/10">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Stay Updated</h3>
              <p className="text-neutral-content/80 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new products, exclusive offers, and special deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-neutral-content/10 border-neutral-content/20 text-neutral-content placeholder:text-neutral-content/60 flex-1"
                />
                <button className="btn btn-primary hover:btn-primary-focus transition-all duration-300 shadow-lg">
                  <FaEnvelope className="mr-2" />
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Image src={logo} height={40} width={40} alt="Flowmazon logo" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Flowmazon
                </span>
              </div>
              <p className="text-neutral-content/80 leading-relaxed">
                Your trusted e-commerce destination for premium products. We're committed to providing exceptional quality, 
                competitive prices, and outstanding customer service.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FaPhone className="text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaEnvelope className="text-primary" />
                  <span>support@flowmazon.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>123 Commerce Street, City, State 12345</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-3">
                <h4 className="font-semibold">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: FaFacebook, color: 'hover:text-blue-400' },
                    { icon: FaTwitter, color: 'hover:text-sky-400' },
                    { icon: FaInstagram, color: 'hover:text-pink-400' },
                    { icon: FaLinkedin, color: 'hover:text-blue-600' },
                    { icon: FaYoutube, color: 'hover:text-red-500' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`w-10 h-10 bg-neutral-content/10 hover:bg-neutral-content/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="footer-title text-lg font-bold text-primary">Services</h3>
              <div className="space-y-2">
                {['Branding', 'Design', 'Marketing', 'Advertisement', 'Consulting', 'Support'].map((service) => (
                  <a key={service} className="link-hover link block transition-colors duration-200 hover:text-primary">
                    {service}
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="footer-title text-lg font-bold text-secondary">Company</h3>
              <div className="space-y-2">
                {['About Us', 'Contact', 'Careers', 'Press Kit', 'Blog', 'Partners'].map((item) => (
                  <a key={item} className="link-hover link block transition-colors duration-200 hover:text-secondary">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal & Help */}
            <div className="space-y-4">
              <h3 className="footer-title text-lg font-bold text-accent">Legal & Help</h3>
              <div className="space-y-2">
                {['Terms of Use', 'Privacy Policy', 'Cookie Policy', 'Shipping Info', 'Returns', 'FAQ'].map((item) => (
                  <a key={item} className="link-hover link block transition-colors duration-200 hover:text-accent">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="border-t border-neutral-content/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-content/70">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-success" />
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTruck className="text-info" />
                <span>Free Shipping Over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCreditCard className="text-warning" />
                <span>Multiple Payment Options</span>
              </div>
              <div className="flex items-center gap-2">
                <FaHeart className="text-error" />
                <span>Customer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-content/10 bg-neutral-focus/30">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-neutral-content/70">
                © 2025 Flowmazon. All rights reserved. Made with{' '}
                <FaHeart className="inline text-error mx-1" />
                for our customers.
              </div>
              
              {/* Payment Methods */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-content/70 mr-2">We Accept:</span>
                <div className="flex gap-1">
                  {['VISA', 'MC', 'AMEX', 'DISC'].map((card) => (
                    <div
                      key={card}
                      className="bg-neutral-content/10 px-2 py-1 rounded text-xs font-semibold"
                    >
                      {card}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
