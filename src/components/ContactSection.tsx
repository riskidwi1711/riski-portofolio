import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, Linkedin, Twitter, Download, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { postContactForm } from '@/lib/api';

interface ContactSectionProps {
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    portofolio: string;
  };
  name: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact, name }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Validation Error", 
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await postContactForm(formData);
      
      toast({
        title: "Message Sent Successfully! ✅",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDownloadResume = () => {
    // Implement resume download logic here
  };

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Need a fast and scalable app? Let's build it together.
          </p>
        </div>
        
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="rounded-3xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 p-8 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <a 
                  href={`mailto:${contact?.email}`}
                  className="flex items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="rounded-full bg-orange-500/20 p-3 mr-4">
                    <Mail className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-300">{contact?.email}</div>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <a 
                  href={`tel:${contact?.phone}`}
                  className="flex items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="rounded-full bg-purple-500/20 p-3 mr-4">
                    <Phone className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <div className="text-gray-300">{contact?.phone}</div>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
              
              {/* Social Links & Resume Download */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-white font-medium mb-4">Connect with me</h4>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={contact?.linkedin} 
                    className="p-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors group"
                  >
                    <Linkedin className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="p-3 rounded-full bg-sky-500/20 hover:bg-sky-500/30 transition-colors group"
                  >
                    <Twitter className="h-5 w-5 text-sky-400 group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href={contact?.portofolio}
                    className="flex items-center gap-2 px-4 py-3 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-colors group text-green-400 hover:text-green-300"
                  >
                    <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Download Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="rounded-3xl bg-gray-900/50 p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Project/Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 font-medium text-white backdrop-blur-3xl">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;