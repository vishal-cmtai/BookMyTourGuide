"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Clock, Users, Star, Search } from "lucide-react";
import Image from "next/image";

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const tours = [
    {
      id: 1,
      title: "Golden Triangle Heritage Tour",
      description: "Explore Delhi, Agra, and Jaipur with expert local guides",
      image: "/taj-mahal-agra-heritage-tour.jpg",
      price: "₹8,999",
      duration: "3 Days",
      location: "Delhi, Agra, Jaipur",
      rating: 4.8,
      reviews: 245,
      category: "heritage",
      maxGuests: 15,
      highlights: ["Taj Mahal", "Red Fort", "Hawa Mahal", "Local Cuisine"],
    },
    {
      id: 2,
      title: "Kerala Backwaters Eco Tour",
      description: "Sustainable tourism through Kerala's pristine backwaters",
      image: "/kerala-backwaters-houseboat-eco-tour.jpg",
      price: "₹6,499",
      duration: "2 Days",
      location: "Alleppey, Kerala",
      rating: 4.9,
      reviews: 189,
      category: "eco",
      maxGuests: 8,
      highlights: [
        "Houseboat Stay",
        "Bird Watching",
        "Local Fishing",
        "Organic Meals",
      ],
    },
    {
      id: 3,
      title: "Rajasthani Cooking Masterclass",
      description: "Learn authentic Rajasthani cuisine from local families",
      image: "/rajasthani-cooking-class-spices-traditional.jpg",
      price: "₹2,999",
      duration: "1 Day",
      location: "Jaipur, Rajasthan",
      rating: 4.7,
      reviews: 156,
      category: "cooking",
      maxGuests: 12,
      highlights: [
        "Dal Baati Churma",
        "Gatte ki Sabzi",
        "Market Visit",
        "Recipe Book",
      ],
    },
    {
      id: 4,
      title: "Old Delhi Spice Market Walk",
      description:
        "Discover the aromatic world of Indian spices and street food",
      image: "/old-delhi-spice-market-chandni-chowk.jpg",
      price: "₹1,499",
      duration: "4 Hours",
      location: "Old Delhi",
      rating: 4.6,
      reviews: 298,
      category: "spice-market",
      maxGuests: 20,
      highlights: [
        "Chandni Chowk",
        "Spice Tasting",
        "Street Food",
        "Historical Stories",
      ],
    },
    {
      id: 5,
      title: "Himalayan Trekking Adventure",
      description: "Experience the majestic Himalayas with certified guides",
      image: "/himalayan-trekking-mountains-adventure.jpg",
      price: "₹12,999",
      duration: "5 Days",
      location: "Himachal Pradesh",
      rating: 4.9,
      reviews: 87,
      category: "adventure",
      maxGuests: 10,
      highlights: [
        "Mountain Views",
        "Camping",
        "Local Villages",
        "Photography",
      ],
    },
    {
      id: 6,
      title: "Mumbai Heritage Walking Tour",
      description: "Explore Mumbai's colonial architecture and local culture",
      image: "/mumbai-heritage-architecture-gateway-of-india.jpg",
      price: "₹1,999",
      duration: "6 Hours",
      location: "Mumbai, Maharashtra",
      rating: 4.5,
      reviews: 203,
      category: "heritage",
      maxGuests: 25,
      highlights: [
        "Gateway of India",
        "CST Station",
        "Crawford Market",
        "Local Transport",
      ],
    },
  ];

  const categories = [
    { value: "all", label: "All Tours" },
    { value: "heritage", label: "Heritage Tours" },
    { value: "eco", label: "Eco Tours" },
    { value: "cooking", label: "Cooking Classes" },
    { value: "spice-market", label: "Spice Market Tours" },
    { value: "adventure", label: "Adventure Tours" },
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "jaipur", label: "Jaipur" },
    { value: "kerala", label: "Kerala" },
    { value: "himachal", label: "Himachal Pradesh" },
  ];

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || tour.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "all" ||
      tour.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="tourism-gradient text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Discover India's Wonders
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animate-delay-200">
              Authentic experiences with certified local guides
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour, index) => (
                <Card
                  key={tour.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-secondary">
                      {tour.category.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{tour.title}</CardTitle>
                    <CardDescription>{tour.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {tour.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        Max {tour.maxGuests} guests
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{tour.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({tour.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {tour.highlights.map((highlight, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      {tour.price}
                    </div>
                    <Button className="bg-secondary hover:bg-secondary/90">
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
