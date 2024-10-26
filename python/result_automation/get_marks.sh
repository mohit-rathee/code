#!/bin/bash

PDF_DIR="./new"
OUTPUT_FILE="mapped_results.txt"

# echo "Exam No | BEE Theory | Math Theory | Physics Theory" > "$OUTPUT_FILE"

for pdf_file in "$PDF_DIR"/*.pdf; do
    # Extract text from the PDF file
    text=$(pdftotext "$pdf_file" -)
    
    # Extract the student name and registration number
    student_name=$(echo "$text" | sed -n '30p')
    registration_no=$(echo "$text" | sed -n '22p')
    exam_no=$(echo "$text" | sed -n '26p')

    math_theory=$(echo "$text" | sed -n '58p')
    math_sessional=$(echo "$text" | sed -n '60p')
    math_total=$(echo "$text" | sed -n '62p')
    physics_theory=$(echo "$text" | sed -n '66p')
    physics_sessional=$(echo "$text" | sed -n '68p')
    physics_total=$(echo "$text" | sed -n '70p')
    physics_sessional_2=$(echo "$text" | sed -n '84p')
    bee_theory=$(echo "$text" | sed -n '85p')
    physics_practical=$(echo "$text" | sed -n '90p')
    bee_sessional=$(echo "$text" | sed -n '92p')
    physics_practical_total=$(echo "$text" | sed -n '99p')
    bee_total=$(echo "$text" | sed -n '100p')
    bee_sessional_2=$(echo "$text" | sed -n '104p')
    bee_practical=$(echo "$text" | sed -n '106p')
    bee_practical_total=$(echo "$text" | sed -n '108p')
    ed_sessional=$(echo "$text" | sed -n '112p')
    ed_practical=$(echo "$text" | sed -n '114p')
    ed_total=$(echo "$text" | sed -n '116p')
    english_sessional=$(echo "$text" | sed -n '120p')
    
    {

        # echo "Student Name: $student_name"
        # echo "Registration No: $registration_no"

        echo "$exam_no $bee_theory $math_theory $physics_theory"

        # echo "BEE Practical Total: $bee_practical_total"
        # echo "BEE Practical: $bee_practical"
        # echo "BEE Sessional 2: $bee_sessional_2"
        # echo "BEE Sessional: $bee_sessional"
        # echo "BEE Total: $bee_total"
        # echo "ED Practical: $ed_practical"
        # echo "ED Sessional: $ed_sessional"
        # echo "ED Total: $ed_total"
        # echo "English Sessional: $english_sessional"
        # echo "Math Sessional: $math_sessional"
        # echo "Math Total: $math_total"
        # echo "Physics Practical Total: $physics_practical_total"
        # echo "Physics Practical: $physics_practical"
        # echo "Physics Sessional 2: $physics_sessional_2"
        # echo "Physics Sessional: $physics_sessional"
        # echo "Physics Total: $physics_total"

    } >> "$OUTPUT_FILE"

done

echo "Mapping completed. Results saved in $OUTPUT_FILE."

