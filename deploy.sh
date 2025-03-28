#!/bin/bash

# Set the GitHub Pages environment variable
export DEPLOY_ENV=gh-pages

# Build the static site
echo "Building static site..."
npx next build

# Create .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
echo "Creating .nojekyll file..."
touch out/.nojekyll

# Manual GitHub Pages deployment
echo "Setting up manual GitHub Pages deployment..."

# Create a temporary directory for the gh-pages branch
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory: $TEMP_DIR"

# Clone the gh-pages branch to the temporary directory
git clone --branch gh-pages git@github.com:miroblog/blog_viewer.git "$TEMP_DIR" || git clone git@github.com:miroblog/blog_viewer.git "$TEMP_DIR"

# If gh-pages branch doesn't exist yet, create it
if [ $? -ne 0 ]; then
  echo "Creating new gh-pages branch..."
  cd "$TEMP_DIR"
  git checkout --orphan gh-pages
  git rm -rf .
  touch README.md
  echo "# GitHub Pages for Tech Blog" > README.md
  git add README.md
  git commit -m "Initial gh-pages commit"
  git push origin gh-pages
  cd -
fi

# Copy the built files to the temporary directory
echo "Copying built files to gh-pages branch..."
cp -R out/* "$TEMP_DIR"/
cp out/.nojekyll "$TEMP_DIR"/

# Commit and push the changes
cd "$TEMP_DIR"
git add .
git commit -m "Deploy to GitHub Pages: $(date)"
git push origin gh-pages

# Clean up
cd -
rm -rf "$TEMP_DIR"

echo "Deployment complete! Your site should be available at https://miroblog.github.io/blog_viewer/"
