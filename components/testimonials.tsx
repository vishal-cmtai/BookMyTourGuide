"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "The heritage tour with Rajesh was absolutely incredible! His knowledge of local history and culture made every monument come alive. Highly recommend!",
      tour: "Heritage Walking Tour",
      avatar: "/professional-woman-smiling-headshot.png",
    },
    {
      name: "Marco Rodriguez",
      location: "Barcelona, Spain",
      rating: 5,
      text: "Amazing cooking class experience! Priya taught us authentic recipes that we still make at home. The spice market visit was a bonus!",
      tour: "Traditional Cooking Class",
      avatar: "/professional-man-smiling-headshot.png",
    },
    {
      name: "Emma Thompson",
      location: "London, UK",
      rating: 5,
      text: "The eco tour exceeded all expectations. Our guide was passionate about conservation and showed us hidden natural gems. Unforgettable experience!",
      tour: "Eco Nature Tour",
      avatar: "/professional-woman-outdoor-enthusiast-headshot.jpg",
    },
    {
      name: "David Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "Professional service from start to finish. The booking was seamless, and our guide was punctual, knowledgeable, and friendly. Will book again!",
      tour: "City Photography Tour",
      avatar: "/professional-asian-man-photographer-headshot.jpg",
    },
    {
      name: "Lisa Anderson",
      location: "Sydney, Australia",
      rating: 5,
      text: "The spice market tour was a sensory adventure! Our guide helped us understand the cultural significance of each spice. Bought so many treasures!",
      tour: "Spice Market Experience",
      avatar: "/professional-woman-chef-headshot.png",
    },
    {
      name: "James Wilson",
      location: "Dublin, Ireland",
      rating: 5,
      text: "Outstanding adventure tour! Safety was the top priority, and our guide made sure everyone felt comfortable while pushing our limits. Thrilling!",
      tour: "Mountain Adventure Tour",
      avatar: "/professional-man-adventure-guide-headshot.jpg",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">What Our Travelers Say</h2>
          <p className="text-xl text-muted max-w-3xl mx-auto text-balance">
            Don't just take our word for it. Here's what thousands of satisfied travelers have to say about their
            WanderGuide experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-secondary" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted mb-6 text-balance leading-relaxed">"{testimonial.text}"</p>

                {/* Tour Type */}
                <div className="text-xs text-secondary font-medium mb-4 bg-secondary/10 px-2 py-1 rounded-full inline-block">
                  {testimonial.tour}
                </div>

                {/* User Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-muted">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted">Happy Travelers</div>
          </div>
          <div className="text-center animate-fade-in-up animate-delay-200">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted">Tours Available</div>
          </div>
          <div className="text-center animate-fade-in-up animate-delay-400">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-muted">Expert Guides</div>
          </div>
          <div className="text-center animate-fade-in-up animate-delay-600">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
