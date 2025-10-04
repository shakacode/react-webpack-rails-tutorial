#!/bin/bash
set -e

echo "🚀 Setting up React on Rails workspace..."

# Note: This project requires Ruby 3.4.6.
# Please ensure you have the correct Ruby version active before running this script.

# Copy environment files if they exist in the root
if [ -f "$CONDUCTOR_ROOT_PATH/.env" ]; then
    cp "$CONDUCTOR_ROOT_PATH/.env" .env
    echo "✅ Copied .env file from root"
elif [ -f "$CONDUCTOR_ROOT_PATH/.env.example" ]; then
    cp "$CONDUCTOR_ROOT_PATH/.env.example" .env
    echo "✅ Copied .env.example to .env"
fi

if [ -f "$CONDUCTOR_ROOT_PATH/config/database.yml" ]; then
    cp "$CONDUCTOR_ROOT_PATH/config/database.yml" config/database.yml
    echo "✅ Copied database.yml from root"
elif [ -f "config/database.yml.example" ]; then
    cp config/database.yml.example config/database.yml
    echo "✅ Copied database.yml.example to database.yml"
fi

# Run the standard Rails setup script
echo "🔧 Running Rails setup script..."
bin/setup --skip-server

echo "✨ Setup complete! You can now run the development server."
