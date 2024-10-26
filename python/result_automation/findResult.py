from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# Populate-- this when required.

credentials = [['registrationNo','examNo']]

url = "https://result.mdurtk.in/postexam/result.aspx"
path_loc = r"/home/Arch/Downloads/results/new/"
options = webdriver.ChromeOptions()
driver_location = '/usr/bin/chromedriver'
binary_location = '/usr/bin/google-chrome-stable'
service = Service(driver_location)
options.binary_location = binary_location
chrome_prefs = {
    "download.prompt_for_download": False,
    "plugins.always_open_pdf_externally": True,
    "download.open_pdf_in_system_reader": False,
    "profile.default_content_settings.popups": 0,
    "printing.print_to_pdf": True,
    "download.default_directory": path_loc,
    "savefile.default_directory": path_loc
}
driver_location = '/usr/bin/chromedriver'
binary_location = '/usr/bin/google-chrome-stable'
options.add_experimental_option("prefs", chrome_prefs)
options.add_argument('--kiosk-printing')
options.add_argument('--kiosk-pdf-printing')
driver = webdriver.Chrome(options=options)
print('opening result website')
for i in credentials:
    registeration_no = i[0]
    exam_roll_no = i[1]
# Open the website
    driver.get(url)
# Find the login form elements and fill them with your credentials
    registrationNo = driver.find_element(By.ID, "txtRegistrationNo")
    examNo = driver.find_element(By.ID, "txtRollNo")
    registrationNo.send_keys(registeration_no)
    examNo.send_keys(exam_roll_no)

    print('filling credentials')
# Find and click the login button
    login_button = driver.find_element(By.ID, "cmdbtnProceed")
    login_button.click()
    print('submit')

    wait = WebDriverWait(driver, 30)  # Adjust the timeout as needed
    confirm = wait.until(
        EC.visibility_of_element_located((By.ID, "imgComfirm")))

    confirm.click()

# Find and click the link/button to download the result
    view = wait.until(EC.visibility_of_element_located(
        (By.ID, "rptMain_ctl01_lnkView")))
    view.click()
    print("Confirming form")

    printBtn = wait.until(
        EC.visibility_of_element_located((By.ID, "btnPrint")))
    printBtn.click()

    print("saving file")


# Close the browser
driver.quit()
