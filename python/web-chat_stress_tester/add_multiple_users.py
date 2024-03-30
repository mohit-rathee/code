import random, time, shutil, os
import tempfile
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

url = "http://127.0.0.1:8000/channels"

driver_location = '/usr/bin/chromedriver'
binary_location = '/usr/bin/google-chrome-stable'
options = webdriver.ChromeOptions()
service = Service(driver_location)
options.binary_location = binary_location
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)

random_name = str(random.randint(0,10000))
driver.get(url)
wait = WebDriverWait(driver, 10)

login_btn = wait.until(EC.visibility_of_element_located((By.ID,"login_btn"))) 
login_btn.click()

wait = WebDriverWait(driver, 10)
sign_up_btn = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "log_up")))
sign_up_btn.click()

username_input = driver.find_element(By.ID,"username_signup")
password_input = driver.find_element(By.ID,"password_signup")
server_box = driver.find_element(By.ID,"app")
name = random_name
username_input.send_keys(name)
password_input.send_keys("password")
server_box.click()

submit_btn_signup = driver.find_element(By.ID,"submit_btn_signup")
submit_btn_signup.click()

wait = WebDriverWait(driver, 10)
stress_tester_channel = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "c-4")))
stress_tester_channel.click()
message = "testing "
for i in range(100):
    # Find the login form elements and fill them with your credentials
    message_input = driver.find_element(By.ID,"text_message")
    new_msg = message+str(i)
    message_input.send_keys(new_msg)
    message_input.send_keys(Keys.ENTER)
driver.quit()

