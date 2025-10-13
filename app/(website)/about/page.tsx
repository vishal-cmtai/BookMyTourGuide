"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Globe,
  Award,
  Heart,
  Target,
  MapPin,
  Clock,
} from "lucide-react";
import Image from "next/image";
import HeroSection from "@/components/all/CommonHeroSection";

export default function AboutPage() {
  const stats = [
    {
      number: "10,000+",
      label: "Happy Travelers",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "500+",
      label: "Certified Guides",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Cities Covered",
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      number: "5 Years",
      label: "Experience",
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Trust & Safety",
      description:
        "All our guides are verified, background-checked, and certified for your safety and peace of mind.",
    },
    {
      icon: <Heart className="w-8 h-8 text-secondary" />,
      title: "Authentic Experiences",
      description:
        "We connect you with local experts who share genuine stories and hidden gems of their homeland.",
    },
    {
      icon: <Globe className="w-8 h-8 text-accent" />,
      title: "Cultural Bridge",
      description:
        "Breaking language barriers and cultural gaps to create meaningful connections between travelers and locals.",
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Personalized Tours",
      description:
        "Every tour is tailored to your interests, pace, and preferences for a unique travel experience.",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "/indian-businessman-founder-ceo.jpg",
      description:
        "Former travel industry executive with 15+ years experience in tourism and hospitality.",
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "/indian-businesswoman-operations-manager.jpg",
      description:
        "Expert in guide training and quality assurance with background in hospitality management.",
    },
    {
      name: "Amit Patel",
      role: "Technology Director",
      image: "/indian-tech-director-software-engineer.jpg",
      description:
        "Tech entrepreneur focused on creating seamless booking experiences and platform innovation.",
    },
  ];

  const milestones = [
    { year: "2019", event: "BookMyTourGuide founded in Delhi" },
    { year: "2020", event: "Launched in 10 major Indian cities" },
    { year: "2021", event: "Reached 1000+ certified guides" },
    { year: "2022", event: "Expanded to international travelers" },
    { year: "2023", event: "Introduced specialized tour categories" },
    { year: "2024", event: "10,000+ successful tours completed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20">
        {/* Hero Section */}
        <HeroSection
          backgroundImage="/2.jpg"
          badgeText="About BookMyTourGuide"
          title={
            <>
              Discover Authentic <br /> Local Experiences
            </>
          }
          description="Connecting travelers with authentic local experiences through certified guides across India."
        />

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                To make authentic Indian experiences accessible to every
                traveler while empowering local guides to share their knowledge
                and culture. We believe that the best way to explore a
                destination is through the eyes of someone who calls it home.
              </p>
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src="/2.jpg"
                  alt="Our mission in action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-card">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {member.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Journey
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-6 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <p className="text-lg">{milestone.event}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 heritage-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore India?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the real India
              through our certified local guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-secondary hover:bg-gray-100"
              >
                Book a Tour
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-secondary bg-transparent"
              >
                Become a Guide
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
