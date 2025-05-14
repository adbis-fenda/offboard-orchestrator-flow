
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!email || !password) {
      setLoginError("Please enter both email and password");
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/");
    } else {
      setLoginError("Invalid email or password");
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-brand-purple">
            <span className="text-brand-light-purple">Fender</span>.io
          </CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com or user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="admin123 or user123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-500">{loginError}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Use demo accounts:<br />
          Admin: admin@example.com / admin123<br />
          User: user@example.com / user123
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
