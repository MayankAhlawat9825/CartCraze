# 🛍️ Full-Stack E-Commerce Application

An **end-to-end e-commerce platform** built using **React.js (Frontend)** and **Express.js (Backend)**, integrated with **Razorpay Payment Gateway** for a seamless shopping experience.

---

## 🚀 Features  

### 🖥️ **Frontend (React + Redux Toolkit)**
✔️ Modern & Responsive UI (Tailwind CSS)  
✔️ Product Listing & Detailed View  
✔️ Add, Remove, and Update Cart Items  
✔️ Razorpay Secure Checkout Integration  
✔️ Real-time Price Calculation (Tax, Discounts, Shipping)  

### 🛠️ **Backend (Express.js + Node.js)**
✔️ REST API for Product & Category Data  
✔️ Razorpay Payment Processing  
✔️ Image Handling & Static File Serving  
✔️ Secure & Scalable Architecture  

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository  
```sh
git clone <repo-url>
cd CartCraze
```

### 2️⃣ Install Dependencies  

#### 📌 Backend  
```sh
cd Backend
npm install
```
#### 📌 Frontend  
```sh
cd ../Frontend
npm install
```

### 3️⃣ Setup Environment Variables  

Create a `.env` file inside `Backend/` with the following details:
```env
PORT=5000
RAZORPAY_KEY_ID=<your_razorpay_key>
RAZORPAY_KEY_SECRET=<your_razorpay_secret>
```

### 4️⃣ Start the Application  

#### 🚀 Start Backend Server  
```sh
cd Backend
npm run dev
```
#### 🚀 Start Frontend Development Server  
```sh
cd Frontend
npm run dev
```

---

## 💳 Razorpay Test Mode  

- **Test Card Number:** `4111 1111 1111 1111`  
- **Expiry Date:** Any future date  
- **CVV:** `123`  

👉 **Live payment requires actual Razorpay credentials!**  

---

## 🏗️ Tech Stack  

| Frontend  | Backend   | Payment Gateway |
|-----------|----------|----------------|
| React.js  | Express.js | Razorpay API   |
| Redux Toolkit | Node.js | Secure Payments |
| Tailwind CSS | REST API | Razorpay Test Mode |

---

## 🚀 Ready to Build & Deploy!  

Your **e-commerce application** is now set up! 🎉  
Feel free to contribute, customize, and make it even better!  

💡 **Happy Coding!** 💡

