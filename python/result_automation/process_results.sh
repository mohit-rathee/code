#!/bin/bash

# Specify the folder containing the PDF files
folder="/home/Arch/results"

# Loop through each PDF file in the folder
for file in "$folder"/*.pdf; do
    echo "Processing file: $file"
    
    # Extract the number starting from 431 and the string "PASS"
    number=$(pdfgrep -o -P '231\d+' "$file")
    string=$(pdfgrep -o -P 'PASS' "$file")
    
    # Check if the extracted values are empty and assign blank space if they are
    if [ -z "$number" ]; then
        number=" "
    fi
    
    if [ -z "$string" ]; then
        string="FAIL"
    fi
    
    # Output the results
    echo "Roll_no: $number Result: $string" >> /home/Arch/results/final.txt
    echo "-----------------------"
done

