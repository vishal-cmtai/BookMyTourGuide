"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Award, Clock, DollarSign, CheckCircle, Upload } from "lucide-react"

export default function GuidesPage() {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    state: "",
    country: "",
    age: "",
    languages: [],
    experience: "",
    specializations: [],
    availability: [],
    hourlyRate: "",
    description: "",
  })

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: "Earn ₹500-2000/hour",
      description: "Set your own rates and earn competitive income",
    },
    {
      icon: <Clock className="w-8 h-8 text-secondary" />,
      title: "Flexible Schedule",
      description: "Work when you want, choose your tours",
    },
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: "Professional Growth",
      description: "Build your reputation and expand your network",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "Verified Platform",
      description: "Join our trusted community of certified guides",
    },
  ]

  const requirements = [
    "Valid government ID proof",
    "Minimum 2 years guiding experience",
    "Fluency in English + local language",
    "Knowledge of local history and culture",
    "Professional attitude and appearance",
    "Mobile phone with internet access",
  ]

  const languages = [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Gujarati",
    "Urdu",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Chinese",
    "Russian",
    "Arabic",
  ]

  const specializations = [
    "Heritage Tours",
    "Eco Tours",
    "Cooking Classes",
    "Spice Market Tours",
    "Adventure Tours",
    "Photography Tours",
    "Spiritual Tours",
    "Art & Craft Tours",
    "Food Tours",
    "Shopping Tours",
    "Architecture Tours",
    "Wildlife Tours",
  ]

  const states = [
    "Delhi",
    "Mumbai",
    "Rajasthan",
    "Kerala",
    "Goa",
    "Tamil Nadu",
    "Karnataka",
    "Himachal Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Gujarat",
    "Maharashtra",
    "Uttar Pradesh",
    "Madhya Pradesh",
    "Andhra Pradesh",
    "Telangana",
  ]

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, language],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        languages: prev.languages.filter((l) => l !== language),
      }))
    }
  }

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, specialization],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        specializations: prev.specializations.filter((s) => s !== specialization),
      }))
    }
  }

  return (
    <div className="min-h-screen bg-background">


      <main className="pt-20">
        {/* Hero Section */}
        <section className="heritage-gradient text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">Become a Certified Guide</h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animate-delay-200">
              Share your passion for India and earn while doing what you love
            </p>
            <Button
              size="lg"
              className="bg-white text-secondary hover:bg-gray-100 animate-fade-in-up animate-delay-400"
              onClick={() => document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Your Journey
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Join BookMyTourGuide?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex justify-center mb-4">{benefit.icon}</div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Guide Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Basic Requirements</h3>
                  <ul className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-6">Verification Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <span>Submit application with documents</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <span>Background verification & interview</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <span>Training & certification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <span>Start receiving bookings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section id="registration" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Guide Registration</h2>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Step {formStep} of 3:{" "}
                    {formStep === 1
                      ? "Personal Information"
                      : formStep === 2
                        ? "Professional Details"
                        : "Availability & Rates"}
                  </CardTitle>
                  <CardDescription>Fill in your details to join our network of certified guides</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formStep === 1 && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="mobile">Mobile Number *</Label>
                          <Input
                            id="mobile"
                            value={formData.mobile}
                            onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))}
                            placeholder="+91 9876543210"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="dob">Date of Birth *</Label>
                          <Input
                            id="dob"
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData((prev) => ({ ...prev, dob: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="age">Age *</Label>
                          <Input
                            id="age"
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country *</Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="india">India</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="state">State/City *</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your location" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase()}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {formStep === 2 && (
                    <>
                      <div>
                        <Label>Languages Known *</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                          {languages.map((language) => (
                            <div key={language} className="flex items-center space-x-2">
                              <Checkbox
                                id={language}
                                checked={formData.languages.includes(language)}
                                onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                              />
                              <Label htmlFor={language} className="text-sm">
                                {language}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="experience">Years of Experience *</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2-5">2-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Tour Specializations *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                          {specializations.map((specialization) => (
                            <div key={specialization} className="flex items-center space-x-2">
                              <Checkbox
                                id={specialization}
                                checked={formData.specializations.includes(specialization)}
                                onCheckedChange={(checked) =>
                                  handleSpecializationChange(specialization, checked as boolean)
                                }
                              />
                              <Label htmlFor={specialization} className="text-sm">
                                {specialization}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">About Yourself *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Tell us about your guiding experience, knowledge, and what makes you special..."
                          rows={4}
                        />
                      </div>
                    </>
                  )}

                  {formStep === 3 && (
                    <>
                      <div>
                        <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          value={formData.hourlyRate}
                          onChange={(e) => setFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                          placeholder="500"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Recommended: ₹500-2000 per hour based on experience
                        </p>
                      </div>

                      <div>
                        <Label>Document Upload *</Label>
                        <div className="space-y-3 mt-2">
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Upload Government ID (Aadhar/Passport/Driving License)
                            </p>
                            <Button variant="outline" className="mt-2 bg-transparent">
                              Choose File
                            </Button>
                          </div>
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Upload Professional Photo</p>
                            <Button variant="outline" className="mt-2 bg-transparent">
                              Choose File
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Next Steps:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• We'll verify your documents within 2-3 business days</li>
                          <li>• You'll receive a call for a brief interview</li>
                          <li>• Once approved, you can start receiving bookings</li>
                          <li>• We'll provide training materials and support</li>
                        </ul>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between pt-6">
                    {formStep > 1 && (
                      <Button variant="outline" onClick={() => setFormStep(formStep - 1)}>
                        Previous
                      </Button>
                    )}
                    {formStep < 3 ? (
                      <Button
                        className="ml-auto bg-primary hover:bg-primary/90"
                        onClick={() => setFormStep(formStep + 1)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button className="ml-auto bg-secondary hover:bg-secondary/90">Submit Application</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
