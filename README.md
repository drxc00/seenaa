# Seenaa

<img src="public/seenaa_img.png" alt="Seenaa Img" width="100"/>

**When you're bored and want to write something.**

I was bored and wanted to test out new libraries (better-auth and drizzle) so I made this app lol.

Seenaa is an open-source writing app with a blog-like structure where users can have their own personal page, and more. It offers an easy and engaging way to write, share, and publish content online. It also comes with some cool AI features to assist your writing journey.

## Key Features

- **Personal Pages**: Users can have their own subdomains like `neil.seenaa.xyz`, providing a personalized space to publish and manage their content.
- **AI Writing Assistance**: Enhance your writing experience with **auto-complete** powered by advanced AI models like **Gemini** and **DeepSeek**.

- **Intuative Rich Text Editor**: Used **TipTap.js** and well, you know the rest.

## Tech Stack

- **Next.js**: A powerful React framework for building dynamic websites.
- **Typescript**: For type safety and better development experience.
- **Drizzle ORM**: A modern ORM for interacting with your database in a clean and efficient way.
- **PostgreSQL**: The relational database used for storing user data and posts.
- **ShadCN**: For UI components, providing a beautiful and responsive design.

## Setup Instructions

### 1. Clone the Repository

Start by cloning the repository to your local machine.

```bash
git clone https://github.com/drxc00/seenaa.git
cd seenaa
```

### 2. Docker Setup

Seenaa uses Docker for local development. We provide a Docker Compose setup to get PostgreSQL up and running.

1. Make sure Docker and Docker Compose are installed on your machine.
2. Run the following command to start the local environment:

```bash
docker compose up
```

### 3. Installing Dependencies

Install the necessary dependencies for the project:

```bash
npm install
```

### 4. Running the App

Start the development server:

```bash
npm run dev
```

## Acknowledgments
- Created to practice the better-auth library and Drizzle ORM.
- Inspired by the desire to provide an easy way for people to share their thoughts when they’re bored and feel creative.
