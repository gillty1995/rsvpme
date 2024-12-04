RSVPMe - Effortless Event Planning

RSVPMe is a simple and intuitive RSVP web application that allows users to create events, send invitations, and track attendance—all without the need to register or log in. The app enables event creators to easily generate an RSVP link that can be shared with guests. Guests can simply click the link, add their name to the RSVP list, and see who else is attending. If event creators or guests want to edit their RSVP or use additional features (like the chat), they will need to register or log in.

Tech Stack

    •	Frontend: React, TypeScript, Vite
    •	Backend: Express.js, Node.js, MongoDB for RESTful API
    •	Styling: Tailwind CSS
    •	State Management: React Context API
    •	Hosting: Google Cloud (for production)
    •	Database: MongoDB for data storage
    •	Email Notifications: Nodemailer for email invitations
    •	SMS Notifications: Twilio for SMS updates

Features Completed

    •	Main Page: The main page features a visually appealing hero section and an image slider.
    •	Image Slider: A dynamic image slider displays images that transition smoothly.

Upcoming Features

    •	RSVP Form: A simple form for event creators to enter event details (e.g., event name, date, and description) and generate a unique RSVP link.
    •	Guest RSVP: Guests can add their names to the RSVP list simply by clicking on the shared link.
    •	Editing & Managing RSVP: Event creators can log in to manage the RSVP list, edit event details, and remove or update names on the list.
    •	User Authentication: Implement login and registration features for users to manage their events and RSVP lists.
    •	Chat Feature: Add a real-time chat feature for attendees to communicate and discuss the event. This will require users to log in.
    •	Backend Integration: Set up the backend for storing events, RSVP lists, and chat messages using Node.js, Express.js, and MongoDB.
    •	Email Notifications: Implement email notifications using Nodemailer to send event details and updates to attendees.
    •	SMS Notifications: Use Twilio to send SMS updates and event reminders to attendees.
    •	Responsive Design: The layout adapts to different screen sizes, making it mobile-friendly.
    •	Event Creation & RSVP Link: Users can create an event and generate a unique RSVP link. This link can be shared with invitees, who can then add their names to the RSVP list.

How RSVP Works

    1.	Create Event: Users can create an event without logging in, filling out a simple form with event details (e.g., name, date, location).
    2.	Generate RSVP Link: Once the event is created, a unique RSVP link is generated.
    3.	Send Invitations: Event creators can share this link via email or text to their invitees.
    4.	RSVP List: Invitees who click the link can add their name to the RSVP list without logging in. They can view who else has RSVP’d, and the list updates in real time.
    5.	Editing RSVP: If event creators or guests want to edit their names, remove themselves, or use the chat feature, they must log in.
    6.	Chat Feature: The chat feature allows registered users to communicate with each other, but only logged-in users can access it.

What’s Next?

    1.	RSVP Form: A user-friendly form for event creation, event selection, and sending invites.
    2.	User Authentication: Implement JWT authentication to allow users to log in, manage their events, and track RSVP status.
    3.	Backend Setup: Configure a backend with Node.js, Express.js, MongoDB, and RESTful API routes to handle user data, events, and RSVPs.
    4.	Real-time Chat Feature: Using Socket.io or Firebase, implement a real-time chat for attendees to communicate.
    5.	Notification System: Implement Nodemailer for email notifications and Twilio for SMS notifications.

How to Run Locally

    1.	Clone the repository: git clone https://github.com/gillty1995/rsvpme.git
    2.	Navigate to the project directory: cd rsvpme
    3.	Install dependencies: npm install
    4.	Start the development server: npm run dev
    5.	Open the app: Visit http://localhost:5173 in your browser.

Contributing

Feel free to fork the repository, submit issues, and create pull requests. Contributions are welcome!

License

This project is licensed under the MIT License.
