# Nextjs Tailwind Ecommerce Website like Amazon

1.
2. Install Tools
3. Create Next App
4. Publish to Github
5. Create Website Layout

   1. Create Layout Component
   2. Add Header
   3. Add Main Section
   4. Add Footer
   5. Add Tailwind Classes

6. List Products

   1. Add data.js
   2. Add images
   3. Render Products

7. Create Product Details

   1. create product image
   2. create 3 columns
   3. show image in first column
   4. show product info in second column
   5. show add to card action in third column
   6. add styles

8. Handle Add to Cart

   1. define react context
   2. define cart items state
   3. create add to cart items
   4. add reducer
   5. create store provider
   6. handle add to cart button

9. Create Cart Page

   1. create cart.js
   2. use context to get cart items
   3. list items in cart items
   4. redirect to cart screen after add to cart

10. Handle Changing Cart Items

    1. add select box for quantity
    2. handle select box change

11. Save Cart Items

    1. install js-cookie package [npm install js-cookie]
    2. save and retrive cart items

12. Create Login Form

    1. install react hook form [npm install react-hook-for]
    2. create input boxes
    3. add login button

13. Connect to MongoDB

    1. install mongoose
    2. install mongodb or use mongodb atlas
    3. save connection url in .env
    4. create db utils file
    5. create sample users

14. Create Login API

    1. install next-auth
    2. create nextauth.js
    3. implement signin
    4. use signin in login form

15. Add User Menu

    1. check user authentication
    2. install headlessui
    3. show user menu

16. Create Shipping Address

    1. display address fields
    2. save address in context

17. Create Payment Method Screen

    1. display payment methods
    2. save payment method in context

18. Seed Sample Products

    1. insert sample products to mongodb
    2. load products from db in home and product screen
    3. check product count in stock in add to cart

19. Load Products from MonogoDB

    1. load products in hme page
    2. load products in product page
    3. use product api to count in stock and add to cart

20. Create Place Order Screen

    1. display shipping address
    2. display payment method
    3. display order items
    4. implement create order

21. Create Order Screen
    1. implement backend api for order details
    2. load order data from backend
    3. display order details

#Used Packages:

1. npm i -D @types/react
2. Heroicons: npm install @heroicons/reac
3. JS-Cookie : npm install js-cookie
4. React Hook Form: npm install react-hook-for
5. Mongoose: npm install mongoose
6. Bcrypt: npm i bcryptjs
7. Next-Auth: npm i next-auth
8. Toastify: npm i react-toastify
9. HeadlessUI: npm install @headlessui/react
10. Axios: npm i axios
