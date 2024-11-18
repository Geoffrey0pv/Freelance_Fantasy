from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager

# Configuración del WebDriver
options = Options()
options.add_argument("--start-maximized")
service = Service(ChromeDriverManager().install())

try:
    # Inicializar WebDriver
    driver = webdriver.Chrome(service=service, options=options)
    
    # Accede al sitio web
    driver.get("http://localhost:5173/login")
    
    # Tiempo de espera
    wait = WebDriverWait(driver, 20)
    
    # Localizar elementos del formulario
    username_field = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Ingresa tu nombre de usuario']")))
    password_field = driver.find_element(By.XPATH, "//input[@placeholder='Ingresa tu contraseña']")
    login_button = driver.find_element(By.XPATH, "//button[contains(text(),'Iniciar Sesión')]")
    
    # Introducir datos
    username_field.send_keys("special_user")  # Cambia según tu base de datos
    password_field.send_keys("special_password")
    login_button.click()
    
    # Verificar redirección o resultado esperado
    wait.until(EC.url_contains("/profile"))  # Ajusta según la URL posterior al login
    print("Prueba completada exitosamente. Login realizado con éxito.")

except TimeoutException:
    print("Error: El elemento esperado no apareció en el tiempo establecido.")
except WebDriverException as e:
    print(f"Error durante la prueba: {e}")
finally:
    driver.quit()
