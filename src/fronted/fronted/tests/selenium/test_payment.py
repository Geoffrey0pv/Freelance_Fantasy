from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager


class PaymentsTest:
    def __init__(self):
        # Configuración del WebDriver
        options = Options()
        options.add_argument("--start-maximized")
        self.service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=self.service, options=options)
        self.wait = WebDriverWait(self.driver, 20)

    def login_as_special_user(self):
        try:
            # Accede a la página de inicio de sesión
            self.driver.get("http://localhost:5173/login")  # Ajusta la URL si es necesario

            # Completa las credenciales de inicio de sesión
            username_field = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Ingresa tu nombre de usuario']"))
            )
            password_field = self.driver.find_element(By.XPATH, "//input[@placeholder='Ingresa tu contraseña']")
            login_button = self.driver.find_element(By.XPATH, "//button[contains(text(),'Iniciar Sesión')]")

            username_field.send_keys("special_user")
            password_field.send_keys("special_password")
            login_button.click()

            # Verifica que se redirige a la página de perfil
            self.wait.until(EC.url_contains("/profile"))
            print("Inicio de sesión exitoso como 'special_user'.")

        except TimeoutException:
            print("Error: No se pudo iniciar sesión. Verifica las credenciales.")
        except WebDriverException as e:
            print(f"Error durante el login: {e}")

    def navigate_to_payments(self):
        try:
            # Verifica que estás en la página de perfil
            self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(),'Barra Lateral')]"))
            )
            print("Página de perfil cargada correctamente.")

            # Busca el botón "Pagos" en la barra lateral
            payments_button = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Pagos')]"))
            )
            print("Botón 'Pagos' encontrado en la barra lateral.")

            # Haz clic en el botón de Pagos
            self.driver.execute_script("arguments[0].click();", payments_button)
            print("Haciendo clic en el botón de 'Pagos'.")

            # Esperar que la URL cambie a la sección de pagos
            self.wait.until(EC.url_contains("/profile/payments"))
            print("Redirigido exitosamente a la sección de pagos.")

        except TimeoutException:
            print("Error: No se pudo acceder a la sección de pagos.")
        except WebDriverException as e:
            print(f"Error al navegar a pagos: {e}")

    def select_project_and_process_invoice(self):
        try:
            # Seleccionar el primer proyecto del dropdown
            project_dropdown = self.wait.until(EC.presence_of_element_located((By.ID, "projectSelect")))
            project_dropdown.click()

            project_option = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "(//option[@value][not(@disabled)])[2]"))
            )
            project_option.click()
            print(f"Proyecto seleccionado: {project_option.text}")

            # Buscar la primera factura pendiente y hacer clic en ella
            pending_invoice = self.wait.until(
                EC.presence_of_element_located(
                    (By.XPATH, "//div[contains(@class,'cursor-pointer') and .//span[text()='Pendiente']]")
                )
            )
            self.driver.execute_script("arguments[0].scrollIntoView(true);", pending_invoice)
            self.driver.execute_script("arguments[0].click();", pending_invoice)
            print("Factura con estado 'Pendiente' seleccionada.")

            # Verificar que los detalles de la factura están cargados
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//h2[contains(text(),'Detalles de Pago')]")))
            print("Detalles de la factura cargados correctamente.")

            # Descargar PDF
            generate_pdf_button = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Descargar PDF')]"))
            )
            self.driver.execute_script("arguments[0].scrollIntoView(true);", generate_pdf_button)
            self.driver.execute_script("arguments[0].click();", generate_pdf_button)
            print("PDF descargado con éxito.")

        except TimeoutException:
            print("Error: No se encontró una factura pendiente o el botón de descargar PDF.")
        except WebDriverException as e:
            print(f"Error durante la prueba: {e}")

    def run(self):
        try:
            self.login_as_special_user()
            self.navigate_to_payments()
            self.select_project_and_process_invoice()
        finally:
            self.driver.quit()


# Ejecución del script
if __name__ == "__main__":
    test = PaymentsTest()
    test.run()
