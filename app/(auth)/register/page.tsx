// app/(auth)/register/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/useAuth";
import { RegisterRequest } from "@/types/auth";

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<"user" | "guide" | "">("");
  const [formData, setFormData] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    state: "",
    country: "",
    age: 0,
    languages: [],
    experience: "",
    specializations: [],
    availability: [],
    hourlyRate: 0,
    description: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [files, setFiles] = useState<{ photo?: File; license?: File }>({});
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  // Create refs for OTP inputs
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { sendOtp, verifyAndRegister, loading, error, clearAuthError } =
    useAuth();
  const router = useRouter();

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearAuthError();
    };
  }, [clearAuthError]);

  // Focus first OTP input when step changes to 2
  useEffect(() => {
    if (step === 2 && otpRefs.current[0]) {
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (error) {
      clearAuthError();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleArrayInput = (name: keyof RegisterRequest, value: string) => {
    const array = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, [name]: array }));
  };

  // Improved OTP handling
  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if value entered
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        // Clear current field
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpRefs.current[index - 1]?.focus();
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    // Only allow numbers and limit to 6 digits
    if (!/^\d{1,6}$/.test(pasteData)) {
      toast.error("Please paste only numbers");
      return;
    }

    const digits = pasteData.split("").slice(0, 6);
    const newOtp = new Array(6).fill("");

    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Focus the next empty field or last field
    const nextIndex = Math.min(digits.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const validateStep1 = (): boolean => {
    if (!userType) {
      toast.error("Please select your account type", {
        ariaLabel: "User type validation error",
      });
      return false;
    }

    if (!formData.name.trim()) {
      toast.error("Full name is required", {
        ariaLabel: "Name validation error",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required", { ariaLabel: "Email validation error" });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address", {
        ariaLabel: "Email format error",
      });
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required", {
        ariaLabel: "Password validation error",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        ariaLabel: "Password length error",
      });
      return false;
    }

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match", {
        ariaLabel: "Password mismatch error",
      });
      return false;
    }

    // Guide-specific validation
    if (userType === "guide") {
      if (!formData.mobile.trim()) {
        toast.error("Mobile number is required for guides", {
          ariaLabel: "Mobile validation error",
        });
        return false;
      }

      if (!formData.experience.trim()) {
        toast.error("Experience is required for guides", {
          ariaLabel: "Experience validation error",
        });
        return false;
      }
    }

    return true;
  };

  const handleSendOTP = async () => {
    if (!validateStep1()) return;
    clearAuthError();

    try {
      const result = await sendOtp({ email: formData.email });
      if (result.type === "auth/sendOTP/fulfilled") {
        setStep(2);
        setOtp(new Array(6).fill(""));
      }
    } catch (error) {
      console.error("OTP send error:", error);
    }
  };

  const handleVerifyAndRegister = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP", {
        ariaLabel: "OTP validation error",
      });
      return;
    }

    if (!/^\d{6}$/.test(otpValue)) {
      toast.error("OTP must contain only numbers", {
        ariaLabel: "OTP format error",
      });
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null && value !== "") {
          formDataToSend.append(key, value.toString());
        }
      });

      formDataToSend.append("otp", otpValue);
      formDataToSend.append("role", userType);

      // Add files for guides
      if (userType === "guide") {
        if (files.photo) formDataToSend.append("photo", files.photo);
        if (files.license) formDataToSend.append("license", files.license);
      }

      const result = await verifyAndRegister(formDataToSend);

      if (result.type === "auth/verifyOtpAndRegister/fulfilled") {
        setTimeout(() => {
          router.push("/login?message=Registration successful! Please login.");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleBackToForm = () => {
    setStep(1);
    setOtp(new Array(6).fill(""));
    clearAuthError();
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-8 border border-border animate-scale-in max-h-[90vh] overflow-y-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Create Account
        </h1>
        <p className="text-muted-foreground">Join our platform today</p>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                <input
                  type="radio"
                  value="user"
                  checked={userType === "user"}
                  onChange={(e) => setUserType(e.target.value as "user")}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    userType === "user"
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {userType === "user" && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="text-sm font-medium">Tourist/Traveler</span>
              </label>
              <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                <input
                  type="radio"
                  value="guide"
                  checked={userType === "guide"}
                  onChange={(e) => setUserType(e.target.value as "guide")}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    userType === "guide"
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {userType === "guide" && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="text-sm font-medium">Tour Guide</span>
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Full Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email *
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Password *
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create password (min 6 chars)"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Confirm Password *
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Guide-specific fields */}
          {userType === "guide" && (
            <div className="space-y-4 p-4 bg-muted/20 rounded-lg border border-border">
              <h3 className="text-lg font-medium text-foreground">
                Guide Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Mobile Number *
                  </label>
                  <Input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Your mobile number"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Experience *
                  </label>
                  <Input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 years"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Languages (comma-separated)
                </label>
                <Input
                  type="text"
                  placeholder="e.g., English, Spanish, French"
                  onChange={(e) =>
                    handleArrayInput("languages", e.target.value)
                  }
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Specializations (comma-separated)
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Historical sites, Adventure tours"
                  onChange={(e) =>
                    handleArrayInput("specializations", e.target.value)
                  }
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Photo
                  </label>
                  <Input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    License/Certificate
                  </label>
                  <Input
                    type="file"
                    name="license"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleSendOTP}
            disabled={loading || !userType}
            className="w-full red-gradient"
            size="lg"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-foreground">Enter OTP</h3>
            <p className="text-sm text-muted-foreground mt-2">
              We've sent a 6-digit code to {formData.email}
            </p>
          </div>

          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={handleOtpPaste}
                onFocus={(e) => e.target.select()}
                className="w-14 h-14 text-center border-2 border-border rounded-lg text-lg font-semibold focus:border-primary focus:outline-none transition-colors bg-background"
                disabled={loading}
                autoComplete="off"
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Entered OTP:{" "}
              <span className="font-mono font-bold">{otp.join("")}</span>
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleVerifyAndRegister}
              disabled={loading || otp.join("").length !== 6}
              className="w-full red-gradient"
              size="lg"
            >
              {loading ? "Verifying..." : "Verify & Register"}
            </Button>

            <Button
              onClick={handleBackToForm}
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              Back to form
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
