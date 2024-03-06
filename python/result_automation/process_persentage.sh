#!/bin/bash

# Specify the folder containing the PDF files
folder="/home/Arch/downloads/results/new"

# Loop through each PDF file in the folder
for file in "$folder"/*.pdf; do
    
    # Extract the number starting from 431 and the string "PASS"
    Roll_no=$(pdfgrep -o -P '231\d+' "$file")
    number=$(pdfgrep -n 'Total :-' "$file"| awk '{print $4}')
    echo "$number"
    # Check if the extracted values are empty and assign blank space if they are
    if [ -z "$number" ]; then
        number=0
    fi
    out=6.5
    per=$(python3 -c "print($number/$out)") 
    # Output the results
    echo "$Roll_no $per" >> new_final.txt
    echo "-----------------------"
done

