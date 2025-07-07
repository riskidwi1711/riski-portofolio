import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ScrollReveal';

const blogPosts = [
  {
    title: 'Mastering React Hooks for State Management',
    date: 'July 1, 2024',
    excerpt: 'Dive deep into the world of React Hooks and discover how they revolutionize state management in functional components. Learn best practices and common pitfalls.',
    imageUrl: '/placeholder.svg',
    link: '#',
  },
  {
    title: 'Building Scalable APIs with Node.js and Express',
    date: 'June 15, 2024',
    excerpt: 'A comprehensive guide to designing and implementing robust, scalable RESTful APIs using Node.js, Express, and best architectural patterns.',
    imageUrl: '/placeholder.svg',
    link: '#',
  },
  {
    title: 'Demystifying Database Optimization for Performance',
    date: 'May 28, 2024',
    excerpt: "Understand the core concepts of database optimization, from indexing strategies to query tuning, to significantly boost your application's performance.",
    imageUrl: '/placeholder.svg',
    link: '#',
  },
  {
    title: 'The Future of Web Development: WebAssembly and Beyond',
    date: 'April 10, 2024',
    excerpt: 'Explore the exciting advancements in web technologies, including WebAssembly, serverless functions, and progressive web apps, shaping the future of the web.',
    imageUrl: '/placeholder.svg',
    link: '#',
  },
];

const Blog = () => (
  <div className="relative overflow-hidden py-24 sm:py-32">
    <div className="container relative z-10">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            My{' '}
            <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Insights, tutorials, and thoughts on software development and technology.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <ScrollReveal key={post.title} delay={index * 0.1}>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <div className="aspect-video rounded-md overflow-hidden mb-4">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-white">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-300 text-sm mb-4 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-orange-400" /> {post.date}
                </p>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <Button variant="link" className="p-0 text-orange-400 hover:text-orange-300">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;