import React from 'react';
import ParallaxImage from './parallax-image';

const ParallaxImageDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Parallax Image Component Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Scroll down to see the smooth parallax scaling effect in action.
          </p>
        </div>
      </section>

      {/* Content before parallax */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Before Parallax</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            This is some content before the parallax image. As you scroll down, 
            you'll notice the image below will start to scale up smoothly, creating 
            an engaging visual effect that responds to your scroll position.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            The parallax effect is optimized for performance using requestAnimationFrame 
            and GPU acceleration, ensuring smooth animations across all devices.
          </p>
        </div>
      </section>

      {/* Enhanced Parallax Effects Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Enhanced Parallax Effects</h2>

          {/* Scale Effect */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Scale Effect</h3>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
              alt="Modern office building with scale effect"
              effect="scale"
              containerClassName="h-96 rounded-xl"
              minScale={1}
              maxScale={1.15}
              scrollSensitivity={0.6}
              transitionDuration={0.3}
            />
          </div>

          {/* Rotation Effect */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rotation Effect</h3>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Team collaboration with rotation effect"
              effect="rotate"
              containerClassName="h-96 rounded-xl"
              minRotation={-3}
              maxRotation={3}
              scrollSensitivity={0.4}
              transitionDuration={0.4}
            />
          </div>

          {/* Opacity Effect */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Opacity Effect</h3>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
              alt="Coding workspace with opacity effect"
              effect="opacity"
              containerClassName="h-96 rounded-xl"
              minOpacity={0.6}
              maxOpacity={1}
              scrollSensitivity={0.5}
              transitionDuration={0.3}
            />
          </div>

          {/* Translate Y Effect */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Vertical Movement Effect</h3>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
              alt="Business analytics with vertical movement"
              effect="translateY"
              containerClassName="h-96 rounded-xl"
              minTranslateY={30}
              maxTranslateY={-30}
              scrollSensitivity={0.7}
              transitionDuration={0.2}
            />
          </div>

          {/* Combined Effect */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Combined Effects</h3>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Technology infrastructure with combined effects"
              effect="combined"
              containerClassName="h-96 rounded-xl"
              minScale={0.95}
              maxScale={1.1}
              minRotation={-2}
              maxRotation={2}
              minOpacity={0.8}
              maxOpacity={1}
              minTranslateY={20}
              maxTranslateY={-20}
              scrollSensitivity={0.5}
              transitionDuration={0.4}
            />
          </div>
        </div>
      </section>

      {/* Content after parallax */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">After Parallax</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Did you notice how the image scaled up as you scrolled? The effect is 
            subtle but creates a sense of depth and engagement. The component is 
            fully responsive and works great on both mobile and desktop devices.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Smooth parallax scaling effect</li>
                <li>• Responsive design</li>
                <li>• Performance optimized</li>
                <li>• Customizable parameters</li>
                <li>• Accessibility friendly</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customizable Props</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• minScale & maxScale</li>
                <li>• scrollSensitivity</li>
                <li>• transitionDuration</li>
                <li>• Custom CSS classes</li>
                <li>• Container styling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reverse Effect Example */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Reverse Effect</h2>
          <ParallaxImage
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
            alt="Person working on laptop with reverse effect"
            effect="scale"
            containerClassName="h-80 md:h-96 rounded-xl"
            minScale={1.1}
            maxScale={0.95}
            reverse={true}
            scrollSensitivity={0.4}
            transitionDuration={0.4}
          />
        </div>
      </section>

      {/* Final content */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Use</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The ParallaxImage component is ready to be integrated into your project. 
            Simply import it and provide the required props to create engaging 
            visual experiences for your users.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ParallaxImageDemo;
