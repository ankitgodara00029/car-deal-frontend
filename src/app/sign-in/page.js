"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CommonInput from "@/components/common/CommonInput";
import Cta from "@/components/common/Cta";

export default function CustomSignIn() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showCodeVerification, setShowCodeVerification] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isLoaded) return null;

  const handleOtpChange = (value, index) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Update the verification code string
    setVerificationCode(newOtp.join(""));

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn.create({
        identifier: email,
        password,
      });

      window.location.href = "/"; // redirect to home page after login with reload
    } catch (err) {
      setError(err.errors[0]?.message || "Login failed");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setResetMessage(
        "Password reset code sent! Check your email and enter the code below.",
      );
      setError("");
      setShowForgotPassword(false);
      setShowCodeVerification(true);
    } catch (err) {
      setError(err.errors[0]?.message || "Failed to send reset email");
    }
  };

  const handleCodeVerification = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: verificationCode,
        password: newPassword,
      });

      if (result.status === "complete") {
        window.location.href = "/";
      }
    } catch (err) {
      setError(
        err.errors[0]?.message || "Invalid code or failed to reset password",
      );
    }
  };

  return (
    <div className="flex items-center justify-center py-20 px-5">
      <form
        onSubmit={
          showCodeVerification
            ? handleCodeVerification
            : showForgotPassword
              ? handleForgotPassword
              : handleSubmit
        }
        className="w-full space-y-4 mx-auto border shadow bg-white max-w-[440px] px-5 py-6 rounded-xl"
      >
        <h2 className="text-2xl mb-4">
          {showCodeVerification
            ? "Reset Password"
            : showForgotPassword
              ? "Forgot Password"
              : "Sign In"}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {resetMessage && <p className="text-green-500 mb-3">{resetMessage}</p>}

        {/* Email field - shown in all states except code verification */}
        {!showCodeVerification && (
          <CommonInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        {/* Password field - only shown in normal sign in */}
        {!showForgotPassword && !showCodeVerification && (
          <CommonInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}

        {/* Code verification fields */}
        {showCodeVerification && (
          <>
            <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-700 mb-2">
                Enter the 6-digit code sent to: <strong>{email}</strong>
              </p>
            </div>

            <div className="flex gap-2 justify-center mb-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className="w-10 h-12 text-center border rounded text-lg font-semibold focus:border-blue-500 focus:outline-none"
                  required
                />
              ))}
            </div>

            <CommonInput
              type="password"
              placeholder="New Password (min 8 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <CommonInput
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}

        <Cta className="w-full mb-3">
          {showCodeVerification
            ? "Reset Password"
            : showForgotPassword
              ? "Send Reset Code"
              : "Sign In"}
        </Cta>

        {/* Navigation buttons */}
        {!showForgotPassword && !showCodeVerification ? (
          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(true);
                setError("");
                setResetMessage("");
              }}
              className="hover:text-[#ff5e00] text-[#1f2937] duration-300 text-sm block w-full"
            >
              Forgot your password?
            </button>
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/sign-up")}
                className="text-[#ff5e00] hover:text-[#1f2937] duration-300"
              >
                Sign up
              </button>
            </p>
          </div>
        ) : showForgotPassword ? (
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setError("");
                setResetMessage("");
              }}
              className="text-[#ff5e00] hover:text-[#1f2937] duration-300 text-sm"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={async () => {
                try {
                  await signIn.create({
                    strategy: "reset_password_email_code",
                    identifier: email,
                  });
                  setResetMessage("New code sent!");
                } catch (err) {
                  setError("Failed to resend code");
                }
              }}
              className="text-[#ff5e00] hover:text-[#1f2937] duration-300 text-sm block w-full"
            >
              Resend Code
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCodeVerification(false);
                setShowForgotPassword(false);
                setError("");
                setResetMessage("");
                setVerificationCode("");
                setOtp(["", "", "", "", "", ""]);
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="text-gray-500 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
