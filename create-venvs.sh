#!/bin/bash

# Define an array of paths
paths=(
  "design/api"
)

WD=$(pwd)

# Loop through each path
for path in "${paths[@]}"; do
  echo "Processing directory: $path"

  # Check if the directory exists
  if [ -d "$path" ]; then
    # Navigate to the directory
    cd "$path" || exit

    # Create a virtual environment in .venv
    python3 -m venv .venv

    # Activate the virtual environment
    source .venv/bin/activate

    # Check if requirements.txt exists and install packages
    if [ -f "requirements.txt" ]; then
      pip install -r requirements.txt
    else
      echo "No requirements.txt found in $path"
    fi

    # Deactivate the virtual environment
    deactivate

    cd $WD

    echo "Finished processing $path"
  else
    echo "Directory $path does not exist"
  fi
done

echo "All directories processed."
