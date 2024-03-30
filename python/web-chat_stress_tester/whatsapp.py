import time
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

url = "https://web.whatsapp.com"

driver_location = '/usr/bin/chromedriver'
binary_location = '/usr/bin/google-chrome-stable'
options = webdriver.ChromeOptions()
service = Service(driver_location)
options.binary_location = binary_location
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)

driver.get(url)
wait = WebDriverWait(driver, 10)
message = "testing "
anything = str(input("enter: "))
message_input = driver.find_element(By.XPATH,"(//div[@contenteditable='true'])[2]")
print('done')
for i in range(1000):
    new_msg = message+str(i)
    message_input.send_keys(new_msg)
    message_input.send_keys(Keys.ENTER)
time.sleep(50)
driver.quit()
