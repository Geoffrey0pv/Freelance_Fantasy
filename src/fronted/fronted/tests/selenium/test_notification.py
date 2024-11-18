from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager


class NotificationsTest:
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

    def navigate_to_notifications(self):
        try:
            # Verifica que estás en la página de perfil
            self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(),'Barra Lateral')]"))
            )
            print("Página de perfil cargada correctamente.")

            # Busca el botón "Notificaciones" en la barra lateral
            notifications_button = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Notificaciones')]"))
            )
            print("Botón 'Notificaciones' encontrado en la barra lateral.")

            # Haz clic en el botón de Notificaciones
            self.driver.execute_script("arguments[0].click();", notifications_button)
            print("Haciendo clic en el botón de 'Notificaciones'.")

            # Esperar que la URL cambie a la sección de notificaciones
            self.wait.until(EC.url_contains("/profile/notifications"))
            print("Redirigido exitosamente a la sección de notificaciones.")

        except TimeoutException:
            print("Error: No se pudo acceder a la sección de notificaciones.")
        except WebDriverException as e:
            print(f"Error al navegar a notificaciones: {e}")

    def mark_notification_as_read(self):
        try:
            # Marca la primera notificación como leída
            first_notification_button = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Mark as Read')]"))
            )
            first_notification_button.click()
            print("Primera notificación marcada como leída.")

            # Verifica que se haya actualizado el estado
            self.wait.until_not(
                EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Mark as Read')]"))
            )
            print("Estado de la notificación actualizado correctamente.")

        except TimeoutException:
            print("Error: No se pudo marcar la notificación como leída.")

    def mark_all_notifications_as_read(self):
        try:
            # Marca todas las notificaciones como leídas
            mark_all_button = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Mark All as Read')]"))
            )
            mark_all_button.click()
            print("Haciendo clic en el botón 'Mark All as Read'.")

            # Verifica que todas las notificaciones ahora estén leídas
            self.wait.until_not(
                EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Mark as Read')]"))
            )
            print("Todas las notificaciones marcadas como leídas correctamente.")

        except TimeoutException:
            print("Error: No se pudieron marcar todas las notificaciones como leídas.")

    def run(self):
        try:
            self.login_as_special_user()
            self.navigate_to_notifications()
            self.mark_notification_as_read()
            self.mark_all_notifications_as_read()
        finally:
            self.driver.quit()


# Ejecución del script
if __name__ == "__main__":
    test = NotificationsTest()
    test.run()
