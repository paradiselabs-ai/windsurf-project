#!/bin/bash

# Notion to Astro Sync Script Runner
# This script runs the Node.js script to sync content from Notion to Astro

echo "Starting Notion to Astro sync process..."

# Change to the script directory
cd "$(dirname "$0")"

# Make the Node.js script executable if it isn't already
chmod +x notion-sync.js

# Run the sync script
node notion-sync.js

# Check if the sync was successful
if [ $? -eq 0 ]; then
  echo "Sync completed successfully!"
  echo "You can now build and deploy your site."
else
  echo "Sync failed. Please check the error messages above."
  exit 1
fi
