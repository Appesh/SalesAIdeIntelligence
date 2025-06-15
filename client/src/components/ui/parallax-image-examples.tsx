import React from 'react';
import ParallaxImage from './parallax-image';

// Example 1: Hero Section with Parallax Background
export const ParallaxHeroSection: React.FC = () => {
  return (
    <section className="relative">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
        alt="Modern business environment"
        containerClassName="h-screen"
        minScale={1}
        maxScale={1.1}
        scrollSensitivity={0.3}
        transitionDuration={0.4}
      />
      
      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your Business
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Experience the power of AI-driven solutions with stunning visual effects
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

// Example 2: Product Showcase with Subtle Parallax
export const ParallaxProductShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Innovative Solutions
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our cutting-edge technology delivers results that exceed expectations. 
              Experience the difference with our AI-powered platform that adapts 
              to your business needs.
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Advanced AI algorithms
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Real-time analytics
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Seamless integration
              </li>
            </ul>
          </div>
          
          <div>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Team collaboration and innovation"
              containerClassName="h-96 rounded-2xl shadow-xl"
              minScale={1}
              maxScale={1.08}
              scrollSensitivity={0.4}
              transitionDuration={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Example 3: Feature Section with Multiple Parallax Images
export const ParallaxFeatureSection: React.FC = () => {
  const features = [
    {
      title: "Smart Analytics",
      description: "Get insights that matter with our intelligent analytics platform.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Analytics dashboard"
    },
    {
      title: "Automated Workflows",
      description: "Streamline your processes with powerful automation tools.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
      alt: "Workflow automation"
    },
    {
      title: "Secure Infrastructure",
      description: "Enterprise-grade security that you can trust and rely on.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Secure technology infrastructure"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the capabilities that make our platform the choice of industry leaders
          </p>
        </div>
        
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <ParallaxImage
                  src={feature.image}
                  alt={feature.alt}
                  containerClassName="h-80 rounded-xl shadow-lg"
                  minScale={0.98}
                  maxScale={1.05}
                  scrollSensitivity={0.5}
                  transitionDuration={0.4}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Example 4: Simple Card with Parallax Image
export const ParallaxCard: React.FC<{
  src: string;
  alt: string;
  title: string;
  description: string;
}> = ({ src, alt, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <ParallaxImage
        src={src}
        alt={alt}
        containerClassName="h-48"
        minScale={1}
        maxScale={1.1}
        scrollSensitivity={0.6}
        transitionDuration={0.2}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};
