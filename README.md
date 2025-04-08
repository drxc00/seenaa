# Seenaa

<img src="public/seenaa_img.png" alt="Seenaa Img" width="100"/>

**When you're bored and want to write something.**

I was bored and wanted to test out new libraries (better-auth and drizzle) so I made this app lol.

Seenaa is an open-source writing app with a blog-like structure where users can have their own personal page, and more. It offers an easy and engaging way to write, share, and publish content online. It also comes with some cool AI features to assist your writing journey.

## Key Features

- **Personal Pages**: Users can have their own subdomains like `drxco.seenaa.xyz`, providing a personalized space to publish and manage their content.
- **AI Writing Assistance**: Enhance your writing experience with **auto-complete** powered by advanced AI models like **Gemini** and **DeepSeek**.

- **Intuative Rich Text Editor**: Used **TipTap.js** and well, you know the rest.

## Tech Stack

- **Next.js**: A powerful React framework for building dynamic websites.
- **Typescript**: For type safety and better development experience.
- **Drizzle ORM**: A modern ORM for interacting with your database in a clean and efficient way.
- **PostgreSQL**: The relational database used for storing user data and posts.
- **ShadCN**: For UI components, providing a beautiful and responsive design.

## Development Setup

For local development, you can use the development Docker Compose configuration which only starts a PostgreSQL database:

1. Make sure Docker and Docker Compose are installed
2. Run the development database:
```bash
docker compose -f docker-compose-dev.yaml up
```
3. Install dependencies and migrations:
```bash
npm install --legacy-peer-deps
npm run db:migrate
```
4. Start the development server:
```bash
npm run dev
```

## Docker Full Build

For a full containerized deployment (both database and web app):

1. Create a `.env.prod` file with your production environment variables
2. Run the production stack:
```bash
docker compose -f docker-compose.yaml up --build
```

## VPS Deployment

To deploy to a VPS, you can use the `deploy.sh` script which will:
- Create process all the variables needed.
- Set up Docker and Docker Compose.
- Configure Nginx with SSL using Certbot.
- Deploy the application.

1. Make the script executable:
```bash
chmod +x deploy.sh
```
2. Run the script (note: you'll need to be active during SSL certificate setup):
```bash
./deploy.sh
```
3. If changes are made, use the update script so apply changes.
```bash
./update.sh
```

## Live Demo

A live version is available at [https://seenaa.xyz](https://seenaa.xyz). Note that it's hosted on a budget VPS so performance may vary.

## Acknowledgments
- Created to practice the better-auth library and Drizzle ORM.
- Inspired by the desire to provide an easy way for people to share their thoughts when they're bored and feel creative.
