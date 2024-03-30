import time
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
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

driver.get(url)
wait = WebDriverWait(driver, 10)
time.sleep(60)
message = "testing "
for i in range(100):
    message_input = driver.find_element(By.ID,"text_message")
    new_msg = message+str(i)
    message_input.send_keys(new_msg)
    message_input.send_keys(Keys.ENTER)
time.sleep(50)
driver.quit()
