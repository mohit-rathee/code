from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
from io import BytesIO

# Load Jinja environment
env = Environment(loader=FileSystemLoader('.'))

# Render HTML template
template = env.get_template('template.html')
context = {'name': 'MOHIT'}  # Example context data
html_string = template.render(context)

# Generate PDF from HTML
pdf = HTML(string=html_string).write_pdf()

# Save PDF to a file
with open('output.pdf', 'wb') as f:
    f.write(pdf)

