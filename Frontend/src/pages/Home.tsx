import { Mail, Phone, User, ShoppingCart } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <div className="bg-[#7E33E0] text-[#F1F1F1]">
      <div className="container">
        <Mail />
        <span>Shrestha.sumit1371@gmail.com</span>
        <Phone />
        <span>{122345}67890</span>
        <span>Login</span>
        <User />
        <ShoppingCart />
      </div>
    </div>
  );
}
