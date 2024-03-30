from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

url = "http://127.0.0.1:8000/channels"

options = webdriver.ChromeOptions()
driver_location = '/usr/bin/chromedriver'
binary_location = '/usr/bin/google-chrome-stable'
service = Service(driver_location)
options.binary_location = binary_location
driver = webdriver.Chrome(options=options)

driver.get(url)
login_btn = driver.find_element(By.ID,"login_btn")
login_btn.click()
username_input = driver.find_element(By.ID,"username")
password_input = driver.find_element(By.ID,"password")
username_input.send_keys("monti")
password_input.send_keys("rathee")
submit_btn = driver.find_element(By.ID,"login_submit")
submit_btn.click()
wait = WebDriverWait(driver, 10)
stress_tester_channel = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "c-2")))
stress_tester_channel.click()
message = "testing "
for i in range(1000):
    # Find the login form elements and fill them with your credentials
    message_input = driver.find_element(By.ID,"text_message")
    new_msg = message+str(i)
    message_input.send_keys(new_msg)

    message_input.send_keys(Keys.ENTER)
    print(new_msg)

driver.quit()

