from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager

class RegisterTest:
    def __init__(self):
        # Configuración del WebDriver
        options = Options()
        options.add_argument("--start-maximized")
        self.service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=self.service, options=options)
        self.wait = WebDriverWait(self.driver, 20)

    def register_user(self, username, email, password, confirm_password, account_type):
        try:
            # URL de la página de registro
            self.driver.get("http://localhost:5173/register")  # Ajusta la URL si es necesario

            # Localizar los elementos del formulario
            username_field = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Ingresa tu username']"))
            )
            email_field = self.driver.find_element(By.XPATH, "//input[@placeholder='Ingresa tu correo electrónico']")
            password_field = self.driver.find_element(By.XPATH, "//input[@placeholder='Ingresa tu contraseña']")
            confirm_password_field = self.driver.find_element(By.XPATH, "//input[@placeholder='Confirma tu contraseña']")
            account_type_field = self.driver.find_element(By.XPATH, f"//input[@value='{account_type}']")
            register_button = self.driver.find_element(By.XPATH, "//button[contains(text(),'Registrarse')]")

            # Llenar el formulario
            username_field.send_keys(username)
            email_field.send_keys(email)
            password_field.send_keys(password)
            confirm_password_field.send_keys(confirm_password)
            account_type_field.click()  # Seleccionar el tipo de cuenta
            register_button.click()

            # Verificar redirección o mensaje de éxito
            try:
                # Verificar redirección
                self.wait.until(EC.url_contains("/profile"))  # Ajusta según la URL posterior al registro
                print("Prueba completada exitosamente. Registro realizado con éxito.")
            except TimeoutException:
                # Si no hay redirección, buscar mensaje de éxito
                success_message = self.wait.until(
                    EC.presence_of_element_located((By.XPATH, "//h1[contains(text(),'¡Registro exitoso!')]"))
                )
                print("Prueba completada exitosamente. Mensaje de éxito encontrado.")

        except TimeoutException:
            print("Error: El elemento esperado no apareció en el tiempo establecido.")
        except WebDriverException as e:
            print(f"Error durante la prueba: {e}")
        finally:
            self.driver.quit()

# Ejemplo de uso de la clase
if __name__ == "__main__":
    tester = RegisterTest()
    tester.register_user(
        username="testRegister_user",
        email="testRegister_user@example.com",
        password="Test_Password123",
        confirm_password="Test_Password123",
        account_type="persona"  # Puede ser "persona" o "empresa"
    )
