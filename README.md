# Blog Viewer

A modern, feature-rich blog platform built with Next.js, TypeScript, and Tailwind CSS. This application renders Markdown files as beautiful blog posts with support for code highlighting, tables, GFM (GitHub Flavored Markdown), and more.

## Features

- 📝 Markdown-based content management
- 🎨 Responsive design with Tailwind CSS
- 🔍 Table of contents generation
- ✨ Syntax highlighting for code blocks
- 🏷️ Tag and category filtering
- 📊 GitHub Flavored Markdown support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd blog_viwer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) to view your blog in the browser.

### Adding Blog Posts

1. Create a new Markdown file in the `md_files` directory
2. Add the required front matter at the top of your file:

```markdown
---
title: "My Blog Post Title"
date: "2025-03-28"
excerpt: "A brief description of the post"
category: "Technology"
tags: ["nextjs", "react", "markdown"]
coverImage: "/images/cover.jpg"
author: "Your Name"
authorImage: "/images/author.jpg"
authorBio: "A short bio about yourself"
---

Your markdown content goes here...
```

3. Write your blog content using Markdown syntax
4. Images and other assets should be placed in the `public` directory

## Deployment

### Deploying to Vercel

#### Method 1: Direct Deployment with Vercel CLI

1. Create an account on [Vercel](https://vercel.com/) if you don't have one
2. Install the Vercel CLI:

```bash
npm install -g vercel
```

3. Run the deployment command from your project root:

```bash
vercel
```

4. Follow the on-screen instructions to complete the deployment
5. For production deployment:

```bash
vercel --prod
```

#### Method 2: GitHub Integration (Recommended)

1. Create a GitHub repository for your project:

```bash
# Initialize git repository if not done already
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Create a new repository on GitHub and push your code
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

2. Connect Vercel with your GitHub repository:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Vercel will automatically detect your Next.js configuration
   - Click "Deploy"

3. Configure automatic deployments:
   - Vercel will automatically deploy when you push changes to your GitHub repository
   - By default, every push to the main branch triggers a production deployment
   - Pull requests will create preview deployments

4. Custom settings (optional):
   - In your project settings on Vercel, you can customize:
     - Environment variables
     - Build commands
     - Domain settings
     - Team permissions

### Deploying to GitHub Pages

#### Method 1: Using gh-pages package (Configured)

This project is already configured for GitHub Pages deployment using the `gh-pages` package.

1. The `next.config.js` has been configured for static export with GitHub Pages:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static exports
  output: 'export',
  // Configure base path for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/tech-blog-md-viewer' : '',
  // Disable image optimization since it's not supported in static exports
  images: {
    unoptimized: true,
  },
  // Other configurations...
}

module.exports = nextConfig
```

2. The `package.json` includes scripts for building and deploying to GitHub Pages:

```json
"scripts": {
  "dev": "next dev -p 3001",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "export": "next build",
  "deploy": "touch out/.nojekyll && gh-pages -d out -t true"
}
```

3. To deploy to GitHub Pages, run:

```bash
# Build the static site
npm run export

# Deploy to GitHub Pages
npm run deploy
```

4. The site will be deployed to the `gh-pages` branch of your repository and will be available at `https://your-username.github.io/tech-blog-md-viewer`

#### Method 2: Using GitHub Actions (Alternative)

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push
```

5. Enable GitHub Pages in your repository settings:
   - Go to your GitHub repository
   - Navigate to Settings > Pages
   - Under "Source", select "Deploy from a branch"
   - Select the `gh-pages` branch and save
   - Wait a few minutes for the deployment to complete
   - Your blog will be available at `https://your-username.github.io/your-repo-name/`

#### Method 2: Manual Deployment

1. Update your `package.json` to include a build and export script:

```json
"scripts": {
  "dev": "next dev -p 3001",
  "build": "next build && next export",
  "start": "next start",
  "lint": "next lint",
  "export": "next build && next export"
}
```

2. Build and export your project:

```bash
npm run export
```

3. Create a new GitHub repository if you haven't already

4. Initialize Git in your project folder (if not already done):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

5. Create and switch to a `gh-pages` branch:

```bash
git checkout --orphan gh-pages
```

6. Remove all files except the `out` directory:

```bash
git rm -rf .
git clean -fxd
```

7. Copy the contents of the `out` directory to the root:

```bash
cp -r out/* .
rm -rf out
```

8. Create a `.nojekyll` file to bypass GitHub Pages Jekyll processing:

```bash
touch .nojekyll
```

9. Commit and push to the gh-pages branch:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push -u origin gh-pages --force
```

10. Enable GitHub Pages in your repository settings as described in Method 1, step 5

## Customization

### Styling

Edit the Tailwind configuration in `tailwind.config.js` to customize the theme.

### Layout

Modify components in the `src/components` directory to change the layout and appearance.

## License

[MIT](LICENSE)
