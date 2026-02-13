"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomSignUp() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const [step, setStep] = useState("form");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoaded) return null;

  // ---------------- SIGN UP ----------------
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signUp.create({
        firstName: form.firstName,
        lastName: form.lastName,
        emailAddress: form.email,
        password: form.password,
      });

      // Send OTP
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setStep("otp");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async () => {
    try {
      const code = otp.join("");

      await signUp.attemptEmailAddressVerification({
        code,
      });

      await signUp.setActive();
      window.location.href = "/"; // redirect to home page after successful signup with reload
    } catch (err) {
      setError("Invalid OTP");
    }
  };

  // ---------------- GOOGLE LOGIN ----------------
  const signUpWithGoogle = async () => {
    await signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sign-up",
      redirectUrlComplete: "/", // redirect to home page after Google signup with reload
    });
  };

  // ---------------- OTP INPUT HANDLER ----------------
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[380px] bg-white p-6 rounded shadow">
        {step === "form" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <form onSubmit={handleSignUp}>
              <input
                placeholder="First Name"
                className="input"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />

              <input
                placeholder="Last Name"
                className="input"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email"
                className="input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                type="password"
                placeholder="Password"
                className="input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <div id="clerk-captcha" />

              <button
                type="submit"
                disabled={isLoading}
                className={`btn-primary mt-2 flex items-center justify-center gap-2
    ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="my-4 text-center text-gray-400">OR</div>

            <button onClick={signUpWithGoogle} className="btn-google">
              Continue with Google
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/sign-in")}
                className="text-blue-500 hover:underline"
              >
                Sign in
              </button>
            </p>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-xl font-semibold mb-3">Verify Email</h2>

            <p className="text-sm text-gray-500 mb-4">
              Enter 6-digit code sent to your email
            </p>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <div className="flex gap-2 justify-center">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  maxLength={1}
                  value={digit}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-10 h-12 text-center border rounded text-lg"
                  required
                />
              ))}
            </div>

            <button onClick={verifyOtp} className="btn-primary mt-4">
              Verify & Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
