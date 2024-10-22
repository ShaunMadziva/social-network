# https://social-network-nine-sigma.vercel.app/

## Requirements:

🎯 Set up user sign-up and user login using Clerk.  
🎯 Create and display an error page if the user visits a user profile that doesn’t exist.  
🎯 Use 1 or more Radix UI Primitive or something similar (e.g. use of another library to enhance UX).  
🎯 Enable users to create a user profile, and input profile information (such as a user biography) using a form. Users and user information should be stored in their own table in the database and handled with an appropriate route (e.g. /user/[userId]).  
🎯 Enable users to create posts associated with their Clerk userId. Posts should be displayed on the user’s profile page.

## To do:

-- Use UI liabrary  
-- create a `/profiles` endpoint for all profiles and a `/profiles/[profileId]`

## Running the app locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
